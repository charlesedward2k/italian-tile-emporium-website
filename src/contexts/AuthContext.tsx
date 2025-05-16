
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo purposes - in real app, this would connect to Supabase
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@toscanatiles.com",
    password: "admin123",
    role: "admin" as const,
    firstName: "Admin",
    lastName: "User"
  },
  {
    id: "2",
    email: "customer@example.com",
    password: "customer123",
    role: "customer" as const,
    firstName: "John",
    lastName: "Doe"
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("authUser");
      }
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    // This would be a real authentication call in production
    const matchedUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!matchedUser) {
      throw new Error("Invalid email or password");
    }
    
    const { password: _, ...userWithoutPassword } = matchedUser;
    setUser(userWithoutPassword);
    localStorage.setItem("authUser", JSON.stringify(userWithoutPassword));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };
  
  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
