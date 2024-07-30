import React from "react";
import "../styles/loginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "../assets/ErrorMsg";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserCont";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        email: email,
        password: password,
        is_admin: false,
        name: "user",
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
          navigate(`/profile/${userData.id}`);
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
          {error && <ErrorMsg>{error}</ErrorMsg>}
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
