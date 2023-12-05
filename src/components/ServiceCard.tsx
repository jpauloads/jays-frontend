import { useNavigate } from "react-router-dom";
import semimagem from "../assets/images/placeholder.png";

type ServiceCardProps = {
  id: string;
  id_servico: string;
  nome_empresa: string;
  descricao: string;
  preco: string;
  //adicionar imagem quando integrar essa funcionalidade
};

export function ServiceCard({
  id,
  id_servico,
  nome_empresa,
  descricao,
  preco,
}: ServiceCardProps) {
  console.log("ServiceCard ID: ", id_servico);

  const navigate = useNavigate();

  const handleRedirectToServiceDescription = () => {

    if(id_servico == undefined){
      id_servico = id;
      console.log("NOVO ID: ", id_servico);
    }

    navigate(`/detalheservico/${id_servico}`);
  };

  return (
    <div
      className="hover:bg-slate-50 hover:scale-105 transition-bg duration-300 hover:shadow-2xl w-64 rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer"
      onClick={handleRedirectToServiceDescription}
    >
      <div className="w-full h-36 flex overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={semimagem}
          alt="Service"
        />
      </div>

      <div className="justify-start px-4 py-2">
        <div className="inline-flex items-center">
          <div className="w-8 h-8 bg-stone-300 rounded-full">
            <img
              className="w-full h-full object-cover rounded-full"
              src={semimagem}
              alt="PerfilService"
            />
          </div>
          <div className="font-bold text-base text-center px-2">
            <p>{nome_empresa}</p>
          </div>
        </div>

        <p className="text-gray-700 text-sm">{descricao}</p>
      </div>

      <div className="px-4 pt-2 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          R$ {preco},00
        </span>
      </div>
    </div>
  );
}
