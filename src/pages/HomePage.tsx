import { Header } from "../components/HeaderHomePage";
import jayslogo from "../assets/images/jayslogo.png";
import imagem1 from "../assets/images/imghome1.jpg";
import imagem2 from "../assets/images/imghome2.jpg";
import searchbutton from "../assets/images/SearchButtonBar.png";

export function HomePage() {
  return (
    <>
      <Header />
      {/* Search bar and hero image section */}
      <div className="bg-jays-orange w-full flex flex-wrap items-center justify-between p-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-white mb-3">
            Encontre o serviço ideal imediatamente
          </h1>
          <div className="flex">
            <input
              className="flex-grow p-2 rounded-l-md"
              type="text"
              placeholder="Pesquise por qualquer serviço..."
            />
            <button className="rounded-r-md">
              <img className="" src={searchbutton}></img>
            </button>
          </div>
          {/* Tags for popular services */}
          {/* Render popular services dynamically */}
          {/* ... */}
        </div>
        <div className="w-full md:w-1/2">
          <img src={jayslogo} alt="Persona" className="max-w-sm mx-auto" />
        </div>
      </div>

      {/* Information sections */}
      <div className="bg-white container h-screen mx-auto my-10 w-full" >
        <div className="flex-wrap -mx-4 flex flex-col w-full">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full px-4 mb-1 flex items-center justify-start">
              <img
                src={imagem1}
                alt="Info 1"
                className="w-[40%] mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold mt-4">
                  Na Plataforma Web Jay's
                </h2>
                <p className="text-gray-700 mt-2">
                  Prestadores de serviços terão uma página personalizada onde poderão expor informações sobre o seu serviço
                </p>
              </div>
            </div>
            <div className="w-full px-4 flex items-center justify-end" id="segundaDiv">
              <div>
                <h2 className="text-2xl font-bold mt-4 text-end">
                  Os clientes poderão
                </h2>
                <p className="text-gray-700 mt-2 text-end">
                  Visualizar a empresa, ver horários de funcionamento, conhecer formas de entrar em contato com o ofertante e avaliar o serviço prestado
                </p>
              </div>
              <img
                src={imagem2}
                alt="Info 2"
                className="w-[40%] ml-4"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
