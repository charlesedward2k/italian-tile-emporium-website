
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { AppUser } from "@/types/AppUser";
import { toast } from "sonner";

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ user: User | null; session: Session | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  signUp: async () => ({ user: null, session: null }),
  logout: async () => {},
});

// Admin credentials (only hard-coded for development purposes)
const ADMIN_EMAIL = "admin@bengyhome.com";
const ADMIN_PASSWORD = "reubenAdmin";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.email);
        setSession(newSession);
        setUser(newSession?.user as AppUser | null);
        if (newSession?.user) {
          // Check if user is admin
          checkUserRole(newSession.user as AppUser);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Existing session:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user as AppUser | null);
      if (currentSession?.user) {
        checkUserRole(currentSession.user as AppUser);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserRole = (user: AppUser) => {
    // Consider the special admin email as admin
    if (user.email === ADMIN_EMAIL || user.email?.endsWith("@bengyhome.com")) {
      console.log("Setting user as admin:", user.email);
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log("Attempting login for:", email);
    
    // Special case for admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      try {
        // Try login with admin credentials
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          // If login fails, try to create the admin account
          console.log("Admin account doesn't exist yet, creating it...");
          const { error: signupError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                first_name: "Admin",
                last_name: "User",
              },
            },
          });
          
          if (signupError) throw signupError;
          
          // Try logging in again after creating account
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (loginError) throw loginError;
        }
      } catch (error) {
        console.error("Admin login error:", error);
        toast.error("Failed to log in as admin. Please check your credentials.");
        throw error;
      }
    } else {
      // Regular user login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error);
        toast.error("Invalid email or password. Please try again.");
        throw error;
      }
    }
    
    // After successful login, the onAuthStateChange listener will handle setting the user
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    
    if (error) throw error;
    
    // Return the data for the caller to use if needed
    return { user: data.user, session: data.session };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthenticated: !!user,
        isAdmin,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
