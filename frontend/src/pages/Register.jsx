import React from "react";
import "../styles/loginStyle.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserCont";
import { useState, useContext } from "react";
import ErrorMsg from "../assets/ErrorMsg";




const Register = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const { setToken } = useContext(UserContext);
  const [error, setError] = useState('');
  
  const handleRegister = async () => {
    const url = 'http://localhost:8000/users/';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        email:  email,
        password: password,
      }),
    };
    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        console.log('Uspješna registracija');
      } else {
        setError('Neuspješna registracija');
      }
    } catch (error) {
      setError('Neuspješna registracija');
    }
  
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confPass) {
      setError('Lozinke se ne poklapaju');
      console.log('Lozinke se ne poklapaju');
      return;
    } else {
      handleRegister();
    }
  }
  return (
    <>
      <div className="container">
        <div className="inputContainer">
          { /* Register form */}
          <input className="inputField" 
          placeholder="korisničko ime" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required 
          />
          <input
            type="email"
            className="inputField"
            placeholder="email adresa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="inputField"
            placeholder="lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="inputField"
            placeholder="ponovite lozinku"
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            required
          />
          {error && <ErrorMsg message={error} />}

          { /* Register button */}
          <button type="button" className="button" onClick={handleSubmit}>
            Registruj se
          </button>
          { /*end of form */}

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
