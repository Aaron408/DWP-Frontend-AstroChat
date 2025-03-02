"use client";

import { useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatView from "./components/ChatView";
import WelcomeView from "./components/WelcomeView";
import { useChat } from "../../hooks/useChat";

const Home = () => {
  const { selectedChat, selectChat } = useChat();

  useEffect(() => {
    // Crear estrellas
    const starsContainer = document.querySelector(".space-background");
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

    // Crear cometa
    const comet = document.createElement("div");
    comet.className = "comet";
    comet.style.top = "20%";
    comet.style.left = "-10px";
    starsContainer.appendChild(comet);

    // Crear planeta
    const planet = document.createElement("div");
    planet.className = "planet";
    planet.style.width = "300px";
    planet.style.height = "300px";
    planet.style.backgroundColor = "#3A86FF";
    planet.style.bottom = "-100px";
    planet.style.right = "-100px";
    starsContainer.appendChild(planet);
  }, []);

  return (
    <div className="space-background flex h-screen">
      <aside className="w-80 border-r border-[#1A1F2C]">
        <ChatList onSelectChat={selectChat} selectedChatId={selectedChat?.id} />
      </aside>
      <div className="flex-grow  flex items-center justify-center">
        {selectedChat ? <ChatView chat={selectedChat} /> : <WelcomeView />}
      </div>
    </div>
  );
};

export default Home;
