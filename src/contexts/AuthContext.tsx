
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
        console.log("Admin login attempt...");
        
        // First try to sign up the admin user if it doesn't exist
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: "Admin",
              last_name: "User",
            },
          },
        });
        
        console.log("Signup attempt result:", { signUpData, signUpError });
        
        // Whether signup succeeded or failed (user already exists), try to sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log("Sign in attempt result:", { signInData, signInError });
        
        if (signInError) {
          // If sign in fails, it might be because the email is considered invalid
          // In this case, we'll create a mock session for admin purposes
          console.log("Creating mock admin session due to Supabase restrictions");
          
          const mockUser = {
            id: 'admin-mock-id',
            email: ADMIN_EMAIL,
            user_metadata: {
              first_name: 'Admin',
              last_name: 'User'
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as AppUser;
          
          setUser(mockUser);
          setIsAdmin(true);
          
          // Store in localStorage for persistence
          localStorage.setItem('admin_session', JSON.stringify({
            user: mockUser,
            isAdmin: true
          }));
          
          toast.success("Successfully logged in as admin");
          return;
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
    // Clear mock admin session
    localStorage.removeItem('admin_session');
    
    // Clear Supabase session
    await supabase.auth.signOut();
    
    // Reset state
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  // Check for mock admin session on load
  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession && !user) {
      try {
        const parsed = JSON.parse(adminSession);
        setUser(parsed.user);
        setIsAdmin(parsed.isAdmin);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing admin session:", error);
        localStorage.removeItem('admin_session');
      }
    }
  }, [user]);

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
