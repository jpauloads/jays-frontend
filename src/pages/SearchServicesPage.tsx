import { useEffect, useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { Header } from "../components/Header"; 
import { api } from "../lib/axios"; 
import Select from "react-select";

// Tipo para definir a estrutura de dados de um serviço
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

  // const [selectedOption, setSelectedOption] = useState("none");
  

  const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState<string | undefined>("");


  const [tiposDeServico, setTiposDeServico] = useState<TipoDeServico[]>([]);
  
  const options = tiposDeServico.map(tipo => ({ value: String(tipo.id), label: tipo.nome_servico }));


  const [services, setServices] = useState<Service[]>([]);
  // console.log(services);

  useEffect(() => {

    buscaTodosServico();

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
      console.log("Serviço vindo do BUSCA TODOS: ", response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };

  const selecionaTipoServico = async (selectedType?: string) => {
    try {
      const response = await api.get<Service[]>(`/buscar/tiposervico/${selectedType}`);
      setServices(response.data);
      console.log("Serviço pelo TIPO: ", response.data);
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
              // console.log("Service ID: ", service.id);
              return (
                <ServiceCard
                  // key={service.id_servico}
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
