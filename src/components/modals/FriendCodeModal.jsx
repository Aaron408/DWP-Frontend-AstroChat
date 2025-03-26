const FriendCodeModal = ({
  friendCode,
  setFriendCode,
  onClose,
  onSendRequest,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0A0F1C] p-4 rounded-lg w-full max-w-md text-[#E0E7FF] border border-[#1A1F2C]">
        <h3 className="text-xl font-bold mb-4">Añadir por código de amigo</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#9CA3AF] mb-2 block">
              Ingresa el código de amigo:
            </label>
            <input
              type="text"
              placeholder="#ABC123"
              className="w-full px-3 py-2 bg-[#1A1F2C] border border-[#3A86FF] rounded text-[#E0E7FF]"
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-transparent border border-[#3A86FF] text-[#E0E7FF] hover:bg-[#1A1F2C] py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-[#3A86FF] hover:bg-[#2A76EF] text-white py-2 px-4 rounded"
            onClick={() => onSendRequest(friendCode)}
          >
            Enviar solicitud
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendCodeModal;
