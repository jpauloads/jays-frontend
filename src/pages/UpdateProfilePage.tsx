import { useState } from 'react';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { AddressCard } from '../components/AddressCard';
import { AddressEditComponent } from '../components/AddressEditComponent';

export function UpdateProfilePage() {
  const [currentSection, setCurrentSection] = useState('cadastro');
  return (
    <div className="min-h-screen bg-jays-orange">
      <Header />
      <div className="flex justify-around w-full p-10">

        <Menu onClick={setCurrentSection} />

        {currentSection === 'cadastro' && (
            <div className="w-9/12 p-5 bg-white rounded-3xl shadow">
            <h2 className="mb-5 text-xl font-bold">Atualize seu cadastro</h2>
            {/* Componente de atualizar cadastro */}
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" onClick={setCurrentSection}/>

          </div>
        )}
        {currentSection === 'enderecos' && (
          <div className="w-9/12 p-5 bg-white rounded-3xl shadow">
            <h2 className="mb-5 text-xl font-bold">Endereços</h2>
            <div className='grid grid-cols-3 gap-4'>
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" onClick={setCurrentSection}/>
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" onClick={setCurrentSection}/>
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" onClick={setCurrentSection}/>
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" onClick={setCurrentSection}/>
            </div>
            {/* Outros endereços aqui */}
          </div>
        )}
        {currentSection === 'servico' && (
          <div className="w-9/12 p-5 bg-white rounded-3xl shadow">
            <h2 className="mb-5 text-xl font-bold">Cadastre um serviço</h2>
            <AddressCard address="Av, Ubirajara Pedro da Cruz, 164 Jardim Eldorado, Uberaba, MG CEP: 3807654" onClick={setCurrentSection}/>

          </div>
        )}
        {currentSection === 'editarendereco' && (
          <div className='w-9/12 p-5 bg-white rounded-3xl shadow'>
            <h2 className="mb-5 text-xl font-bold">Editar Endereço</h2>
            <AddressEditComponent onClick={setCurrentSection}/>
          </div>
        )}
        
        {/* Aqui você pode adicionar outros conteúdos baseados em currentSection */}
      </div>
    </div>
  );
}
