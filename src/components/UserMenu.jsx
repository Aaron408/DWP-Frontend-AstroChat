"use client";

import { useState } from "react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-[#E0E7FF] hover:bg-[#1A1F2C] p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#0A0F1C] border border-[#1A1F2C] rounded-md shadow-lg z-10">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E0E7FF] hover:bg-[#1A1F2C]"
            >
              Perfil
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E0E7FF] hover:bg-[#1A1F2C]"
            >
              Ajustes
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E0E7FF] hover:bg-[#1A1F2C]"
            >
              Notificaciones
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#E0E7FF] hover:bg-[#1A1F2C]"
            >
              Soporte técnico
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-[#FF6B6B] hover:bg-[#1A1F2C]"
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
