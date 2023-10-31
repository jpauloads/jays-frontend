type RedirectModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function RedirectModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: RedirectModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">{title}</h2>
        <p>{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-jays-orange mt-4 px-4 py-2 rounded-lg text-white"
            onClick={onConfirm}
          >
            Sim
          </button>
          <button
            className="bg-gray-300 mt-4 px-4 py-2 rounded-lg text-white"
            onClick={onCancel}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
