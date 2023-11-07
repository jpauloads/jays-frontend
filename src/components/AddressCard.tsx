import { useState } from 'react';

interface AddressProps {
  address: string;
  onClick: (section: string) => void;
}

export function AddressCard({ address, onClick }: AddressProps) {

  const [selectedSection, setSelectedSection] = useState<string>('enderecos');

  const handleButtonClick = (section: string) => {
    setSelectedSection(section);
    onClick(section);
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-lg">
      <p>{address}</p>
      <div className="flex justify-between mt-2">
        <button onClick={() => handleButtonClick('editarendereco')}
        className="text-jays-orange hover:font-semibold">editar</button>
        <button className="text-red-500 hover:font-semibold">excluir</button>
      </div>
    </div>
  );
}

