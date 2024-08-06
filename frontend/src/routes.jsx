import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import LogoutBtn from "./pages/LogoutBtn";
import Layout from "./Layout";
import About from "./pages/About";
export const routes = (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="logout" element={<LogoutBtn />} />
      <Route path="profile/:userId" element={<Profile />} />
      <Route path="about" element={<About />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);
