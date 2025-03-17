import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { FaVolumeUp } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

const NotificationsSection = ({ onBack }) => {
  const [messageNotifs, setMessageNotifs] = useState(true);
  const [soundNotifs, setSoundNotifs] = useState(true);
  const [appSounds, setAppSounds] = useState(false);

  return (
    <div className="p-4 pt-16 space-y-6 h-full">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-[#E0E7FF] hover:bg-[#1A1F2C] p-2 rounded-full"
        >
          <IoChevronBack className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-[#E0E7FF] mx-auto">
          Notificaciones
        </h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-[#1A1F2C] p-4 rounded-md">
          <div className="flex items-center space-x-3">
            <MdMessage className="h-5 w-5 text-[#3A86FF]" />
            <div>
              <p className="font-medium text-[#E0E7FF]">Notificaciones</p>
              <p className="text-sm text-[#9CA3AF]">
                Notificaciones dentro de la aplicación
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={messageNotifs}
              onChange={() => setMessageNotifs(!messageNotifs)}
            />
            <div className="w-11 h-6 bg-[#0A0F1C] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#3A86FF] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A1F2C]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between bg-[#1A1F2C] p-4 rounded-md">
          <div className="flex items-center space-x-3">
            <IoNotifications className="h-5 w-5 text-[#3A86FF]" />
            <div>
              <p className="font-medium text-[#E0E7FF]">Correo</p>
              <p className="text-sm text-[#9CA3AF]">
                Notificaciones por correo
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={soundNotifs}
              onChange={() => setSoundNotifs(!soundNotifs)}
            />
            <div className="w-11 h-6 bg-[#0A0F1C] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#3A86FF] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A1F2C]"></div>
          </label>
        </div>

      </div>
    </div>
  );
};

export default NotificationsSection;
