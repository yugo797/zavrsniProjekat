import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {UserContext} from "../context/UserCont";
//import jwt_decode from "jwt-decode";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const { userId } = useContext(UserContext);

  useEffect(() => {

    const decodeToken = async (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    };

    const token = localStorage.getItem("access_token");
    console.log("ACC TKN: ", token);

    //let decodedToken;
    //let userIDfromToken;

    const decodeTokenAndGetUser = async () => {
      try {
          const decodedToken = await decodeToken(token);
          const userEmailFromToken = decodedToken.sub;
  
          console.log("Decoded Token: ", decodedToken);
          console.log("User email from Token: ", userEmailFromToken);

          const userdt = await getUser(userEmailFromToken);
          if (userdt && userdt.id){
            await getWishlist(userdt.id);
          } else throw new Error("User object or id undefined");
        } catch(err){
          console.error("Failed to decode token: ", err);
          setError("Failed to decode token");
        };
    }
    const getUser = async (userEmailToken) => {
      try {
        const response = await fetch(`http://localhost:8000/users/email/?user_email=${userEmailToken}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setLoading(false);
          console.log("User Data: ", data);
          return data;
        } else {
          setError("Failed to fetch user");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch user");
        setLoading(false);
      }
    };

    const getWishlist = async (useridtoken) => {
      try {
        if (!token) {
          throw new Error("No token found");
        }
        const response = await fetch(`http://localhost:8000/wishlist/${useridtoken}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Wishlist Response Status: ", response.status);

        if (response.ok) {
          const data = await response.json();
          setWishlist(data.movie_ids);
          console.log("Wishlist Data: ", data); 
          console.log("Mv ids: ", data.movie_ids); 
          setLoading(false);
        } else {
          const errorData = await response.json();
          console.error("Wishlist Fetch Error: ", errorData);
          setError(
            `Failed to fetch wishlist: ${
              errorData.detail || response.statusText
            }`
          );
          setLoading(false);
        }
      } catch (err) {
        console.error("Wishlist Fetch Exception: ", err);

        setError("Failed to fetch wishlist 2222");
        setLoading(false);
      }
    };

    decodeTokenAndGetUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="profileContainer">
        <div className="profile">
          <h2 className="naslov">Dobro došli, {user.name}</h2>
          {/*<p>{user.email}</p>*/}
        </div>

        <div className="wishlist">
          <h3>Filmovi koje želite da gledate:
          </h3>
          <ul>
            {wishlist.length === 0 ? (
              <>
                <li>Vaša lista je prazna.</li>
              </>
            ) : (
              wishlist.map((movie) => <li key={movie}>{movie}</li>)
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
