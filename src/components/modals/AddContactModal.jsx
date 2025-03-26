import { toast } from "react-toastify";

const AddContactModal = ({ myFriendCode, onClose, onAddByCode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0A0F1C] p-4 rounded-lg w-full max-w-md text-[#E0E7FF] border border-[#1A1F2C]">
        <h3 className="text-xl font-bold mb-4">Añadir contacto</h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-[#9CA3AF] mb-2">Tu código de amigo:</p>
            <div className="flex items-center bg-[#1A1F2C] p-2 rounded">
              <span className="font-mono text-lg text-[#3A86FF]">
                {myFriendCode}
              </span>
              <button
                className="ml-auto text-[#9CA3AF] hover:text-[#E0E7FF]"
                onClick={() => {
                  navigator.clipboard.writeText(myFriendCode);
                  toast.success("Código copiado al portapapeles");
                }}
              >
                Copiar
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              className="bg-[#3A86FF] hover:bg-[#2A76EF] text-white py-2 px-4 rounded"
              onClick={onAddByCode}
            >
              Añadir por código de amigo
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-transparent border border-[#3A86FF] text-[#E0E7FF] hover:bg-[#1A1F2C] py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
