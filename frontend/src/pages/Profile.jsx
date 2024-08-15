import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserCont";
//import jwt_decode from "jwt-decode";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const [movies, setMovies] = useState([]);

  const { userId } = useContext(UserContext);

  useEffect(() => {
    const decodeToken = async (token) => {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    };

    const token = localStorage.getItem("access_token");
    console.log("ACC TKN: ", token);

    const decodeTokenAndGetUser = async () => {
      try {
        const decodedToken = await decodeToken(token);
        const userEmailFromToken = decodedToken.sub;

        console.log("Decoded Token: ", decodedToken);
        console.log("User email from Token: ", userEmailFromToken);

        const userdt = await getUser(userEmailFromToken);
        if (userdt && userdt.id) {
          await fetchWishlist(userdt.id);
        } else throw new Error("User object or id undefined");
      } catch (err) {
        console.error("Failed to decode token: ", err);
        setError("Failed to decode token");
      }
    };
    const getUser = async (userEmailToken) => {
      try {
        const response = await fetch(
          `http://localhost:8000/users/email/?user_email=${userEmailToken}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

    const fetchWishlist = async (userdt) => {
      try {
        const resp = await fetch(
          `http://localhost:8000/wishlist/?user_id=${userdt}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (resp.ok) {
          const data = await resp.json();
          console.log("Wishlist data after respok: ", data);
          const movies = data[0].movies;
          setWishlist(movies);
          console.log("Wishlist moviess: ", movies);
          console.log("Wishlist: ", wishlist);

          fetchMovies(movies);

          setLoading(false);
        } else {
          const errData = await resp.json();
          console.error("Failed to fetch wishlist: ", errData);
          setError(`Failed to fetch wishlist: ${errData}`);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch wishlist: ", err);
        setError("Failed to fetch wishlist");
        setLoading(false);
      }
    };

    const fetchMovies = async (movieIds) => {
      try {
        const movieDetails = await Promise.all(
          movieIds.map(async (movie) => {
            const resp = await fetch(
              `http://localhost:8000/movies/${movie.id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (resp.ok) {
              const data = await resp.json();
              return data;
            } else {
              console.error("Failed to fetch movie details: ", resp);
              return null;
            }
          })
        );
        setMovies(movieDetails.filter((movieExists) => movieExists !== null));
      } catch (err) {
        console.error("Failed to fetch movie details: ", err);
        setError("Failed to fetch movie details");
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
          <h3>Filmovi koje želite da gledate:</h3>
          <ul>
            {!wishlist ? (
              <>
                <li>Vaša lista je prazna.</li>
              </>
            ) : (
              movies.map((movie) => (
                <li key={movie.id}>
                  <h2>{movie.title}</h2>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
