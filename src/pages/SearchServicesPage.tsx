import { useEffect, useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { Header } from "../components/Header"; // Supondo que Header é um componente existente
import { api } from "../lib/axios"; // Supondo que api é uma instância axios configurada
import { Sidebar } from "../components/SideBar";

// Tipo para definir a estrutura de dados de um serviço
type Service = {
  id_servico: string;
  nome_empresa: string;
  descricao: string;
  preco: number; // ou string, dependendo de como a API envia
};

export function SearchServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get<Service[]>("/servico/buscatodos");
        setServices(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar serviços", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-wrap py-6">
        {/* Sidebar / Filtros */}
        <Sidebar />
        {/* Main Content */}
        <div className="w-full md:w-4/5 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            {services.map((service) => (
              <ServiceCard
                key={service.id_servico}
                id={service.id_servico}
                nome_empresa={service.nome_empresa}
                descricao={service.descricao}
                preco={service.preco.toString()}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
