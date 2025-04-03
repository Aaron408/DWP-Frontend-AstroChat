import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";

import { AuthContext } from "../../components/AuthContext";

const Login = () => {
  const IDClient =
    "456934517921-vqjcc6lftvpe1iqb2beqc3gcsfdqbik4.apps.googleusercontent.com";
  const { login, googleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    //Crear estrellas
    const starsContainer = document.querySelector(".space-background");
    if (!starsContainer.querySelector(".star")) {
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

      //Crear cometa
      const comet = document.createElement("div");
      comet.className = "comet";
      comet.style.top = "20%";
      comet.style.left = "-10px";
      starsContainer.appendChild(comet);

      //Crear planeta
      const planet = document.createElement("div");
      planet.className = "planet";
      planet.style.width = "300px";
      planet.style.height = "300px";
      planet.style.backgroundColor = "#3A86FF";
      planet.style.bottom = "-100px";
      planet.style.right = "-100px";
      planet.style.opacity = "0.2";
      planet.style.borderRadius = "50%";
      planet.style.position = "absolute";
      planet.style.boxShadow = "0 0 100px 50px rgba(58, 134, 255, 0.2)";
      starsContainer.appendChild(planet);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Por favor, ingrese su correo y contraseña.");
      return;
    }
    try {
      await login(email, password, rememberMe);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleGoogleLoginSuccess = useCallback(
    (credentialResponse) => {
      try {
        googleLogin(credentialResponse.tokenId);
      } catch (error) {
        console.error("Error during Google login:", error);
        toast.error("Error al iniciar sesión con Google");
      }
    },
    [googleLogin]
  );

  const handleGoogleLoginError = useCallback(() => {
    toast.error(
      "Ha ocurrido un error al intentar iniciar sesión, intente nuevamente!"
    );
  }, []);

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: IDClient,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="space-background min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex items-center justify-center space-x-2 text-4xl font-bold mb-6">
          <FaBoltLightning className="text-[#FF6B6B]" />
          <h1 className="text-[#E0E7FF]">Astro Chat</h1>
          <BsStars className="text-[#3A86FF] h-12 w-12" />
        </div>
      </div>
      

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1F2C] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#3A86FF]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Correo electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdMailOutline className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-[#9CA3AF] hover:text-[#E0E7FF] focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="sr-only">
                      {showPassword ? "Hide" : "Show"} password
                    </span>
                    {showPassword ? (
                      <FaEyeSlash className="h-6 w-6" />
                    ) : (
                      <FaEye className="h-6 w-6" />
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
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[#E0E7FF]"
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/recover-password"
                  className="font-medium text-[#3A86FF] hover:text-[#E0E7FF]"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0A0F1C] bg-[#3A86FF] hover:bg-[#E0E7FF] focus:outline-none transition-colors"
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
              <GoogleLogin
                clientId={IDClient}
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginError}
                cookiePolicy={"single_host_policy"}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="w-full flex items-center justify-center py-2 px-4 border border-[#3A86FF] rounded-md shadow-sm text-sm font-medium text-[#E0E7FF] bg-[#0A0F1C] hover:bg-[#1A1F2C] focus:outline-none transition-colors"
                  >
                    <FaGoogle className="mr-2 h-4 w-4" />
                    Continuar con Google
                  </button>
                )}
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#9CA3AF]">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="font-medium text-[#3A86FF] hover:text-[#E0E7FF]"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
