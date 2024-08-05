import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { UserContext } from "../context/UserCont";
const Header = () => {
  //const navigate = useNavigate();
  //logout handling za prikazivanje log in/ log out
  const { user, userId} = useContext(UserContext);

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
          {userId? (
          <Link to={`/profile/${userId}`} className="navLink">
            {user.name}
          </Link>

          ):(
            <Link to={"/login"} className="navLink">
              Log in
            </Link>

          )}
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
