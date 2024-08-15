import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { UserContext } from "../context/UserCont";
const Header = () => {
  //const navigate = useNavigate();
  //logout handling za prikazivanje log in/ log out
  const { user, userId } = useContext(UserContext);

  const isAdmin = user && user.is_admin;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <div className="hContainer">
        <div className="imgContainer">
          <Link to={"/"} className="logoLink">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.viennale.at%2Fassets%2Fstyles%2Fis_editor_full%2Fpublic%2F2021-10%2FCineplexx_Schriftzug%252BPlaneten_rot.png%3Fitok%3DqeTUa4qE&f=1&nofb=1&ipt=a22b4b0bbf7882dc24f7750148e79fe2935861a857b923d1640e8105018a6657&ipo=images"
              alt="logo"
              className="logoImg"
            />
          </Link>
        </div>

        <nav className="navBtns">
          <Link to={"/"} className="navLink">
            Početna stranica
          </Link>
          <Link to={"/timetable"} className="navLink">
            Raspored prikazivanja
          </Link>
          {userId ? (
            <Link to={`/profile/${userId}`} className="navLink">
              {user.name}
            </Link>
          ) : (
            <Link to={"/login"} className="navLink">
              Log in
            </Link>
          )}
          {isAdmin ? (
            <Link to={"/admin"} className="navLink">
              Admin
            </Link>
          ) : (
            <></>
          )}
          <Link to={"/about"} className="navLink">
            O nama
          </Link>
        </nav>
        {userId ? (
          <Link to={"/login"} className="navLink" onClick={handleLogout}>
            Odjavi se
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Header;
