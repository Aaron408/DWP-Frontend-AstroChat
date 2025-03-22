import { useState, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatView from "./components/ChatView";
import WelcomeView from "./components/WelcomeView";
import ProfileSection from "../../components/ProfileSection";
import SettingsSection from "../../components/SettingsSection";
import NotificationsSection from "../../components/NotificationsSection";
import SupportSection from "../../components/SupportSection";
import { useChat } from "../../hooks/useChat";

const Home = () => {
  const { selectedChat, selectChat } = useChat();
  const [currentView, setCurrentView] = useState("chats");

  //Efecto para generar los elementos visuales
  useEffect(() => {
    //Verificar si ya existen elementos para evitar duplicados
    const starsContainer = document.querySelector(".space-background");

    //Limpiar elementos existentes si los hay
    const existingStars = starsContainer.querySelectorAll(".star");
    const existingComet = starsContainer.querySelector(".comet");
    const existingPlanet = starsContainer.querySelector(".planet");

    if (existingStars.length > 0 || existingComet || existingPlanet) {
      return;
    }

    //Generación de estrellas
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.width = `${Math.random() * 2}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      starsContainer.appendChild(star);
    }

    //Cometa
    const comet = document.createElement("div");
    comet.className = "comet";
    comet.style.top = "20%";
    comet.style.left = "-10px";
    starsContainer.appendChild(comet);

    //Planetita
    const planet = document.createElement("div");
    planet.className = "planet";
    planet.style.width = "300px";
    planet.style.height = "300px";
    planet.style.backgroundColor = "#3A86FF";
    planet.style.bottom = "-100px";
    planet.style.right = "-100px";
    starsContainer.appendChild(planet);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedChat) {
        selectChat(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedChat, selectChat]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView("chats");
  };

  const renderSidebarContent = () => {
    switch (currentView) {
      case "profile":
        return <ProfileSection onBack={handleBack} />;
      case "settings":
        return <SettingsSection onBack={handleBack} />;
      case "notifications":
        return <NotificationsSection onBack={handleBack} />;
      case "support":
        return <SupportSection onBack={handleBack} />;
      case "signout":
        return (
          <div className="p-4 pt-16 space-y-6 h-full">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 text-[#E0E7FF] hover:bg-[#1A1F2C] p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-[#E0E7FF] mx-auto">
                Cerrar sesión
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-[#9CA3AF]">
                ¿Estás seguro de que quieres cerrar sesión?
              </p>
              <button className="w-full py-2 bg-[#FF6B6B] hover:bg-[#FF8C8C] text-[#0A0F1C] font-medium rounded-md transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 12.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        );
      default:
        return (
          <ChatList
            onSelectChat={selectChat}
            selectedChatId={selectedChat?.id}
            onViewChange={handleViewChange}
          />
        );
    }
  };

  return (
    <div className="space-background flex h-screen">
      <aside className="w-80 border-r border-[#1A1F2C]">
        {renderSidebarContent()}
      </aside>
      <div className="flex-grow flex items-center justify-center">
        {selectedChat ? <ChatView chat={selectedChat} /> : <WelcomeView />}
      </div>
    </div>
  );
};

export default Home;
