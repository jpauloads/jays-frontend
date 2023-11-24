import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { Header } from '../components/Header';

type ServiceDetailType = {
    id: string;
    nome_empresa: string;
    preco: string;
    descricao: string;
    horario: string;
    domicilio: boolean;
    forma_pagamento: number[];
    dt_criacao: string;
    dt_alteracao: string;
    id_tipo_servico: string;
    id_usuario: string;
  };
  
  export function ServiceDetailsPage() {
    //extração do parâmetro
    const { id_servico } = useParams<{ id_servico: string }>();
    const [serviceDetails, setServiceDetails] = useState<ServiceDetailType | null>(null);
  
    useEffect(() => {
      const fetchServiceDetails = async () => {
        try {
          const response = await api.get(`/servico/buscaservico/idservico/${id_servico}`);
          setServiceDetails(response.data);
        } catch (error) {
          console.error('Erro ao buscar detalhes do serviço', error);
        }
      };
  
      if (id_servico) {
        fetchServiceDetails();
      }
    }, [id_servico]);
  
    if (!serviceDetails) {
      return <div>Loading...</div>;
    }

  return (
    <>
      <Header />
      <div className="container mx-auto my-10 p-5">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {serviceDetails.nome_empresa}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detalhes do serviço
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Preço
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  R$ {serviceDetails.preco}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Descrição
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {serviceDetails.descricao}
                </dd>
              </div>
              {/* repetir o padrão acima para os outros detalhes do serviço */}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
