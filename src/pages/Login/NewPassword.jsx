import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBoltLightning } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthApi } from "../../services/api";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, verificationSuccess } = location.state || {};

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
    // Verificar que se haya completado la verificación
    if (!email || !verificationSuccess) {
      navigate("/recover-password");
      return;
    }

    // Crear estrellas
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

      // Crear cometa
      const comet = document.createElement("div");
      comet.className = "comet";
      comet.style.top = "20%";
      comet.style.left = "-10px";
      starsContainer.appendChild(comet);

      // Crear planeta
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
  }, [email, verificationSuccess, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("La contraseña no cumple con los requisitos de seguridad.");
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthApi.post("/api/update-password", {
        email,
        newPassword: password,
      });

      if (response.status === 200) {
        toast.success("Contraseña actualizada correctamente.");
        navigate("/login");
      } else {
        toast.error(
          response.data.message || "Hubo un error al actualizar la contraseña."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "Error al actualizar la contraseña."
      );
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
          Crea una nueva contraseña
        </h2>
        <p className="mt-2 text-center text-sm text-[#9CA3AF]">
          Ingresa y confirma tu nueva contraseña para la cuenta
          <br />
          <span className="text-[#3A86FF]">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1F2C] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#3A86FF]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Nueva contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                  placeholder="•••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-[#9CA3AF] hover:text-[#E0E7FF] focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FaEye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <p
                  className={
                    passwordStrength.minLength
                      ? "text-[#3A86FF]"
                      : "text-[#FF6B6B]"
                  }
                >
                  ✓ Mínimo 8 caracteres
                </p>
                <p
                  className={
                    passwordStrength.hasUppercase
                      ? "text-[#3A86FF]"
                      : "text-[#FF6B6B]"
                  }
                >
                  ✓ Al menos una mayúscula
                </p>
                <p
                  className={
                    passwordStrength.hasLowercase
                      ? "text-[#3A86FF]"
                      : "text-[#FF6B6B]"
                  }
                >
                  ✓ Al menos una minúscula
                </p>
                <p
                  className={
                    passwordStrength.hasNumber
                      ? "text-[#3A86FF]"
                      : "text-[#FF6B6B]"
                  }
                >
                  ✓ Al menos un número
                </p>
                <p
                  className={
                    passwordStrength.hasSpecialChar
                      ? "text-[#3A86FF]"
                      : "text-[#FF6B6B]"
                  }
                >
                  ✓ Al menos un carácter especial
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Confirma tu contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                  placeholder="•••••••••••"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                {isLoading ? "Actualizando..." : "Actualizar contraseña"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
