"use client";

import { useState } from "react";

export const useChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  return {
    selectedChat,
    selectChat,
  };
};
