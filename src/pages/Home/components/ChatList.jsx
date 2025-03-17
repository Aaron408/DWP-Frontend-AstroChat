"use client";

import UserMenu from "../../../components/UserMenu";
import { FaSearch } from "react-icons/fa";

const Chats = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: `chat-${i}`,
    name: `Usuario ${i + 1}`,
    avatar: ``,
    lastMessage: "Último mensaje del chat...",
    timestamp: "12:34",
    // isOnline: Math.random() > 0.5,
  }));

const ChatList = ({ onSelectChat, selectedChatId, onViewChange }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chats</h1>
        <UserMenu onViewChange={onViewChange} />
      </div>
      <div className="p-4">
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Buscar conversación"
            className="w-full pl-10 py-2 bg-[#1A1F2C] border-none rounded text-[#E0E7FF] placeholder-[#9CA3AF]"
          />
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="p-2 space-y-1">
          {Chats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full flex items-center px-2 py-3 ${
                chat.id === selectedChatId
                  ? "bg-[#1A1F2C]"
                  : "hover:bg-[#1A1F2C]"
              } rounded-lg transition-colors duration-200 text-left`}
              onClick={() => onSelectChat(chat)}
            >
              {/* Avatar o círculo blanco */}
              {chat.avatar ? (
                <img
                  src={chat.avatar || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white mr-3"></div>
              )}

              {/* Información del chat */}
              <div className="flex-1 overflow-hidden">
                <p className="font-medium text-sm truncate">{chat.name}</p>
                <p className="text-xs text-[#9CA3AF] truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-[#9CA3AF]">{chat.timestamp}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
