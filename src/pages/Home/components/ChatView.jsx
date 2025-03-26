import { useState, useEffect, useRef } from "react";
import MessageBubble from "../../../components/Messagebubble";
import { FiMoreVertical } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";
import { toast } from "react-toastify";
import { MessagesApi } from "../../../services/api";

const ChatView = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  //Focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    //Only scroll if we have messages and the container exists
    if (messages.length > 0 && messagesContainerRef.current) {
      //Use scrollTop instead of scrollIntoView to keep the scroll within the container
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  //Cargar mensajes cuando cambia el chat seleccionado
  useEffect(() => {
    if (chat && chat.id) {
      fetchMessages();

      //Marcar mensajes como leídos cuando se abre el chat
      markMessagesAsRead();

      //Configurar intervalo para actualizar mensajes
      const interval = setInterval(() => {
        fetchMessages(false);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [chat]);

  // Desplazarse al último mensaje cuando se cargan nuevos mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  const fetchMessages = async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const response = await MessagesApi.get(`/messages/${chat.id}`);

      // Ordenar mensajes por timestamp (más antiguos primero)
      const sortedMessages = response.data.messages.sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });

      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
      toast.error("Error al cargar los mensajes");
    } finally {
      setIsLoading(false);
    }
  };

  const markMessagesAsRead = async () => {
    try {
      await MessagesApi.post(`/mark-read/${chat.id}`);
    } catch (error) {
      console.error("Error al marcar mensajes como leídos:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);

    try {
      const response = await MessagesApi.post("/send-message", {
        receiverId: chat.id,
        content: newMessage.trim(),
      });

      // Agregar el mensaje enviado a la lista local
      const sentMessage = {
        id: response.data.messageId,
        senderId: JSON.parse(localStorage.getItem("astroChatUser")).id,
        receiverId: chat.id,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        read: false,
      };

      setMessages([...messages, sentMessage]);
      setNewMessage("");

      // Focus the input after sending
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      toast.error("Error al enviar el mensaje");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full w-full z-10">
      <header className="bg-[#0A0F1C] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {chat.avatar ? (
            <img
              src={chat.avatar || "/placeholder.svg"}
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

      <div
        ref={messagesContainerRef}
        className="flex-grow overflow-auto p-4 space-y-4"
      >
        {isLoading ? (
          // Mostrar esqueletos de carga
          [...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`flex ${
                i % 2 === 0 ? "justify-end" : "justify-start"
              } animate-pulse`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  i % 2 === 0 ? "bg-[#3A86FF] bg-opacity-30" : "bg-[#1A1F2C]"
                }`}
                style={{ width: `${Math.floor(Math.random() * 40) + 30}%` }}
              >
                <div className="h-4 bg-[#9CA3AF] bg-opacity-30 rounded"></div>
                <div className="h-4 mt-2 bg-[#9CA3AF] bg-opacity-30 rounded w-3/4"></div>
              </div>
            </div>
          ))
        ) : messages.length > 0 ? (
          messages.map((_, i) => (
            <MessageBubble
              key={i}
              message={messages[i].content}
              timestamp={new Date(messages[i].timestamp).toLocaleString()}
              senderId={messages[i].senderId}
              contact={chat.id}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#9CA3AF] text-center">
              No hay mensajes aún. ¡Envía el primero!
            </p>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-[#0A0F1C]">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-[#1A1F2C] border-none rounded-full px-4 py-2 text-[#E0E7FF] placeholder-[#9CA3AF]"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isSending}
          />
          <button
            onClick={handleSendMessage}
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
