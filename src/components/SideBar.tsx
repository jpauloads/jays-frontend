import { useState } from "react";

type FilterType = string[];

export function Sidebar() {
  const [selectedServices, setSelectedServices] = useState<FilterType>([]);

  // Função para lidar com a mudança dos checkboxes
  const handleServiceChange = (service: string) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  // Função para enviar requisição com os filtros selecionados
  const applyFilters = () => {
    //requisição para a API com os filtros selecionados
    console.log(selectedServices);
    // ...lógica de requisição
  };

  return (
    <aside className="w-full md:w-1/5 bg-white rounded p-4 ">
    <div className="mb-4">
      <h3 className="font-bold text-lg mb-4">Tipo de Serviço</h3>
      {['Jardineiro', 'Eletricista', 'Designer de Sites'].map((service, index) => (
        <div key={index} className="flex items-center mb-2">
          <input 
            type="checkbox"
            id={`service-${index}`}
            value={service}
            onChange={() => handleServiceChange(service)}
            className="mr-2"
            checked={selectedServices.includes(service)}
          />
          <label htmlFor={`service-${index}`} className="hover:text-orange-500 text-sm font-medium text-gray-700 transition-bg duration-300">{service}</label>
        </div>
      ))}
      <button onClick={applyFilters} className="text-orange-500 hover:text-orange-700 text-sm">Ver todos</button>
    </div>

    {/* Outros filtros para estados e cidades... */}

  </aside>
  );
}
