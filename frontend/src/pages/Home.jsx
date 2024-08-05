import React, { useState, useEffect } from "react";
import Header from "../assets/Header";
import "../styles/home.css";

const Home = () => {
  const [view, setView] = useState("all");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

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
          return new Date(movie.release_date) <= new Date(); // provjeri je li ovako za datume
        case "upcoming":
          return new Date(movie.release_date) > new Date();
        default:
          return true;
      }
    });

    /*return (
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
    );*/
    setFilteredMovies(filtered);
  };

  return (
    <>
      <div className="homeContainer">
        <h1>Dobrodosli</h1>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  
};

export default Home;
