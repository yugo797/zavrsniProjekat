import React from "react";
import "../styles/loginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "../assets/ErrorMsg";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserCont";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setToken, setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //username: username,
        email: email,
        password: password,
        name: username,
        //is_admin: false,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/users/token",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        console.log("Uspješna prijava");
        console.log("Token after login: ", localStorage.getItem("access_token"));

        const userResponse = await fetch(
          `http://localhost:8000/users/email/?user_email=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);

          navigate(`/`); //profile/${userData.id}
        } else {
          console.error("Failed to fetch user details");
        }
      } else {
        setError("Neuspješna prijava");
        console.log("Neuspješna prijava");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-inputContainer">
        <h2>Prijavljivanje</h2>
        <input
          type="email"
          className="auth-inputField"
          placeholder="E-mail adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="auth-inputField"
          placeholder="Korisnicko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="button" className="auth-button" onClick={handleClick}>
          Prijavi se
        </button>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <span className="auth-otherformlink">
          <Link to="/register" className="auth-linktoreg">
            Nemate nalog? <b>Registrujte se ovdje</b>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
