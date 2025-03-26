const MessageBubble = ({ message, timestamp, senderId, contact, isRead }) => {
  return (
    <div className={`flex ${senderId !== contact ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg border ${
          senderId !== contact
            ? "bg-[#6E3CBC] text-white" //Color para mensajes enviados
            : "bg-[#3A86FF] text-white" //Color para mensajes recibidos
        }`}
      >
        <p className="break-words text-sm">{message}</p>
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className="text-xs opacity-70">{timestamp}</span>
          {senderId && (
            <span className="text-xs">
              {isRead ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline-block"
                >
                  <path d="M18 6L7 17L2 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline-block"
                >
                  <path d="M5 12L10 17L20 7" />
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
