import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Header } from "../components/Header";
import { LoadingModal } from "../components/LoadingModal";
import { AuthContext } from "../contexts/AuthContext";
import { RatingModal } from "../components/RatingModal";
import { RatingCard } from "../components/RatingCard";

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

type RatingType = {
  id: string;
  nota: number;
  comentario: string;
};

export function ServiceDetailsPage() {
  //extração do parâmetro
  const { user } = useContext(AuthContext);
  const { id_servico } = useParams<{ id_servico: string }>();
  const [serviceDetails, setServiceDetails] =
    useState<ServiceDetailType | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratings, setRatings] = useState<RatingType[]>([]);

  const saveRating = async (rating: number, comment: string) => {
    try {
      await api.post("/avaliacao/criar", {
        nota: rating,
        comentario: comment,
        id_servico: serviceDetails?.id,
        id_usuario: user?.UserID, // Supondo que você tem o id do usuário no contexto de autenticação
      });
      // Você pode adicionar lógica para atualizar a lista de avaliações aqui
    } catch (error) {
      console.error("Erro ao enviar avaliação", error);
    }
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await api.get(
          `/servico/buscaservico/idservico/${id_servico}`
        );
        setServiceDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do serviço", error);
      }
    };

    const fetchRatings = async () => {
      if (id_servico) {
        try {
          const response = await api.get(`/avaliacao/${id_servico}`);
          setRatings(response.data);
        } catch (error) {
          console.error("Erro ao buscar avaliações", error);
        }
      }
    };
    if (id_servico) {
      fetchServiceDetails();
    }

    fetchRatings();
  }, [id_servico]);

  if (!serviceDetails) {
    return <LoadingModal />;
  }

  return (
    <>
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onSaveRating={saveRating}
      />

      <Header />
      <div className="container mx-auto my-10 p-5 px-60">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex flex-row justify-between px-4 py-5 sm:px-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {serviceDetails.nome_empresa}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Detalhes do serviço
              </p>
            </div>

            <div className="">
              <button
                onClick={() => setIsRatingModalOpen(true)}
                className="bg-jays-orange text-white font-semibold py-2 px-4 rounded hover:bg-orange-700"
              >
                Avaliar Serviço
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Preço</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  R$ {serviceDetails.preco}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Descrição</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {serviceDetails.descricao}
                </dd>
              </div>
              <div className="px-6"></div>
            </dl>
            {ratings.map((rating) => (
              <RatingCard
                key={rating.id} // Supondo que cada avaliação tenha um id único
                nota={rating.nota}
                comentario={rating.comentario}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
