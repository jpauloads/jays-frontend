import { SetStateAction, useContext, useEffect, useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { Header } from "../components/Header"; // Supondo que Header é um componente existente
import { api } from "../lib/axios"; // Supondo que api é uma instância axios configurada
import Select from "react-select";
import { AuthContext } from "../contexts/AuthContext";

// Tipo para definir a estrutura de dados de um serviço
type Service = {
  id_servico: string;
  nome_empresa: string;
  descricao: string;
  preco: number; // ou string, dependendo de como a API envia
};

type TipoDeServico = {
  id: number;
  nome_servico: string;
};

export function SearchServicesPage() {

  const [selectedOption, setSelectedOption] = useState("none");
  
  const handleTypeSelect = (e: { value: SetStateAction<string>; }) => {
    setSelectedOption(e.value);
  };

  const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState<string | undefined>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setTipoServicoSelecionado(selectedValue);
  };

  const { user } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  

  const [tiposDeServico, setTiposDeServico] = useState<TipoDeServico[]>([]);
  
  const options = tiposDeServico.map(tipo => ({ value: String(tipo.id), label: tipo.nome_servico }));


  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
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

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await api.get<Service[]>("/servico/buscatodos");
  //       setServices(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar serviços", error);
  //     }
  //   };

  //   fetchServices();
  // }, []);
  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await api.get<Service[]>("/servico/buscatodos", {
  //         params: {
  //           tipoServico: tipoServicoSelecionado,
  //         },
  //       });
  //       setServices(response.data);
  //       //console.log(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar serviços", error);
  //     }
  //   };
  
  //   fetchServices();
  // }, [tipoServicoSelecionado]);

  const buscaTodosServico = async () => {
    try {
      const response = await api.get<Service[]>("/servico/buscatodos");
      setServices(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };

  const selecionaTipoServico = async (selectedType?: string) => {
    try {
      console.log(selectedType)
      const response = await api.get<Service[]>(`/buscar/tiposervico/${selectedType}`);
      //console.log(response.data);
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };
  

  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-wrap py-6">
        {/* Sidebar / Filtros */}
        <aside className="w-full md:w-1/5 bg-white rounded p-4 ">
          <div className="mb-4">
          <Select
                    options={options}
                    value={options.find(option => option.value === tipoServicoSelecionado)}
                    onChange={(selectedOption) => {setTipoServicoSelecionado(selectedOption?.value || undefined);
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
