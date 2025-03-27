import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

export const useWebSocket = (onMessageReceived, onError) => {
  const socketRef = useRef(null);

  const connect = useCallback(() => {
    if (socketRef.current) return;

    const socket = io("http://localhost:5001", {
      auth: {
        token: JSON.parse(localStorage.getItem("astroChatUser"))?.token,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
      onError?.(error);
    });

    socket.on("newMessage", (data) => {
      onMessageReceived(data);
    });

    socketRef.current = socket;
  }, [onMessageReceived, onError]);

  const joinChat = useCallback((chatId) => {
    if (socketRef.current) {
      socketRef.current.emit("joinChat", chatId);
    }
  }, []);

  const leaveChat = useCallback((chatId) => {
    if (socketRef.current) {
      socketRef.current.emit("leaveChat", chatId);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    socket: socketRef.current,
    joinChat,
    leaveChat,
  };
};
