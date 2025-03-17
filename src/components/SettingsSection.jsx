import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { FaFont } from "react-icons/fa";

const SettingsSection = ({ onBack }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState("medium");
  const [language, setLanguage] = useState("es");

  return (
    <div className="p-4 pt-16 space-y-6 h-full">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-[#E0E7FF] hover:bg-[#1A1F2C] p-2 rounded-full"
        >
          <IoChevronBack className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-[#E0E7FF] mx-auto">Ajustes</h2>
      </div>

      <div className="space-y-6">
        {/* Tema */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-[#E0E7FF]">Tema</h3>
          <div className="flex items-center justify-between bg-[#1A1F2C] p-3 rounded-md">
            <div className="flex items-center space-x-3">
              {darkMode ? (
                <MdDarkMode className="h-5 w-5 text-[#3A86FF]" />
              ) : (
                <MdLightMode className="h-5 w-5 text-[#FF6B6B]" />
              )}
              <span className="text-[#E0E7FF]">Modo oscuro</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-[#0A0F1C] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#3A86FF] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A1F2C]"></div>
            </label>
          </div>
        </div>

        {/* Tamaño de fuente */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-[#E0E7FF]">
            Tamaño de fuente
          </h3>
          <div className="bg-[#1A1F2C] p-3 rounded-md">
            <div className="flex items-center space-x-3 mb-2">
              <FaFont className="h-5 w-5 text-[#3A86FF]" />
              <span className="text-[#E0E7FF]">Ajustar tamaño</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#9CA3AF]">Pequeño</span>
              <div className="w-full mx-2">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={
                    fontSize === "small" ? 1 : fontSize === "medium" ? 2 : 3
                  }
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setFontSize(
                      val === 1 ? "small" : val === 2 ? "medium" : "large"
                    );
                  }}
                  className="w-full h-2 bg-[#0A0F1C] rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <span className="text-xs text-[#9CA3AF]">Grande</span>
            </div>
          </div>
        </div>

        {/* Idioma */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-[#E0E7FF]">Idioma</h3>
          <div className="bg-[#1A1F2C] p-3 rounded-md">
            <div className="flex items-center space-x-3 mb-2">
              <IoLanguage className="h-5 w-5 text-[#3A86FF]" />
              <span className="text-[#E0E7FF]">Seleccionar idioma</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 bg-[#0A0F1C] border border-[#3A86FF] rounded text-[#E0E7FF]"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full py-2 bg-[#3A86FF] hover:bg-[#E0E7FF] hover:text-[#0A0F1C] text-[#0A0F1C] font-medium rounded-md transition-colors">
            Guardar ajustes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
