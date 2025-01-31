import { useEffect, useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { Header } from "../components/Header"; 
import { api } from "../lib/axios"; 
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { useServices } from "../contexts/ServicesContext";

type Service = {
  id: string;
  id_servico: string;
  nome_empresa: string;
  descricao: string;
  preco: number;
};

type TipoDeServico = {
  id: number;
  nome_servico: string;
};

export function SearchServicesPage() {

  const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState<string | undefined>("");
  const [tiposDeServico, setTiposDeServico] = useState<TipoDeServico[]>([]);
  const options = tiposDeServico.map(tipo => ({ value: String(tipo.id), label: tipo.nome_servico }));
  const { services, setServices } = useServices();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.fromHomePage && !location.state?.fromOtherPage) {
      buscaTodosServico();
    }

    const fetchTiposDeServico = async () => {
      try {
        const response = await api.get("/servico/tipoServico");
        setTiposDeServico(response.data); // Supondo que a API retorne um array
      } catch (error) {
        console.error("Erro ao buscar os tipos de serviço", error);
        // Tratar o erro conforme necessário
      }
    };

    fetchTiposDeServico();
  }, []);

  const buscaTodosServico = async () => {
    try {
      const response = await api.get<Service[]>("/servico/buscatodos");
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };

  const selecionaTipoServico = async (selectedType?: string) => {
    try {
      const response = await api.get<Service[]>(`/buscar/tiposervico/${selectedType}`);
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };
  
  return (
    <>
      <Header setServices={setServices} />
      <div className="container mx-auto flex flex-wrap py-6">
        {/* Sidebar / Filtros */}
        <aside className="w-full md:w-1/5 bg-white rounded p-4 ">
          <div className="mb-4">
          <Select
                    options={options}
                    value={options.find(option => option.value === tipoServicoSelecionado)}
                    onChange={(selectedOption) => {setTipoServicoSelecionado(selectedOption?.value);
                      selecionaTipoServico(selectedOption?.value);
                    }}
                      
                  />
            <button onClick={buscaTodosServico} className="text-orange-500 hover:text-orange-700 text-sm">Ver todos</button>
          </div>

          {/* Outros filtros para estados e cidades... */}

        </aside>
        {/* Main Content */}
        <div className="w-full md:w-4/5 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            {services.map((service) => {
              return (
                <ServiceCard
                  key={service.id_servico}
                  id_servico={service.id_servico}
                  id={service.id}
                  nome_empresa={service.nome_empresa}
                  descricao={service.descricao}
                  preco={service.preco.toString()}
                />  
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
