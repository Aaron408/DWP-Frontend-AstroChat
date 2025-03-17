"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaCog,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const UserMenu = ({ onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (view) => {
    onViewChange(view);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
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
            <button
              onClick={() => handleMenuItemClick("profile")}
              className="block w-full text-left px-4 py-2 text-sm text-[#E0E7FF] hover:bg-[#1A1F2C]"
            >
              <FaUser className="inline-block mr-2" />
              Perfil
            </button>
            {/* <button
              onClick={() => handleMenuItemClick("settings")}
              className="block w-full text-left px-4 py-2 text-sm text-[#E0E7FF] hover:bg-[#1A1F2C]"
            >
              <FaCog className="inline-block mr-2" />
              Ajustes
            </button> */}
            <button
              onClick={() => handleMenuItemClick("notifications")}
              className="block w-full text-left px-4 py-2 text-sm text-[#E0E7FF] hover:bg-[#1A1F2C]"
            >
              <FaBell className="inline-block mr-2" />
              Notificaciones
            </button>
            <button
              onClick={() => handleMenuItemClick("support")}
              className="block w-full text-left px-4 py-2 text-sm text-[#E0E7FF] hover:bg-[#1A1F2C]"
            >
              <FaQuestionCircle className="inline-block mr-2" />
              Soporte técnico
            </button>
            <button
              onClick={() => handleMenuItemClick("signout")}
              className="block w-full text-left px-4 py-2 text-sm text-[#FF6B6B] hover:bg-[#1A1F2C]"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
