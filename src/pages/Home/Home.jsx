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

  // Manejar la tecla Escape para cerrar el chat
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
    <div className="space-background grid grid-cols-[290px_1fr] h-screen">
      <aside className="border-r border-[#1A1F2C]">
        {renderSidebarContent()}
      </aside>
      <div className="flex items-center justify-center overflow-auto">
        {selectedChat ? <ChatView chat={selectedChat} /> : <WelcomeView />}
      </div>
    </div>
  );
};

export default Home;
