import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = () => {

    //const navigate = useNavigate();
    //logout handling za prikazivanje log in/ log out
    const user = false;
    return (
        

        <>
            <div className="hContainer">
                <div className="imgContainer">
                    <Link to={'/'}>
                        <img src="" alt="logo" />
                    </Link>
                </div>

                <nav className="navBtns">
                    
                    <Link to={'/'}>Home</Link>
                    <Link to={'/profile'}>Profile</Link>
                    
                    {user ? (<Link to="/profile" className="navLink">
                        Logged in
                    </Link>) : <Link to={'/login'}>Log in</Link>}
                    
                    
                    <Link to={'/register'}>Register</Link>
                       
                </nav>

                <div className="pImg">
                    <Link to={'/profile'}>
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F005%2F544%2F718%2Fnon_2x%2Fprofile-icon-design-free-vector.jpg&f=1&nofb=1&ipt=2cc7a01e14585b30c2c8489d3a1394c9c66a9c733e1effaa3b142e5c92e331cc&ipo=images" 
                        alt="profile image" />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;
