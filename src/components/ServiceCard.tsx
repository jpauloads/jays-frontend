import { useNavigate } from "react-router-dom";

type ServiceCardProps = {
    id: string;
    nome: string;
    descricao: string;
    preco: string;
}

export function ServiceCard({ nome, descricao, preco }: ServiceCardProps) {
    const navigate = useNavigate();

    const handleRedirectToServiceDescription = () => {
        navigate('/detalheservico/&{id}')
    }
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer">
          <img className="w-full" src="/img/service-placeholder.png" alt="Service" onClick={handleRedirectToServiceDescription} />
          <div className="px-6 py-4" onClick={handleRedirectToServiceDescription}>
            <div className="font-bold text-xl mb-2">{nome}</div>
            <p className="text-gray-700 text-base">
              {descricao}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              R$ {preco}
            </span>
          </div>
        </div>
      );
  }
  