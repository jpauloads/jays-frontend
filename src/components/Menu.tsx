interface MenuProps {
  onClick: (section: string) => void;
}

export function Menu({ onClick }: MenuProps) {
  return (
    <div className="w-1/5 bg-jays-orange">
      {/* Cadastro */}
      <button 
        className="w-full mb-5 flex items-center p-4 bg-white rounded-lg shadow-lg"
        onClick={() => onClick('cadastro')}
      >
        {/* Ícone do Cadastro */}
        <div className="bg-gray-300 p-2 rounded-full mr-2"></div>
        <div>
          <span className="font-bold">Cadastro</span>
          <p className="text-sm">Ver e alterar seus dados, seu e-mail e sua senha</p>
        </div>
      </button>

      {/* Endereços */}
      <button 
        className="w-full mb-5 flex items-center p-4 bg-white rounded-lg shadow-lg"
        onClick={() => onClick('enderecos')}
      >
        {/* Ícone do Endereço */}
        <div className="bg-gray-300 p-2 rounded-full mr-2"></div>
        <div>
          <span className="font-bold">Endereços</span>
          <p className="text-sm">Ver e alterar seus endereços</p>
        </div>
      </button>

      {/* Aqui você pode adicionar outros itens de menu seguindo o mesmo estilo */}
    </div>
  );
}
