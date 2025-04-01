import { useContext } from "react";
import { FaCamera } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { AuthContext } from "./AuthContext";

const ProfileSection = ({ onBack }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-4 pt-16 space-y-6 h-full">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-[#E0E7FF] hover:bg-[#1A1F2C] p-2 rounded-full"
        >
          <IoChevronBack className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-[#E0E7FF] mx-auto">Perfil</h2>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-[#3A86FF] flex items-center justify-center text-[#E0E7FF] text-3xl font-bold border-4 border-[#3A86FF]">
            AC
          </div>
          {/* <button className="absolute bottom-0 right-0 rounded-full bg-[#FF6B6B] hover:bg-[#FF8C8C] p-2">
            <FaCamera className="h-4 w-4 text-[#0A0F1C]" />
          </button> */}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#E0E7FF]">Nombre</label>
          <input
            className="w-full px-3 py-2 bg-[#1A1F2C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring-[#3A86FF] focus:border-[#3A86FF]"
            placeholder="Tu nombre"
            disabled={true}
            value={user.name}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#E0E7FF]">
            Correo electrónico
          </label>
          <input
            className="w-full px-3 py-2 bg-[#495269] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring-[#3A86FF] focus:border-[#3A86FF]"
            placeholder="tu@ejemplo.com"
            type="email"
            disabled={true}
            value={user.email}
          />
        </div>
        {/* <div className="pt-4">
          <button className="w-full py-2 bg-[#3A86FF] hover:bg-[#E0E7FF] hover:text-[#0A0F1C] text-[#0A0F1C] font-medium rounded-md transition-colors">
            Guardar cambios
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileSection;
