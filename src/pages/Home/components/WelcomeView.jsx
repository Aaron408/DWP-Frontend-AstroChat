import { FaBoltLightning } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";

const WelcomeView = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 text-4xl font-bold">
          <FaBoltLightning className="text-[#FF6B6B]" />
          <h1 className="text-[#E0E7FF]">Astro Chat</h1>
          <BsStars className="text-[#3A86FF] h-12 w-12" />
        </div>
        <p className="text-[#9CA3AF] max-w-md">
          Bienvenido al espacio de chat más fascinante del universo. Selecciona
          una conversación para comenzar tu viaje interestelar.
        </p>
      </div>
    </div>
  );
};

export default WelcomeView;
