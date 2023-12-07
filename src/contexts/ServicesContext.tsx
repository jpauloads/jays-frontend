import React, { useState, useContext, ReactNode } from "react";

type Service = {
  id: string;
  id_servico: string;
  nome_empresa: string;
  descricao: string;
  preco: number;
};

type ServicesContextType = {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
};

const ServicesContext = React.createContext<ServicesContextType | undefined>(undefined);

type ServicesProviderProps = {
    children: ReactNode;
  };

export const ServicesProvider: React.FC<ServicesProviderProps> = ({ children }: ServicesProviderProps) => {
  const [services, setServices] = useState<Service[]>([]);

  return (
    <ServicesContext.Provider value={{ services, setServices }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};