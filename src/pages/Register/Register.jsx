import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { AuthApi } from "../../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameP, setLastNameP] = useState("");
  const [lastNameM, setLastNameM] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (
      !firstName ||
      !lastNameP ||
      !email ||
      !password ||
      !passwordConfirmation
    ) {
      toast.error("Llena correctamente el formulario.");
      return;
    }

    if (!isPasswordValid) {
      toast.error("La contraseña no cumple con los requisitos de seguridad.");
      return;
    }

    // Validar contraseñas coincidentes
    if (password !== passwordConfirmation) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Validar formato de correo
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|uteq.edu.mx)$/;
    if (!emailRegex.test(email)) {
      toast.error(
        "El correo debe ser una cuenta válida de Gmail, Hotmail o uteq.edu.mx."
      );
      return;
    }

    try {
      // Verificar si ya existe una cuenta con el correo proporcionado
      const checkUserResponse = await AuthApi.get(
        `/api/checkEmail?email=${encodeURIComponent(email)}`
      );

      if (checkUserResponse.data.exists) {
        // Si ya existe una cuenta con este correo se avisa y se detiene el proceso
        toast.error("Ya existe una cuenta con este correo electrónico.");
        return;
      }

      //Si no existe una cuenta se envía el código de verificación para la creación de una.
      const response = await AuthApi.post("/api/sendVerificationCode", {
        email, action: "registration"
      });

      if (response.status === 200) {
        toast.success("El código de verificación ha sido enviado a tu correo.");
        const nombre = `${firstName} ${lastNameP} ${lastNameM}`;

        navigate("/verification", {
          state: { nombre, email, password, action: "registration" },
        });
      } else {
        toast.error(
          response.data.message ||
            "Hubo un error al enviar el código de verificación."
        );
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      toast.error("Error de conexión. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="space-background min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#E0E7FF]">
          Regístrate en Astro Chat
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1F2C] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#3A86FF]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Nombre <span className="text-[#FF6B6B]">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser
                    className="h-5 w-5 text-[#9CA3AF]"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                  placeholder="Escribe tu nombre"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastNameP"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Apellido Paterno <span className="text-[#FF6B6B]">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser
                    className="h-5 w-5 text-[#9CA3AF]"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="lastNameP"
                  name="lastNameP"
                  type="text"
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                  placeholder="Escribe tu apellido"
                  value={lastNameP}
                  onChange={(e) => setLastNameP(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastNameM"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Apellido Materno
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser
                    className="h-5 w-5 text-[#9CA3AF]"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="lastNameM"
                  name="lastNameM"
                  type="text"
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                  placeholder="Escribe tu apellido"
                  value={lastNameM}
                  onChange={(e) => setLastNameM(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#E0E7FF]"
              >
                Correo electrónico <span className="text-[#FF6B6B]">*</span>
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
                  type="text"
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
                Contraseña <span className="text-[#FF6B6B]">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock
                    className="h-5 w-5 text-[#9CA3AF]"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                  placeholder="•••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                Confirma tu contraseña <span className="text-[#FF6B6B]">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock
                    className="h-5 w-5 text-[#9CA3AF]"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pl-10 bg-[#0A0F1C] border border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF] placeholder-[#9CA3AF]"
                  placeholder="•••••••••••"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 mt-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0A0F1C] bg-[#3A86FF] hover:bg-[#E0E7FF] focus:outline-none transition-colors"
              >
                Registrar
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#9CA3AF]">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-[#3A86FF] hover:text-[#E0E7FF]"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
