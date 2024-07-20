import React from "react";
import "../styles/loginStyle.css";
import Link from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="inputContainer">
          <input
            type="email"
            className="inputField"
            placeholder="email adresa"
            required
          />
          <input
            type="password"
            className="inputField"
            placeholder="lozinka"
            required
          />

          <button type="button" className="button">
            Prijavi se
          </button>
          <span className="otherformlink">
            <Link to="/register" className="linktoreg">
              Nemate nalog? <b>Registrujte se ovdje</b>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
