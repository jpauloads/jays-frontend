import { createContext, ReactNode, useState, useEffect } from 'react';

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
  accessToken: string;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    // Tenta recuperar os dados do usuário do localStorage quando o componente é montado
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: UserType) => {
    setUser(userData);
    // Armazena os dados do usuário no localStorage para manter o usuário logado entre as sessões
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // Remove os dados do usuário do localStorage quando o usuário faz logout
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
