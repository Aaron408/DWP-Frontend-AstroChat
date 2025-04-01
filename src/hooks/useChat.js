import { useState, useCallback } from 'react';
import { ContactsApi, MessagesApi } from '../services/api';
import { toast } from 'react-toastify';

export const useChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [contacts, setContacts] = useState([]);

  const refreshContacts = useCallback(async (isInitialLoad = true) => {
    try {
      const response = await ContactsApi.get("/contacts");
      const contactsData = response.data.contacts || [];

      const sortedContacts = contactsData.sort((a, b) => {
        const dateA = a.rawTimestamp ? new Date(a.rawTimestamp) : new Date(0);
        const dateB = b.rawTimestamp ? new Date(b.rawTimestamp) : new Date(0);
        return dateB - dateA;
      });

      setContacts(sortedContacts);
      return sortedContacts;
    } catch (error) {
      console.error("Error loading contacts:", error);
      if (isInitialLoad) {
        toast.error("Error loading contacts");
      }
      return [];
    }
  }, []);

  const refreshMessages = useCallback(async (chatId, isInitialLoad = true) => {
    try {
      const response = await MessagesApi.get(`/messages/${chatId}`);
      const messages = response.data.messages.sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );
      
      return messages;
    } catch (error) {
      console.error("Error loading messages:", error);
      if (isInitialLoad) {
        toast.error("Error loading messages");
      }
      return [];
    }
  }, []);

  const selectChat = useCallback((chat) => {
    setSelectedChat(chat);
  }, []);

  return {
    selectedChat,
    contacts,
    selectChat,
    refreshContacts,
    refreshMessages
  };
};