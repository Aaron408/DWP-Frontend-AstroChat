const FriendRequestsModal = ({
  friendRequests,
  onClose,
  onAccept,
  onReject,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0A0F1C] p-4 rounded-lg w-full max-w-md text-[#E0E7FF] border border-[#1A1F2C]">
        <h3 className="text-xl font-bold mb-4">Solicitudes de amistad</h3>

        <div className="max-h-[300px] overflow-y-auto">
          {friendRequests.length > 0 ? (
            <div className="space-y-3">
              {friendRequests.map((request) => (
                <div
                  key={request.senderId}
                  className="bg-[#1A1F2C] p-3 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#6E3CBC] flex items-center justify-center text-[#E0E7FF] font-bold mr-3">
                      {request.senderName.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{request.senderName}</p>
                      <p className="text-xs text-[#9CA3AF]">
                        {request.timestamp
                          ? new Date(request.timestamp).toLocaleString()
                          : "Fecha desconocida"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-transparent border border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:bg-opacity-10 py-1 px-3 rounded text-sm"
                      onClick={() => onReject(request.senderId)}
                    >
                      Rechazar
                    </button>
                    <button
                      className="bg-[#3A86FF] hover:bg-[#2A76EF] text-white py-1 px-3 rounded text-sm"
                      onClick={() => onAccept(request.senderId)}
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#9CA3AF] py-4">
              No tienes solicitudes de amistad pendientes
            </p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-transparent border border-[#3A86FF] text-[#E0E7FF] hover:bg-[#1A1F2C] py-2 px-4 rounded"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsModal;
