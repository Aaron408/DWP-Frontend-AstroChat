import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import SignUp from "../pages/Register/Register";
import PasswordRecovery from "../pages/Login/PasswordRecovery";

import VerificationCode from "../pages/Register/VerificationCode";

import { AuthContext, PrivateRoute } from "../components/AuthContext";

const Navigation = () => {
  const { user } = useContext(AuthContext);

  const roleRedirects = {
    "admin": "/dashboard",
    "mortal": "/home",
  };

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={user ? <Navigate to={roleRedirects[user.type] || "/"} /> : <Login />} />
      <Route path="/login" element={user ? <Navigate to={roleRedirects[user.type] || "/"} /> : <Login />} />
      <Route path="/recover-password" element={user ? <Navigate to={roleRedirects[user.type] || "/"} /> : <PasswordRecovery />} />
      <Route path="/register" element={user ? <Navigate to={roleRedirects[user.type] || "/"} /> : <SignUp />} />
      <Route path="/verification" element={<VerificationCode />} />
      <Route element={<PrivateRoute allowedRoles={["mortal"]} roleRedirects={roleRedirects} />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
