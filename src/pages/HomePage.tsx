import { Header } from "../components/HeaderHomePage";
import jayslogo from "../assets/images/jayslogo.png";
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
        <div className="bg-white container h-screen mx-auto my-10">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <img
                src="path-to-your-info-image-1.jpg"
                alt="Info 1"
                className="w-full"
              />
              <h2 className="text-2xl font-bold mt-4">
                Na Plataforma Web Jay's
              </h2>
              <p className="text-gray-700 mt-2">
                prestadores de serviços terão uma página personalizada onde
                poderão expor informações sobre o seu serviço
              </p>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <img
                src="path-to-your-info-image-2.jpg"
                alt="Info 2"
                className="w-full"
              />
              <h2 className="text-2xl font-bold mt-4">Os clientes poderão</h2>
              <p className="text-gray-700 mt-2">
                visualizar a empresa, ver horários de funcionamento, conhecer
                formas de entrar em contato com o ofertante e avaliar o serviço
                prestado
              </p>
            </div>
          </div>
        </div>
      

      {/* <div className="w-full flex flex-row bg-jays-orange">
        <div className="">

        </div>

        <div className="">
          <img className="object-right" src={jayslogo} alt="logo" />
        </div>
      </div>
      <div className="w-full bg-white"></div> */}
    </>
  );
}
