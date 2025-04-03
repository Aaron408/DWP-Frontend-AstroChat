import { useState, useEffect } from "react";
import UserMenu from "../../../components/UserMenu";
import { FaSearch, FaUserPlus, FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import { ContactsApi } from "../../../services/api";
import AddContactModal from "../../../components/modals/AddContactModal";
import FriendCodeModal from "../../../components/modals/FriendCodeModal";
import FriendRequestsModal from "../../../components/modals/FriendRequestsModal";

const ChatList = ({ onSelectChat, selectedChatId, onViewChange }) => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFriendCodeDialog, setShowFriendCodeDialog] = useState(false);
  const [showRequestsDialog, setShowRequestsDialog] = useState(false);
  const [friendCode, setFriendCode] = useState("");
  const [myFriendCode, setMyFriendCode] = useState(
    JSON.parse(localStorage.getItem("astroChatUser")).friendCode
  );
  const [friendRequests, setFriendRequests] = useState([]);
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchContacts = async (isInitialLoad = true) => {
    if (isInitialLoad) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const response = await ContactsApi.get("/contacts");
      const contactsData = response.data.contacts || [];

      const sortedContacts = contactsData.sort((a, b) => {
        const dateA = a.rawTimestamp ? new Date(a.rawTimestamp) : new Date(0);
        const dateB = b.rawTimestamp ? new Date(b.rawTimestamp) : new Date(0);
        return dateB - dateA;
      });

      if (selectedChatId) {
        const selectedContactIndex = sortedContacts.findIndex(
          (contact) => contact.id === selectedChatId
        );
        if (selectedContactIndex !== -1) {
          sortedContacts[selectedContactIndex].hasUnreadMessages = false;
          sortedContacts[selectedContactIndex].unreadCount = 0;
        }
      }

      setContacts(sortedContacts);
    } catch (error) {
      console.error("Error loading contacts:", error);
      if (isInitialLoad) {
        toast.error("Error loading contacts");
      }
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      } else {
        setIsRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchContacts(true);

    //Configurar intervalos
    const contactsInterval = setInterval(() => {
      fetchContacts(false);
    }, 10000);

    const requestsInterval = setInterval(() => {
      fetchFriendRequests();
    }, 10000);

    return () => {
      clearInterval(contactsInterval);
      clearInterval(requestsInterval);
    };
  }, []);

  //Obtener las solicitudes de amistad
  const fetchFriendRequests = async () => {
    try {
      const response = await ContactsApi.get("/friend-requests");
      const requests = response.data.requests || [];
      setFriendRequests(requests);

      //Verifiar si hay nuevas solicitudes
      if (requests.length > 0) {
        setHasNewRequests(true);
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  //Funcón para buscar contactos
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 1) {
      //Filtro local de contactos
      const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredContacts);
    } else {
      setSearchResults([]);
    }
  };

  //Función para enviar solicitudes de amistad
  const handleSendFriendRequest = async (code) => {
    try {
      const response = await ContactsApi.post("/friend-request", {
        friendCode: code,
      });
      toast.success("Friend request sent");
      setFriendCode("");
      setShowFriendCodeDialog(false);
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error(
        error.response?.data?.message || "Error sending friend request"
      );
    }
  };

  //Función para aceptar solicitudes de amistad
  const handleAcceptFriendRequest = async (senderId) => {
    try {
      await ContactsApi.post("/accept-friend-request", { senderId });
      toast.success("Friend request accepted");

      fetchFriendRequests();
      fetchContacts();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error(
        error.response?.data?.message || "Error accepting friend request"
      );
    }
  };

  //Rechazar solicitudes
  const handleRejectFriendRequest = async (senderId) => {
    try {
      await ContactsApi.post("/reject-friend-request", { senderId });
      toast.success("Friend request rejected");

      fetchFriendRequests();
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      toast.error(
        error.response?.data?.message || "Error rejecting friend request"
      );
    }
  };

  //Aplicar el filtro de busqueda para mostrar los contactos
  const displayedContacts = searchQuery.length >= 1 ? searchResults : contacts;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chats</h1>
        <div className="flex items-center space-x-2">
          <button
            className="text-[#E0E7FF] hover:bg-[#1A1F2C] p-2 rounded-full relative"
            onClick={() => {
              setShowRequestsDialog(true);
              setHasNewRequests(false);
            }}
          >
            <FaBell className="h-5 w-5" />
            {hasNewRequests && (
              <span className="absolute top-0 right-0 h-3 w-3 bg-[#FF6B6B] rounded-full"></span>
            )}
          </button>
          <button
            className="text-[#E0E7FF] hover:bg-[#1A1F2C] p-2 rounded-full"
            onClick={() => setShowAddDialog(true)}
          >
            <FaUserPlus className="h-5 w-5" />
          </button>
          <UserMenu onViewChange={onViewChange} />
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Buscar conversación"
            className="w-full pl-10 py-2 bg-[#1A1F2C] border-none rounded text-[#E0E7FF] placeholder-[#9CA3AF]"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Modals */}
      {showAddDialog && (
        <AddContactModal
          myFriendCode={myFriendCode}
          onClose={() => setShowAddDialog(false)}
          onAddByCode={() => {
            setShowAddDialog(false);
            setShowFriendCodeDialog(true);
          }}
        />
      )}

      {showFriendCodeDialog && (
        <FriendCodeModal
          friendCode={friendCode}
          setFriendCode={setFriendCode}
          onClose={() => {
            setShowFriendCodeDialog(false);
            setFriendCode("");
          }}
          onSendRequest={handleSendFriendRequest}
        />
      )}

      {showRequestsDialog && (
        <FriendRequestsModal
          friendRequests={friendRequests}
          onClose={() => setShowRequestsDialog(false)}
          onAccept={handleAcceptFriendRequest}
          onReject={handleRejectFriendRequest}
        />
      )}

      <div className="flex-grow overflow-auto">
        {/* Indicador de refresco sutil (opcional) */}
        {isRefreshing && (
          <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
            <div className="bg-[#3A86FF] h-1 w-16 rounded-full animate-pulse"></div>
          </div>
        )}

        <div className="p-2 space-y-1">
          {isLoading ? (
            //Mostrar skeletons solo en carga inicial
            Array(10)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-full flex items-center px-2 py-3 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1A1F2C] mr-3 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-[#1A1F2C] rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-[#1A1F2C] rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="h-3 bg-[#1A1F2C] rounded w-10 animate-pulse"></div>
                </div>
              ))
          ) : displayedContacts.length > 0 ? (
            displayedContacts.map((chat) => (
              <button
                key={chat.id}
                className={`w-full flex items-center px-2 py-3 ${
                  chat.id === selectedChatId
                    ? "bg-[#1A1F2C]"
                    : chat.hasUnreadMessages
                    ? "bg-[#1A1F2C] bg-opacity-60 border-l-4 border-[#3A86FF]"
                    : "hover:bg-[#1A1F2C]"
                } rounded-lg transition-colors duration-200 text-left`}
                onClick={() => onSelectChat(chat)}
              >
                {/* Avatar o circle with initials */}
                {chat.avatar ? (
                  <img
                    src={chat.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#6E3CBC] flex items-center justify-center text-[#E0E7FF] font-bold mr-3">
                    {chat.name.substring(0, 2)}
                  </div>
                )}

                {/* Chat information */}
                <div className="flex-1 overflow-hidden">
                  <p
                    className={`font-medium text-sm truncate ${
                      chat.hasUnreadMessages
                        ? "text-[#E0E7FF] font-semibold"
                        : ""
                    }`}
                  >
                    {chat.name}
                  </p>
                  <p
                    className={`text-xs ${
                      chat.hasUnreadMessages
                        ? "text-[#3A86FF] font-medium"
                        : "text-[#9CA3AF]"
                    } truncate`}
                  >
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Timestamp and unread indicator */}
                <div className="flex flex-col items-end">
                  <span
                    className={`text-xs ${
                      chat.hasUnreadMessages
                        ? "text-[#3A86FF] font-medium"
                        : "text-[#9CA3AF]"
                    }`}
                  >
                    {chat.timestamp}
                  </span>
                  {chat.hasUnreadMessages && (
                    <span className="bg-[#3A86FF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">
                      {chat.unreadCount || "!"}
                    </span>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#9CA3AF]">
                {searchQuery.length >= 3
                  ? "No se encontraron contactos"
                  : "No tienes contactos aún"}
              </p>
              <button
                className="mt-4 bg-[#3A86FF] hover:bg-[#2A76EF] text-white py-2 px-4 rounded flex items-center justify-center mx-auto"
                onClick={() => setShowAddDialog(true)}
              >
                <FaUserPlus className="mr-2 h-4 w-4" />
                Añadir contacto
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
