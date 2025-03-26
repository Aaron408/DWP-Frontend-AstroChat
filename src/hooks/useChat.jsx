import { useState, useEffect, useRef } from "react";

export const useChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const messagesIntervalRef = useRef(null);

  useEffect(() => {
    if (messagesIntervalRef.current) {
      clearInterval(messagesIntervalRef.current);
      messagesIntervalRef.current = null;
    }
    return () => {
      if (messagesIntervalRef.current) {
        clearInterval(messagesIntervalRef.current);
      }
    };
  }, [selectedChat]);

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  return {
    selectedChat,
    selectChat,
    messagesIntervalRef,
  };
};
