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
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        const response = await fetch("http://localhost:8000/wishlist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setWishlist(data.movie_ids);
          setLoading(false);
        } else {
          setError("Failed to fetch wishlist 1111"); //ulazi
          setLoading(false);
        }
      } catch (err) {
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
        </div>
      </div>
    </>
  );
};

export default Profile;
