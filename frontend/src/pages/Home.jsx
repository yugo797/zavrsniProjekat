import React, { useState, useEffect } from "react";
import Header from "../assets/Header";
import "../styles/home.css";

const Home = () => {
  const [view, setView] = useState("topRated");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8000/movies/");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [view]);

  const renderMovies = () => {
    const filteredMovies = movies.filter((movie) => {
      switch (view) {
        case "topRated":
          return movie.rating >= 2;
        case "currentlyShowing":
          return new Date(movie.release_date) <= new Date(); // provjeri je li ovako za datume
        case "upcoming":
          return new Date(movie.release_date) > new Date();
        default:
          return false;
      }
    });

    return (
      <div className="movies-list">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p className="description">{movie.description}</p>
            <p>Duration: {movie.duration} mins</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.rating}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="homepage-container">
        <h1>Welcome to Cinema</h1>
        <div className="button-container">
          <button onClick={() => setView("topRated")}>Top Rated Movies</button>
          <button onClick={() => setView("currentlyShowing")}>
            Currently Showing
          </button>
          <button onClick={() => setView("upcoming")}>Upcoming Movies</button>
        </div>
        <div className="movies-container">
          <div className="movies-list">{renderMovies()}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
