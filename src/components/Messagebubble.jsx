const MessageBubble = ({ message, timestamp, isOutgoing }) => {
  return (
    <div className={`max-w-[70%] ${isOutgoing ? "ml-auto" : ""} `}>
      <div
        className={`rounded-lg p-3 border ${
          isOutgoing ? "bg-[#6E3CBC]" : "bg-[#3A86FF]"
        }`}
      >
        <p className="text-sm">{message}</p>
        <p className="text-xs mt-1 opacity-70">{timestamp}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
