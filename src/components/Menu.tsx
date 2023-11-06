import { useState } from 'react';
import arrow_icon from '../assets/images/icons/arrow_forward_ios.png';
import service_icon from '../assets/images/icons/engineering.png';
import location_icon from '../assets/images/icons/location_on.png';
import person_icon from '../assets/images/icons/person.png';

interface MenuProps {
  onClick: (section: string) => void;
}

export function Menu({ onClick }: MenuProps) {

  const [selectedSection, setSelectedSection] = useState<string>('cadastro');

  const handleButtonClick = (section: string) => {
    setSelectedSection(section);
    onClick(section);
  };

  const isSelected = (section: string) => selectedSection === section;

  const box = 'justify-start h-24 w-full mb-5 flex items-center p-4 bg-white rounded-3xl shadow-lg hover:bg-orange-50';

  return (
    <div className="w-1/5 bg-jays-orange">
      {/* Cadastro */}
      <button 
        className={box}
        onClick={() => handleButtonClick('cadastro')}
      >
        <div className={`w-1.5 h-14 flex-col justify-center items-center inline-flex ${isSelected('cadastro') ? '' : 'hidden'}`}> 
          <div className="w-1.5 h-14 bg-orange-600 rounded-3xl" />
        </div>
        {/* Ícone do Cadastro */}
        <div className="p-2 rounded-full mr-2">
          <img className='' src={person_icon} alt='Cadastro' />
        </div>
        <div className='w-full text-start'>
          <span className="font-bold">Cadastro</span>
          <p className="text-sm">Ver e alterar seus dados, seu e-mail e sua senha</p>
        </div>
        <div className="p-2 rounded-full mr-2">
          <img className='' src={arrow_icon} alt='Seta' />
        </div>
      </button>

      {/* Endereços */}
      <button 
        className={box}
        onClick={() => handleButtonClick('enderecos')}
      >
        <div className={`w-1.5 h-14 flex-col justify-center items-center inline-flex ${isSelected('enderecos') ? '' : 'hidden'}`}>
          <div className="w-1.5 h-14 bg-orange-600 rounded-3xl" />
        </div>
        {/* Ícone do Endereço */}
        <div className="p-2 rounded-full mr-2">
          <img className='' src={location_icon} alt='Endereços'/>
        </div>
        <div className='w-full text-start'>
          <span className="font-bold">Endereços</span>
          <p className="w-full text-sm">Ver e alterar seus endereços</p>
        </div>
        <div className="p-2 rounded-full mr-2">
          <img className='' src={arrow_icon} alt='Seta'/>
        </div>
      </button>

      {/* Serviços */}
      <button 
        className={box}
        onClick={() => handleButtonClick('servicos')}
      >
        <div className={`w-1.5 h-14 flex-col justify-center items-center inline-flex ${isSelected('servicos') ? '' : 'hidden'}`}>
          <div className="w-1.5 h-14 bg-orange-600 rounded-3xl" />
        </div>
        {/* Ícone do Endereço */}
        <div className="p-2 rounded-full mr-2">
          <img className='' src={service_icon} alt='Servico'/>
        </div>
        <div className='w-full text-start'>
          <span className="font-bold">Serviço</span>
          <p className="w-full text-sm">Ver e alterar seu serviço</p>
        </div>
        <div className="p-2 rounded-full mr-2">
          <img className='' src={arrow_icon} alt='Seta' />
        </div>
      </button>

      {/* Aqui você pode adicionar outros itens de menu seguindo o mesmo estilo */}
    </div>
  );
}
