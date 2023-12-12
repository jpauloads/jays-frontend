import { useState } from 'react';

type RatingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveRating: (rating: number, comment: string) => void;
};

export function RatingModal({ isOpen, onClose, onSaveRating }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {/* Rating buttons */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`mx-1 ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment input */}
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Comentário"
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Action buttons */}
        <div className="flex justify-end">
          <button
            className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-jays-orange text-white py-2 px-4 rounded hover:bg-orange-700"
            onClick={() => {
              onSaveRating(rating, comment);
              onClose();
            }}
          >
            Avaliar
          </button>
        </div>
      </div>
    </div>
  );
}
