import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  auth: string | null;
  setAuthStatus: (authStatus: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuthStatus] = useState<string | null>("UNAUTHENTICATED");

  return <AuthContext.Provider value={{ auth, setAuthStatus }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
