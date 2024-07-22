import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import LogoutBtn from "./pages/LogoutBtn";
export const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={<LogoutBtn />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);
