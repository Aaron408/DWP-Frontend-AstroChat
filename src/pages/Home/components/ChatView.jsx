"use client"

// Mantén el mismo nombre de archivo y ruta
import { useState, useEffect, useRef } from "react"
import MessageBubble from "../../../components/Messagebubble"
import { FiMoreVertical } from "react-icons/fi"
import { LuSendHorizontal } from "react-icons/lu"
import { toast } from "react-toastify"
import { MessagesApi } from "../../../services/api"
import { useWebSocket } from "../../../hooks/useWebSocket"

const ChatView = ({ chat }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const inputRef = useRef(null)
  const chatEndRef = useRef(null)
  const messageQueueRef = useRef([])
  const typingTimeoutRef = useRef(null)
  const lastFetchRef = useRef(0)

  // Implementación mejorada de WebSocket con cola de mensajes
  const { joinChat, leaveChat, sendTypingStatus, isConnected } = useWebSocket(
    (data) => {
      // Solo agregar el mensaje si es para este chat
      if (data.chatId === chat.id) {
        const newMessage = data.message

        // Agregar a la cola si todavía estamos cargando mensajes iniciales
        if (isLoading) {
          messageQueueRef.current.push(newMessage)
        } else {
          setMessages((prev) => [...prev, newMessage])
        }
      }
      // Manejar indicadores de escritura
      else if (data.type === "typing" && data.chatId === chat.id) {
        setIsTyping(data.isTyping)
      }
    },
    (error) => {
      console.error("Error de WebSocket en vista de chat:", error)
    },
  )

  useEffect(() => {
    if (chat?.id) {
      joinChat(chat.id)
      return () => {
        leaveChat(chat.id)
      }
    }
  }, [chat?.id, joinChat, leaveChat])

  // Enfocar el input cuando el componente se monta
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Desplazarse al final cuando cambian los mensajes
  useEffect(() => {
    if (messages.length > 0 && messagesContainerRef.current) {
      const container = messagesContainerRef.current
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  // Cargar mensajes cuando cambia el chat seleccionado
  useEffect(() => {
    if (chat && chat.id) {
      fetchMessages()
      markMessagesAsRead()

      // Solo configurar polling si WebSocket está desconectado
      let intervalId
      if (!isConnected) {
        intervalId = setInterval(() => {
          // Solo actualizar si ha pasado suficiente tiempo desde la última actualización
          if (Date.now() - lastFetchRef.current > 10000) {
            fetchMessages(false)
          }
        }, 10000)
      }

      return () => {
        if (intervalId) clearInterval(intervalId)
      }
    }
  }, [chat, isConnected])

  // Procesar mensajes en cola después de la carga inicial
  useEffect(() => {
    if (!isLoading && messageQueueRef.current.length > 0) {
      setMessages((prev) => [...prev, ...messageQueueRef.current])
      messageQueueRef.current = []
    }
  }, [isLoading])

  // Manejar indicador de escritura
  const handleTyping = () => {
    // Limpiar cualquier timeout existente
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Enviar indicador de escritura
    sendTypingStatus(chat.id, true)

    // Establecer timeout para limpiar el indicador después de 2 segundos de inactividad
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(chat.id, false)
    }, 2000)
  }

  const fetchMessages = async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true)
    }

    lastFetchRef.current = Date.now()

    try {
      const response = await MessagesApi.get(`/messages/${chat.id}`)
      const sortedMessages = response.data.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

      setMessages(sortedMessages)

      // Procesar mensajes que llegaron durante la carga
      if (messageQueueRef.current.length > 0) {
        setTimeout(() => {
          setMessages((prev) => [...prev, ...messageQueueRef.current])
          messageQueueRef.current = []
        }, 0)
      }
    } catch (error) {
      console.error("Error al cargar mensajes:", error)
      toast.error("Error al cargar los mensajes")
    } finally {
      setIsLoading(false)
    }
  }

  const markMessagesAsRead = async () => {
    try {
      await MessagesApi.post(`/mark-read/${chat.id}`)
    } catch (error) {
      console.error("Error al marcar mensajes como leídos:", error)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    setIsSending(true)

    try {
      const response = await MessagesApi.post("/send-message", {
        receiverId: chat.id,
        content: newMessage.trim(),
      })

      // Agregar el mensaje enviado a la lista local
      const sentMessage = {
        id: response.data.messageId,
        senderId: JSON.parse(localStorage.getItem("astroChatUser")).id,
        receiverId: chat.id,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        read: false,
      }

      setMessages([...messages, sentMessage])
      setNewMessage("")
      inputRef.current?.focus()

      // Limpiar indicador de escritura
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        sendTypingStatus(chat.id, false)
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
      toast.error("Error al enviar el mensaje")
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    } else {
      // Activar indicador de escritura
      handleTyping()
    }
  }

  return (
    <div className="flex flex-col h-full w-full z-10">
      <header className="bg-[#0A0F1C] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {chat.avatar ? (
            <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#6E3CBC] flex items-center justify-center text-white font-bold">
              {chat.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{chat.name}</h2>
            {isTyping && <p className="text-sm text-[#3A86FF]">Escribiendo...</p>}
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="text-[#9CA3AF] hover:text-[#E0E7FF] p-2 rounded-full hover:bg-[#1A1F2C]">
            <FiMoreVertical className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div ref={messagesContainerRef} className="flex-grow overflow-auto p-4 space-y-4">
        {isLoading ? (
          // Mostrar esqueletos de carga
          [...Array(5)].map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"} animate-pulse`}>
              <div
                className={`max-w-[70%] p-3 rounded-lg ${i % 2 === 0 ? "bg-[#3A86FF] bg-opacity-30" : "bg-[#1A1F2C]"}`}
                style={{ width: `${Math.floor(Math.random() * 40) + 30}%` }}
              >
                <div className="h-4 bg-[#9CA3AF] bg-opacity-30 rounded"></div>
                <div className="h-4 mt-2 bg-[#9CA3AF] bg-opacity-30 rounded w-3/4"></div>
              </div>
            </div>
          ))
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.content}
              timestamp={new Date(message.timestamp).toLocaleString()}
              senderId={message.senderId}
              contact={chat.id}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#9CA3AF] text-center">No hay mensajes aún. ¡Envía el primero!</p>
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
            disabled={isSending}
          >
            <LuSendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatView

