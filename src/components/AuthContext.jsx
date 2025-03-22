import { createContext, useState, useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthApi } from "../services/api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("astroChatUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password, rememberMe) => {
    try {
      //Validar que exista un usuario conn ese correo
      const checkUserResponse = await AuthApi.get(
        `/api/checkEmail?email=${encodeURIComponent(email)}`
      );

      if (!checkUserResponse.data.exists) {
        //Si no existe entonces se muestra un error
        toast.error("No existe una cuenta con este correo electrónico.");
        return;
      }

      //Validamos que las credenciales sean correctas sin generar token
      const credentialsResponse = await AuthApi.post(
        "/api/verify-credentials",
        {
          email,
          password,
        }
      );

      if (!credentialsResponse.data.valid) {
        if (credentialsResponse.data.isGoogleAccount) {
          toast.error(
            "Esta cuenta fue registrada con Google. Por favor, inicie sesión con Google."
          );
        } else {
          toast.error(
            "Credenciales incorrectas. Por favor, intente nuevamente."
          );
        }
        return;
      }

      //Si las credenciales son correctas, enviamos el código
      const response = await AuthApi.post("/api/sendVerificationCode", {
        email,
        action: "login",
      });

      if (response.status === 200) {
        toast.success("El código de verificación ha sido enviado a tu correo.");

        navigate("/verification", {
          state: { email, password, action: "login", rememberMe },
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

  const logout = async () => {
    const userData = JSON.parse(localStorage.getItem("astroChatUser"));
    const session_token = userData.token;

    try {
      const response = await AuthApi.post("/api/logout", {
        session_token,
      });
      if (response.status && response.status === 200) {
        setUser(null);
        localStorage.removeItem("astroChatUser");
        navigate("/");
        toast.success("Has cerrado sesión correctamente.");
      } else {
        toast.error("Error al intentar cerrar sesión! Intentelo nuevamente.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Error al intentar cerrar sesión! Intentelo nuevamente.");
    }
  };

  const googleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse) {
        toast.error(
          "El inicio de sesión con Google falló. Credenciales no recibidas."
        );
        return;
      }

      const response = await AuthApi.post("/api/auth/google", {
        idToken: credentialResponse,
      });

      const { type } = response.data;

      if (response.status === 200 || response.status === 201) {
        //Almacena los datos de usuario directamente desde response.data
        setUser(response.data);
        localStorage.setItem("astroChatUser", JSON.stringify(response.data));

        toast.success("¡Bienvenido!");

        //Navegar dependiendo del tipo de usuario
        if (type === "mortal") {
          navigate("/home");
        } else if (type === "admin") {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Google login failed. Please try again.", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const PrivateRoute = ({
  allowedRoles,
  redirectTo = "/",
  roleRedirects = {},
}) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.type)) {
    const fallbackRedirect = roleRedirects[user.type] || redirectTo;
    return <Navigate to={fallbackRedirect} />;
  }

  return <Outlet />;
};
