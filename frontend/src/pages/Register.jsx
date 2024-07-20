import React from "react";
import "../styles/loginStyle.css";
import { Link } from "react-router-dom";

const Register = () => {
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
          <input className="inputField" placeholder="korisničko ime" required />
          <input
            type="password"
            className="inputField"
            placeholder="lozinka"
            required
          />

          <button type="button" className="button">
            Registruj se
          </button>
          <span className="otherformlink">
            <Link to="/register" className="linktoreg">
              Već imate nalog? <b>Prijavite se ovdje</b>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
