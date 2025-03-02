"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Create stars
    const container = document.querySelector(".space-background");
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.width = `${Math.random() * 2}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      container.appendChild(star);
    }

    // Create comet
    const comet = document.createElement("div");
    comet.className = "comet";
    container.appendChild(comet);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor, ingrese su correo y contraseña.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }
    // If validation passes, navigate to home
    navigate("/home");
  };

  return (
    <div className="space-background min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#E0E7FF]">
          Iniciar sesión en AstroChat
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1F2C] py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Correo electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-[#3A86FF] rounded-md shadow-sm placeholder-[#9CA3AF] bg-[#0A0F1C] text-[#E0E7FF] focus:outline-none focus:ring-[#3A86FF] focus:border-[#3A86FF] sm:text-sm"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-[#3A86FF] rounded-md shadow-sm placeholder-[#9CA3AF] bg-[#0A0F1C] text-[#E0E7FF] focus:outline-none focus:ring-[#3A86FF] focus:border-[#3A86FF] sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-[#9CA3AF] hover:text-[#E0E7FF] focus:outline-none focus:text-[#E0E7FF]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="sr-only">
                      {showPassword ? "Hide" : "Show"} password
                    </span>
                    {showPassword ? (
                      <IoMdEye className="h-6 w-6" />
                    ) : (
                      <IoMdEyeOff className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#3A86FF] focus:ring-[#3A86FF] border-[#3A86FF] rounded bg-[#0A0F1C]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[#E0E7FF]"
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#3A86FF] hover:text-[#E0E7FF]"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0A0F1C] bg-[#3A86FF] hover:bg-[#E0E7FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A86FF]"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#3A86FF]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1A1F2C] text-[#9CA3AF]">
                  O continúa con
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate("/home")}
                className="w-full flex items-center justify-center py-2 px-4 border border-[#3A86FF] rounded-md shadow-sm text-sm font-medium text-[#E0E7FF] bg-[#0A0F1C] hover:bg-[#1A1F2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A86FF]"
              >
                <FaGoogle className="mr-2 h-4 w-4" />
                Continuar con Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#9CA3AF]">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-medium text-[#3A86FF] hover:text-[#E0E7FF]"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
