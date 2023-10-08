import { createContext, ReactNode, useState } from 'react';

type AuthContextType = {
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type UserType = {
  id: string;
  login: string;
  email: string;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);

  const login = (userData: UserType) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
