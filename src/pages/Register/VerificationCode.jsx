"use client";

// Modificación del componente VerificationCode para manejar la recuperación de contraseña
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBoltLightning } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { toast } from "react-toastify";
import { AuthContext } from "../../components/AuthContext";
import { AuthApi } from "../../services/api";

const VerificationCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); //3 minutos de cronometro
  const [error, setError] = useState("");
  const inputs = useRef([]);
  const timerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  //Obtenemos los datos que vienen de login/registro/recuperación
  const { nombre, email, password, rememberMe, action } = location.state || {};

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
    if (!email) {
      navigate("/");
    } else {
      startTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [email, navigate]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(180);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && code[index] === "") {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      setIsLoading(true);
      setError("");

      try {
        //Verificamos el código
        const verifyResponse = await AuthApi.post("/api/verify-code", {
          email,
          code: verificationCode,
          action,
        });

        if (verifyResponse.data.isValid) {
          if (action === "registration") {
            const registerResponse = await AuthApi.post("/api/register", {
              nombre,
              email,
              password,
            });

            if (registerResponse.data.success) {
              toast.success("Usuario registrado exitosamente");
              navigate("/login");
            } else {
              setError("Error al registrar el usuario");
              toast.error("Error al registrar el usuario");
            }
          } else if (action === "login") {
            try {
              //Ahora que el código es válido, hacemos la petición completa de login para generar el token de sesión
              const response = await AuthApi.post("/api/login", {
                email,
                password,
                rememberMe,
              });

              const { name, type, userEmail, token } = response.data;
              const userData = { name, type, userEmail, token };

              //Guardar datos en el usuario del AuthContext
              setUser(userData);

              localStorage.setItem("astroChatUser", JSON.stringify(userData));

              toast.success("¡Inicio de sesión exitoso!");

              if (type === "mortal") {
                navigate("/home");
              } else if (type === "admin") {
                navigate("/dashboard");
              }
            } catch (error) {
              console.error("Error during login:", error);
              if (error.response && error.response.status === 401) {
                toast.error(
                  "Credenciales incorrectas. Por favor, intente nuevamente."
                );
              } else if (error.response && error.response.status === 402) {
                toast.error(
                  "Cuenta existente con Google, intente iniciar con Google!"
                );
              } else {
                toast.error(
                  "Error al iniciar sesión. Por favor, intente nuevamente."
                );
              }
              throw error;
            }
          } else if (action === "recovery") {
            // Si es recuperación de contraseña, redirigir a la página para establecer nueva contraseña
            toast.success(
              "Verificación exitosa. Ahora puedes crear una nueva contraseña."
            );
            navigate("/new-password", {
              state: {
                email,
                verificationSuccess: true,
              },
            });
          }
        } else {
          setError("Código incorrecto o expirado");
          toast.error("Código incorrecto o expirado");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.response?.data?.error || "Error al verificar el código");
        toast.error(
          error.response?.data?.error || "Error al verificar el código"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Por favor, ingrese el código completo");
      toast.error("Por favor, ingrese el código completo");
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await AuthApi.post("/api/sendVerificationCode", {
        email,
        action,
      });

      if (response.status === 200) {
        setCode(["", "", "", "", "", ""]);
        inputs.current[0]?.focus();
        startTimer();
        toast.success("Código de verificación reenviado");
      } else {
        setError("Error al reenviar el código");
        toast.error("Error al reenviar el código");
      }
    } catch (error) {
      console.error("Error al reenviar el código:", error);
      setError("Error al reenviar el código");
      toast.error("Error al reenviar el código");
    } finally {
      setIsResending(false);
    }
  };

  const handleCancel = () => {
    //Volver a la pantalla anterior según el tipo de acción
    if (action === "login") {
      navigate("/login");
    } else if (action === "registration") {
      navigate("/signup");
    } else if (action === "recovery") {
      navigate("/recover-password");
    }
  };

  if (!email) {
    return null;
  }

  //Determinar el título según el tipo de acción
  const getTitle = () => {
    if (action === "login") {
      return "Verificación de seguridad";
    } else if (action === "registration") {
      return "Verifica tu cuenta";
    } else if (action === "recovery") {
      return "Recuperación de contraseña";
    }
    return "Verificación";
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
          {getTitle()}
        </h2>
        <p className="mt-2 text-center text-sm text-[#9CA3AF]">
          Ingresa el código de 6 dígitos que enviamos a{" "}
          <span className="text-[#3A86FF]">{email}</span>
        </p>
        <p className="mt-2 text-center text-sm font-medium text-[#3A86FF]">
          Tiempo restante: {formatTime(timeLeft)}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1F2C] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#3A86FF]">
          {error && (
            <div className="mb-4 p-3 bg-[#FF6B6B] bg-opacity-20 border border-[#FF6B6B] rounded-md text-[#FF6B6B]">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-2xl bg-[#0A0F1C] border-2 border-[#3A86FF] rounded-md text-[#E0E7FF] focus:outline-none focus:ring focus:border-[#3A86FF]"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isLoading || isResending || timeLeft === 0}
                />
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0A0F1C] bg-[#3A86FF] hover:bg-[#E0E7FF] focus:outline-none transition-colors"
                disabled={isLoading || isResending || timeLeft === 0}
              >
                {isLoading ? "Verificando..." : "Verificar"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#3A86FF]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1A1F2C] text-[#9CA3AF]">
                  ¿No recibiste el código?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleResendCode}
                className="w-full flex justify-center py-2 px-4 border border-[#3A86FF] rounded-md shadow-sm text-sm font-medium text-[#E0E7FF] bg-[#0A0F1C] hover:bg-[#1A1F2C] focus:outline-none transition-colors"
                disabled={isLoading || isResending || timeLeft > 0}
              >
                {isResending ? "Reenviando..." : "Reenviar código"}
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={handleCancel}
                className="text-sm font-medium text-[#9CA3AF] hover:text-[#E0E7FF]"
                disabled={isLoading || isResending}
              >
                Volver{" "}
                {action === "login"
                  ? "al inicio de sesión"
                  : action === "registration"
                  ? "al registro"
                  : "a recuperación de contraseña"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
