import MessageBubble from "../../../components/Messagebubble";

import { FaPhone, FaVideo } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { LuSendHorizontal } from "react-icons/lu";

const ChatView = ({ chat }) => {
  return (
    <div className="flex flex-col h-full w-full z-10">
      <header className="bg-[#0A0F1C] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {chat.avatar ? (
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white"></div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{chat.name}</h2>
            {/* <p className="text-sm text-[#3A86FF]">
              {chat.isOnline ? "En línea" : "Desconectado"}
            </p> */}
          </div>
        </div>
        <div className="flex space-x-2">
          {[
            // { icon: <FaPhone className="rotate-90 h-4 w-4" />, key: "phone" },
            // { icon: <FaVideo className="h-5 w-5" />, key: "video" },
            {
              icon: <FiMoreVertical className="h-5 w-5" />,
              key: "more-vertical",
            },
          ].map(({ icon, key }) => (
            <button
              key={key}
              className="text-[#9CA3AF] hover:text-[#E0E7FF] p-2 rounded-full hover:bg-[#1A1F2C]"
            >
              {icon}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-grow overflow-auto p-4 space-y-4">
        {[...Array(10)].map((_, i) => (
          <MessageBubble
            key={i}
            message={
              i % 2 === 0
                ? "Este es un mensaje enviado con un poco más de contenido para mostrar cómo se ve con múltiples líneas, así que no sé muy bien que escribir ya. Esto sigue sin llenarse!! A, ya se llenó."
                : "Este es un mensaje recibido del otro usuario en la conversación."
            }
            timestamp={new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            isOutgoing={i % 2 === 0}
          />
        ))}
      </div>

      <div className="p-4 bg-[#0A0F1C]">
        <div className="flex items-center space-x-2">
          {/* <button
            type="button"
            className="text-[#9CA3AF] hover:text-[#E0E7FF] p-2 rounded-full hover:bg-[#1A1F2C]"
          >
            <ImAttachment className="h-5 w-5" />
          </button> */}
          <input
            type="text"
            className="flex-1 bg-[#1A1F2C] border-none rounded-full px-4 py-2 text-[#E0E7FF]"
            placeholder="Escribe un mensaje..."
          />
          <button
            onClick={() => console.log("Enviado")}
            className="rounded-full bg-[#FF6B6B] hover:bg-[#FF8C8C] text-[#0A0F1C] p-2"
          >
            <LuSendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
