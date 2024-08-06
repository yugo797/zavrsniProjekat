import React, { useState, useEffect, useContext } from "react";
import Header from "../assets/Header";
import "../styles/home.css";
import { UserContext } from "../context/UserCont";

const Home = () => {
  const [view, setView] = useState("all");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { userId, token1 } = useContext(UserContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8000/movies/");
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [view]);

  useEffect(() => {
    filterMovies();
  }, [view, movies]);

  const filterMovies = () => {
    const filtered = movies.filter((movie) => {
      switch (view) {
        case "topRated":
          return movie.rating >= 2;
        case "currentlyShowing":
          return new Date(movie.release_date) <= new Date();
        case "upcoming":
          return new Date(movie.release_date) > new Date();
        default:
          return true;
      }
    });

    setFilteredMovies(filtered);
  };

  const addToWishlist = async (movieId) => {
    const token = localStorage.getItem("access_token");
    try {
      const resp = await fetch(`http://localhost:8000/wishlist/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const wishlist = await resp.json();
      let wishlistId = null;
      if (wishlist.length > 0) {
        wishlistId = wishlist[0].id;

        const movieExists = wishlist[0].movie_ids.includes(movieId);
        if (movieExists) {
          console.log(`Movie ${movieId} already in wishlist`);
          return;
        }
      }

      if (!wishlistId) {
        console.log(`Creating new wishlist for user ${userId}`);
        const createResp = await fetch(`http://localhost:8000/wishlist/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            movie_ids: [movieId],
          }),
        });
        if (createResp.ok) {
          const newWL = await createResp.json();
          wishlistId = newWL.id;
          console.log(`new wishlist ${wishlistId}`);
        } else {
          console.error("Failed to add movie to wishlist");
          return;
        }
      } else {
        const updateResp = await fetch(`http://localhost:8000/wishlist/${wishlistId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movie_ids: [...wishlist[0].movie_ids, movieId],
          }),
        });
        if (updateResp.ok) {
          console.log(`Movie ${movieId} added to wishlist ${wishlistId}`);
        } else {
          console.error("Failed to add movie to wishlist");
        }
      }
    } catch (error) {
      console.error("Error adding movie to wishlist: ", error);
    }
  };

  return (
    <>
      <div className="homeContainer">
        <h1>Dobro došli u Cinema123</h1>
        <div className="button-container">
          <button onClick={() => setView("all")}>Svi filmovi</button>
          <button onClick={() => setView("topRated")}>Najbolje ocjenjeni</button>
          <button onClick={() => setView("currentlyShowing")}>Trenutno u bioskopu</button>
          <button onClick={() => setView("upcoming")}>Uskoro</button>
        </div>
        <div className="movies-container">
          <div className="movies-list">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <img src={movie.image} alt={movie.title} />
                <p className="description">{movie.description}</p>
                <p>Duration: {movie.duration} mins</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.rating}</p>
                   {
                    userId ? (
                      <button onClick={() => addToWishlist(movie.id)}>Dodaj u watchlist</button>
                    ):(
                      <span></span>
                    )
                   }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;