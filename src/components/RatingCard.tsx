type RatingCardProps = {
    nota: number;
    comentario: string;
};

export function RatingCard({ nota, comentario }: RatingCardProps) {
    // Array de estrelas para representar a nota
    const stars = Array.from({ length: 5 }, (_, index) => {
        return index < nota ? '★' : '☆';
    });

    return (
        <div className="m-auto w-3/5 lg:flex my-4 border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex flex-col justify-between leading-normal">
                <div className="mb-2">
                    <div className="text-yellow-500 text-lg mb-1">
                        {stars.map((star, index) => (
                            <span key={index} className="pr-1">{star}</span>
                        ))}
                    </div>
                    <p className="text-gray-700 text-base">{comentario}</p>
                </div>
            </div>
        </div>
    );
}