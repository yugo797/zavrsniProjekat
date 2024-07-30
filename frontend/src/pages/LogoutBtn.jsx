import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default LogoutBtn;
