import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const navigate = useNavigate();



  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default LogoutBtn;
