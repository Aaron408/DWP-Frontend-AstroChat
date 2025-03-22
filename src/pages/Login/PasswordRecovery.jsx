import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";

const PasswordRecovery = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  useEffect(() => {
    validatePassword(newPassword);
  }, [newPassword]);

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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //Simulación de envío de código
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      alert("Código de recuperación enviado a tu correo");
    }, 1500);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //Simulación de verificación de código
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      alert("Código válido");
    }, 1500);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      alert("La contraseña no cumple con los requisitos de seguridad");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    //Simulación de actualización de contraseña
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
      alert("Contraseña actualizada exitosamente");
    }, 1500);
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== "" && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
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
          Recuperar contraseña
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1F2C] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#3A86FF]">
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#E0E7FF]"
                >
                  Correo electrónico
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdMailOutline
                      className="h-5 w-5 text-[#9CA3AF]"
                      aria-hidden="true"
                    />
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0A0F1C] bg-[#3A86FF] hover:bg-[#E0E7FF] focus:outline-none transition-colors"
                >
                  {isLoading ? "Enviando..." : "Enviar código de recuperación"}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleCodeSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-[#E0E7FF]"
                >
                  Código de verificación
                </label>
                <div className="mt-1 flex justify-between">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center text-2xl bg-[#0A0F1C] border-2 border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF]"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0A0F1C] bg-[#3A86FF] hover:bg-[#E0E7FF] focus:outline-none transition-colors"
                >
                  {isLoading ? "Verificando..." : "Verificar código"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-[#E0E7FF]"
                >
                  Nueva contraseña
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock
                      className="h-5 w-5 text-[#9CA3AF]"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="new-password"
                    name="new-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-[#E0E7FF]"
                >
                  Confirmar nueva contraseña
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock
                      className="h-5 w-5 text-[#9CA3AF]"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading || !isPasswordValid}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0A0F1C] bg-[#3A86FF] hover:bg-[#E0E7FF] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Actualizando..." : "Actualizar contraseña"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
