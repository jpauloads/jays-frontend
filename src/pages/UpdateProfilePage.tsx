import { useState } from 'react';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { AddressCard } from '../components/AddressCard';

export function UpdateProfilePage() {
  const [currentSection, setCurrentSection] = useState('cadastro');
  return (
    <div className="min-h-screen bg-jays-orange">
      <Header />
      <div className="flex justify-around w-full p-10">
        <Menu onClick={setCurrentSection} />
        
        {currentSection === 'enderecos' && (
          <div className="w-3/5 p-5 bg-white rounded-3xl shadow">
            <h2 className="mb-5 text-xl font-bold">Endereços</h2>
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" />
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" />
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" />
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" />
            {/* Outros endereços aqui */}
          </div>
        )}
        {currentSection === 'cadastro' && (
            <div className="w-3/5 p-5 bg-white rounded-3xl shadow">
            <h2 className="mb-5 text-xl font-bold">Atualize seu cadastro</h2>
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" />


            {/* Outros endereços aqui */}
          </div>
        )}
        
        {/* Aqui você pode adicionar outros conteúdos baseados em currentSection */}
      </div>
    </div>
  );
}
