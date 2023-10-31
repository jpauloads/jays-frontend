import React from 'react';

type ErrorModalProps = {
    message: string;
    onClose: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="bg-white rounded p-8 w-11/12 md:w-1/3">
                <h2 className="text-2xl mb-4">Erro</h2>
                <p>{message}</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-jays-orange text-white rounded">Fechar</button>
            </div>
        </div>
    );
};

export default ErrorModal;