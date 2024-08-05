import React from "react";
import "../styles/loginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserCont";
import { useState, useContext } from "react";
import ErrorMsg from "../assets/ErrorMsg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const url = "http://localhost:8000/users/";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    };
    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        console.log("Uspješna registracija");
        navigate("/login");
      } else {
        setError("Neuspješna registracija");
      }
    } catch (error) {
      setError("Neuspješna registracija");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confPass) {
      setError("Lozinke se ne poklapaju");
      console.log("Lozinke se ne poklapaju");
      return;
    } else {
      handleRegister();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-inputContainer">
        <h2>Registracija</h2>
        <input
          className="auth-inputField"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          className="auth-inputField"
          placeholder="E-mail adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth-inputField"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth-inputField"
          placeholder="Ponovite lozinku"
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
          required
        />
        {error && <ErrorMsg message={error} />}
        <button type="button" className="auth-button" onClick={handleSubmit}>
          Registruj se
        </button>
        <span className="auth-otherformlink">
          <Link to="/login" className="auth-linktoreg">
            Već imate nalog? <b>Prijavite se ovdje</b>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
