
interface AddressProps {
  address: string;
}

export function AddressCard({ address }: AddressProps) {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-lg">
      <p>{address}</p>
      <div className="flex justify-between mt-2">
        <button className="text-jays-orange">editar</button>
        <button className="text-red-500">excluir</button>
      </div>
    </div>
  );
}

