import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const { userId } = useParams();
  useEffect(() => {
    const oldToken = localStorage.getItem("accesstoken");
    if (oldToken) {
      localStorage.setItem("access_token", oldToken);
      localStorage.removeItem("accesstoken");
    }
    const token = localStorage.getItem("access_token");
    console.log("ACC TKN: ", token);
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setLoading(false);
        } else {
          setError("Failed to fetch user");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch user");
        setLoading(false);
      }
    };

    const getWishlist = async () => {
      try {
        if (!token) {
          throw new Error("No token found");
        }
        const response = await fetch("http://localhost:8000/wishlist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Wishlist Response Status: ", response.status);

        if (response.ok) {
          const data = await response.json();
          setWishlist(data);
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

    getUser();
    getWishlist();
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
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <br />
        <br />
        <div className="wishlist">
          <h3>Movie Wishlist</h3>
          <ul>
            {wishlist.length === 0 ? (
              <>
                <li>empu...</li>
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
