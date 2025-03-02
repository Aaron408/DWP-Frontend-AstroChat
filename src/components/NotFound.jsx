import { useEffect } from "react";

import { TiWarningOutline } from "react-icons/ti";
import { FaBoltLightning } from "react-icons/fa6";

const NotFound = () => {
  useEffect(() => {
    // Crear estrellas
    const starsContainer = document.querySelector(".space-background");
    for (let i = 0; i < 200; i++) {
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
    <div className="space-background min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="text-center space-y-6 relative z-10">
        <div className="flex items-center justify-center space-x-4">
          <TiWarningOutline className="text-[#FF6B6B] h-16 w-16" />
          <h1 className="text-6xl font-bold text-[#E0E7FF]">404</h1>
          <FaBoltLightning className="text-[#3A86FF] h-12 w-12" />
        </div>
        <h2 className="text-3xl font-semibold text-[#E0E7FF]">
          Página no encontrada
        </h2>
        <p className="text-[#9CA3AF] max-w-md mx-auto">
          Parece que te has aventurado en un sector inexplorado del espacio.
          Esta página no existe en nuestro universo conocido.
        </p>
        <a
          href="/"
          className="inline-block bg-[#6E3CBC] hover:bg-[#5D2E9E] text-[#E0E7FF] font-bold py-2 px-4 rounded"
        >
          Volver a la estación espacial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
