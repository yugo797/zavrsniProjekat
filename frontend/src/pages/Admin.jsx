import React, { useState, useEffect } from "react";
import "../styles/admin.css";
import { UserContext } from "../context/UserCont";
import { useContext } from "react";

const Admin = () => {
  const [view, setView] = useState("home");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [form, setForm] = useState({
    title: "",
    description: "",
    release_date: "",
    duration: "",
    rating: 0,
    image: "",
    video: "",
    categories: "",
  });
  const [editingMovieId, setEditingMovieId] = useState(null);

  useEffect(() => {
    if (view === "movies") {
      fetch("http://localhost:8000/movies/")
        .then((response) => response.json())
        .then((data) => setData(data));
    } else if (view === "users") {
      const searchBy = prompt("Search by id or email?");
      setSearchBy(searchBy === "id" ? "id" : "email");
      setData([]);
    }
  }, [view]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    if (view === "movies") {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (view === "users") {
      if (searchBy === "id") {
        return item.id.toString().includes(searchTerm);
      } else if (searchBy === "email") {
        return item.email.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return false;
      }
    }
    return false;
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = () => {
    const method = editingMovieId ? "PUT" : "POST";
    const url = editingMovieId
      ? `http://localhost:8000/movies/${editingMovieId}`
      : `http://localhost:8000/movies/`;

    // Convert categories from a comma-separated string to an array
    const categoriesArray = form.categories
      .split(",")
      .map((category) => category.trim());

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        release_date: form.release_date,
        duration: form.duration,
        rating: form.rating,
        image: form.image,
        video: form.video,
        categories: categoriesArray, // Set the formatted categories array
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save the movie.");
        }
        return response.json();
      })
      .then((newMovie) => {
        if (editingMovieId) {
          setData((prevData) =>
            prevData.map((movie) =>
              movie.id === editingMovieId ? newMovie : movie
            )
          );
          setEditingMovieId(null);
        } else {
          setData((prevData) => [...prevData, newMovie]);
        }
        // Reset form after creation or update
        setForm({
          title: "",
          description: "",
          release_date: "",
          duration: "",
          rating: 0,
          image: "",
          video: "",
          categories: "",
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEdit = (movie) => {
    setForm({
      title: movie.title,
      description: movie.description,
      release_date: movie.release_date,
      duration: movie.duration,
      rating: movie.rating,
      image: movie.image,
      video: movie.video,
      categories: movie.categories.join(", "), // Convert categories array to a comma-separated string
    });
    setEditingMovieId(movie.id);
  };

  const handleDelete = (movieId) => {
    fetch(`http://localhost:8000/movies/${movieId}`, {
      method: "DELETE",
    })
      .then(() => {
        setData((prevData) => prevData.filter((movie) => movie.id !== movieId));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="admin-page">
      {view === "home" && (
        <h1 className="admin-title">Administrativna stranica</h1>
      )}
      {view === "home" && (
        <div className="admin-buttons">
          <button className="admin-button" onClick={() => setView("movies")}>
            Movies
          </button>
          <button className="admin-button" onClick={() => setView("users")}>
            Users
          </button>
        </div>
      )}
      {view !== "home" && (
        <div className="admin-content">
          <button className="admin-button" onClick={() => setView("home")}>
            Prikazi sve
          </button>
          <input
            className="admin-search"
            type="text"
            placeholder={`Search ${view}`}
            value={searchTerm}
            onChange={handleSearch}
          />
          {view === "movies" && (
            <div className="admin-movie-form">
              <h2 className="admin-form-title">
                {editingMovieId ? "Edit Movie" : "Add New Movie"}
              </h2>
              <form>
                <input
                  className="admin-input"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleFormChange}
                />
                <input
                  className="admin-input"
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleFormChange}
                />
                <input
                  className="admin-input"
                  type="date"
                  name="release_date"
                  placeholder="Release Date"
                  value={form.release_date}
                  onChange={handleFormChange}
                />
                <input
                  className="admin-input"
                  type="number"
                  name="duration"
                  placeholder="Duration"
                  value={form.duration}
                  onChange={handleFormChange}
                />
                <input
                  className="admin-input"
                  type="number"
                  name="rating"
                  placeholder="Rating"
                  value={form.rating}
                  onChange={handleFormChange}
                />
                <input
                  className="admin-input"
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={handleFormChange}
                />
                <input
                  className="admin-input"
                  type="text"
                  name="video"
                  placeholder="Video URL"
                  value={form.video}
                  onChange={handleFormChange}
                />
                <input
                  className="admin-input"
                  type="text"
                  name="categories"
                  placeholder="Categories (comma-separated)"
                  value={form.categories}
                  onChange={handleFormChange}
                />
                <button
                  className="admin-submit-button"
                  type="button"
                  onClick={handleCreateOrUpdate}
                >
                  {editingMovieId ? "Update Movie" : "Add Movie"}
                </button>
              </form>
            </div>
          )}
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      className="admin-action-button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-action-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
