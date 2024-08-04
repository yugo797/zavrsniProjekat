import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { UserContext } from "../context/UserCont";

const Header = () => {
  //const navigate = useNavigate();
  //logout handling za prikazivanje log in/ log out
  const { user } = useContext(UserContext);

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
            Početna stranica
          </Link>
          <Link to={"/profile"} className="navLink">
            Profil
          </Link>

          {user ? (
            <Link to={`/profile/${user.id}`} className="navLink">
              Prijavljeni ste kao {user.username}
            </Link>
          ) : (
            <Link to={"/login"} className="navLink">
              Prijavi se
            </Link>
          )}
        </nav>

        <div className="pImg">
          {user ? (
            <Link to={`/profile/${user.id}`} className="pImgLink">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                alt="profile image"
              />
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
