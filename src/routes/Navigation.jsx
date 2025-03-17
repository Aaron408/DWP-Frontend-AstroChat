import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

const Navigation = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Navigation;
