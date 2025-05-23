
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { AppUser } from "@/types/AppUser";

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
    // In a real app, you would query a user_roles table or check claims
    // For this demo, we'll consider any email ending with @bengyhome.com as admin
    if (user.email?.endsWith("@bengyhome.com")) {
      console.log("Setting user as admin:", user.email);
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log("Attempting login for:", email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Login error:", error);
      throw error;
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
