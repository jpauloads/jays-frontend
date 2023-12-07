import { useContext, useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { AddressCard } from "../components/AddressCard";
import { AddressEditComponent } from "../components/AddressEditComponent";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../lib/axios";
import { UserProfileComponent } from "../components/UserProfileComponent";
import { ServiceRegisterComponent } from "../components/ServiceRegisterComponent";
import { useServices } from "../contexts/ServicesContext";

export function UpdateProfilePage() {
  const [currentSection, setCurrentSection] = useState("cadastro");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const { setServices } = useServices();

  type AddressType = {
    id: string;
    tipo_endereco: string;
    cep: string;
    estado: string;
    cidade: string;
    logradouro: string;
    bairro: string;
    numero: number;
    id_usuario: string;
    id_servico: string | null;
  };

  // Efeito para buscar os endereços quando o componente é montado ou quando o `currentSection` é alterado para 'enderecos'
  useEffect(() => {
    if (currentSection === 'enderecos' && user && user.UserID) {
      fetchAddresses();
    }
  }, [currentSection, user]);

  const fetchAddresses = async () => {
    // Certifica-se de que o user está definido
    if (user && user.UserID) {
      try {
        console.log(user.UserID)
        const response = await api.get(`/usuario/enderecos/${user.UserID}`);
        console.log("Endereços recebidos:", response.data);
        setAddresses(response.data);
      } catch (error) {
        console.error("Erro ao buscar os endereços", error);
      }
    }
  };

  const formatAddress = (address: AddressType) => {
    return `${address.logradouro}, ${address.numero} ${address.bairro}, ${address.cidade}, ${address.estado} CEP: ${address.cep}`;
  };

  return (
    <div className="min-h-screen bg-jays-orange">
      <Header setServices={setServices}/>
      <div className="flex justify-around w-full p-10">
        <Menu onClick={setCurrentSection} />

        {currentSection === "cadastro" && (
          <div className="w-9/12 p-5 bg-white rounded-3xl shadow">
            <h2 className="mb-5 text-xl font-bold">Atualize seu cadastro</h2>
            <UserProfileComponent />
          </div>
        )}
        {currentSection === "enderecos" && (
      <div className="w-9/12 p-5 bg-white rounded-3xl shadow">
        <h2 className="mb-5 text-xl font-bold">Endereços</h2>
        <div className="grid grid-cols-3 gap-4">
          {addresses.map((address: AddressType) => (
            <AddressCard
              key={address.id}
              id={address.id}
              address={formatAddress(address)}
              onClick={(section, id) => {
                console.log(id);
                setCurrentSection(section);
                setSelectedAddressId(id);
              }}
            />
          ))}
        </div>
      </div>
    )}
        {currentSection === "servico" && (
          <div className="w-9/12 p-5 bg-white rounded-3xl shadow">
            <h2 className="mb-5 text-xl font-bold">Cadastre um serviço</h2>
            <ServiceRegisterComponent />
          </div>
        )}
        {currentSection === "editarendereco" && selectedAddressId &&(
          <div className="w-9/12 p-5 bg-white rounded-3xl shadow">
            <h2 className="mb-5 text-xl font-bold">Editar Endereço</h2>
            <AddressEditComponent addressId={selectedAddressId} onClick={setCurrentSection} />
          </div>
        )}

        {/* Aqui você pode adicionar outros conteúdos baseados em currentSection */}
      </div>
    </div>
  );
}
