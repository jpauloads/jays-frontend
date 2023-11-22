import { useEffect, useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { Header } from "../components/Header"; // Supondo que Header é um componente existente
import { api } from "../lib/axios"; // Supondo que api é uma instância axios configurada

// Tipo para definir a estrutura de dados de um serviço
type Service = {
  id: string;
  nome: string;
  descricao: string;
  preco: number; // ou string, dependendo de como a API envia
};

export function SearchServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Função para chamar a API e buscar os serviços
    const fetchServices = async () => {
      try {
        // Aqui você vai substituir '/servicos' pelo endpoint correto
        const response = await api.get<Service[]>("/servicos");
        setServices(response.data);
      } catch (error) {
        console.error("Erro ao buscar serviços", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              nome={service.nome}
              descricao={service.descricao}
              preco={service.preco.toString()}
            />
          ))}
        </div>
      </div>
    </>
  );
}
