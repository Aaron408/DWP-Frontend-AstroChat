import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoltLightning } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthApi } from "../../services/api";

const PasswordRecovery = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email input, 2: New password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

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

      //Planetita
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

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const validatePassword = (password) => {
    setPasswordStrength({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const isPasswordValid = Object.values(passwordStrength).every(Boolean);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor, ingresa tu correo electrónico.");
      return;
    }

    setIsLoading(true);

    try {
      // Verificar si existe un usuario con ese correo
      const checkUserResponse = await AuthApi.get(
        `/api/checkEmail?email=${encodeURIComponent(email)}`
      );

      if (!checkUserResponse.data.exists) {
        toast.error("No existe una cuenta con este correo electrónico.");
        setIsLoading(false);
        return;
      }

      // Enviar código de verificación para recuperación
      const response = await AuthApi.post("/api/sendVerificationCode", {
        email,
        action: "recovery",
      });

      if (response.status === 200) {
        toast.success("El código de verificación ha sido enviado a tu correo.");

        // Redirigir a la página de verificación con los datos necesarios
        navigate("/verification", {
          state: {
            email,
            action: "recovery",
          },
        });
      } else {
        toast.error(
          response.data.message ||
            "Hubo un error al enviar el código de verificación."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error de conexión. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-background min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex items-center justify-center space-x-2 text-4xl font-bold mb-6">
          <FaBoltLightning className="text-[#FF6B6B]" />
          <h1 className="text-[#E0E7FF]">Astro Chat</h1>
          <BsStars className="text-[#3A86FF] h-12 w-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#E0E7FF]">
          Recupera tu contraseña
        </h2>
        <p className="mt-2 text-center text-sm text-[#9CA3AF]">
          Ingresa tu correo electrónico para recibir un código de verificación
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1F2C] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#3A86FF]">
          <form onSubmit={handleSubmitEmail} className="space-y-6">
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
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0A0F1C] bg-[#3A86FF] hover:bg-[#E0E7FF] focus:outline-none transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar código de verificación"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#9CA3AF]">
              ¿Recordaste tu contraseña?{" "}
              <Link
                to="/login"
                className="font-medium text-[#3A86FF] hover:text-[#E0E7FF]"
              >
                Volver al inicio de sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
