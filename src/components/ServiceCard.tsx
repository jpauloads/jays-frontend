import { useNavigate } from "react-router-dom";
import semimagem from "../assets/images/Vector.png";

type ServiceCardProps = {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
};

export function ServiceCard({ id, nome, descricao, preco }: ServiceCardProps) {
  const navigate = useNavigate();
  console.log(id)

  const handleRedirectToServiceDescription = () => {
    navigate(`/detalheservico/${id}`); 
  };

  return (
    <div className="m-auto max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer" onClick={handleRedirectToServiceDescription}>
      <div className="w-full bg-gray-500">
      <img className="m-auto h-auto flex" src={semimagem} alt="Service" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{nome}</div>
        <p className="text-gray-700 text-base">
          {descricao}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          R$ {preco},00
        </span>
      </div>
    </div>
  );
}
