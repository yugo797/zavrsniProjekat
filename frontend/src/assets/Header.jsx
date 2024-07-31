import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/header.css";
const Header = () => {
  //const navigate = useNavigate();
  //logout handling za prikazivanje log in/ log out
  const user = false;
  return (
    <>
      <div className="hContainer">
        <div className="imgContainer">
          <Link to={"/"} className="logoLink">
            <img src="" alt="logo" className="logoImg" />
          </Link>
        </div>

        <nav className="navBtns">
          <Link to={"/"} className="navLink">
            Home
          </Link>
          <Link to={"/profile"} className="navLink">
            Profile
          </Link>

          {user ? (
            <Link to="/profile" className="navLink">
              Logged in
            </Link>
          ) : (
            <Link to={"/login"} className="navLink">
              Log in
            </Link>
          )}

          <Link to={"/register"} className="navLink">
            Register
          </Link>
        </nav>

        <div className="pImg">
          <Link to={"/profile"} className="pImgLink">
            <img src="" alt="profile image" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
