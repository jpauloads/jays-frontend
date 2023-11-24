import { useEffect, useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { Header } from "../components/Header"; // Supondo que Header é um componente existente
import { api } from "../lib/axios"; // Supondo que api é uma instância axios configurada

// Tipo para definir a estrutura de dados de um serviço
type Service = {
  id_servico: string;
  nome: string;
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
      <div className="min-h-full bg-white container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id_servico}
              id={service.id_servico}
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
