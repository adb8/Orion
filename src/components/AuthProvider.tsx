import React, { useContext, createContext, useState, ReactNode, FC } from "react";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  gender: string;
  country: string;
  age: number;
  receiveMessages: boolean;
  user_id: string;
  logged_in: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setUser = (user: User | null) => {
    setUserState(user);
    setIsAuthenticated(!!user);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
