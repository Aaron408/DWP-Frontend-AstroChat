import { IoChevronBack } from "react-icons/io5";
import { MdEmail, MdQuestionAnswer } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";

const SupportSection = ({ onBack }) => {
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
          Soporte técnico
        </h2>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-start p-4 bg-[#1A1F2C] hover:bg-[#2A2F3C] rounded-md transition-colors text-left">
          <MdEmail className="h-6 w-6 text-[#3A86FF] mr-3 mt-1" />
          <div>
            <p className="font-medium text-[#E0E7FF]">Contáctanos</p>
            <p className="text-sm text-[#9CA3AF]">
              Envíanos un correo electrónico con tu consulta
            </p>
          </div>
        </button>

        <button className="w-full flex items-start p-4 bg-[#1A1F2C] hover:bg-[#2A2F3C] rounded-md transition-colors text-left">
          <MdQuestionAnswer className="h-6 w-6 text-[#3A86FF] mr-3 mt-1" />
          <div>
            <p className="font-medium text-[#E0E7FF]">Centro de ayuda</p>
            <p className="text-sm text-[#9CA3AF]">
              Visita nuestras preguntas frecuentes
            </p>
          </div>
        </button>

        <button className="w-full flex items-start p-4 bg-[#1A1F2C] hover:bg-[#2A2F3C] rounded-md transition-colors text-left">
          <FaGlobe className="h-6 w-6 text-[#3A86FF] mr-3 mt-1" />
          <div>
            <p className="font-medium text-[#E0E7FF]">Página web</p>
            <p className="text-sm text-[#9CA3AF]">Visita nuestro sitio web</p>
          </div>
        </button>

        <div className="mt-6 p-4 bg-[#1A1F2C] rounded-md">
          <h3 className="text-lg font-medium text-[#E0E7FF] mb-2">
            Envíanos un mensaje
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-[#9CA3AF] mb-1">
                Asunto
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring-[#3A86FF] focus:border-[#3A86FF]"
                placeholder="Escribe el asunto de tu consulta"
              />
            </div>
            <div>
              <label className="block text-sm text-[#9CA3AF] mb-1">
                Mensaje
              </label>
              <textarea
                className="w-full px-3 py-2 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring-[#3A86FF] focus:border-[#3A86FF] min-h-[100px]"
                placeholder="Describe tu problema o consulta"
              ></textarea>
            </div>
            <button className="w-full py-2 bg-[#3A86FF] hover:bg-[#E0E7FF] hover:text-[#0A0F1C] text-[#0A0F1C] font-medium rounded-md transition-colors">
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
