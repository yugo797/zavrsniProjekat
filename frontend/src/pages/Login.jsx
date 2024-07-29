import React from "react";
import "../styles/loginStyle.css";
import { Link } from "react-router-dom";
import ErrorMsg from "../assets/ErrorMsg";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserCont";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: "1234",
        is_admin: false,
      }),
    };

    const response = await fetch(
      "http://localhost:8000/users/token",
      requestOptions
    );
    const data = await response.json();

    if (response.ok) {
      setToken(data.access_token);
      console.log("Uspješna prijava");
    } else {
      setError("Neuspješna prijava");
      console.log("Neuspješna prijava");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <div className="container">
        <div className="inputContainer">
          <input
            type="email"
            className="inputField"
            placeholder="email adresa"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="inputField"
            placeholder="lozinka"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="button" className="button" onClick={handleClick}>
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
