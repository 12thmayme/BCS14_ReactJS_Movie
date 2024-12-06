import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { token } from "../constants/token";

const SearchBar = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get query from the URL
  const searchQuery = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
          {
            headers: {
              TokenCybersoft: token,
              "Content-Type": "application/json",
            },
          }
        );
        setAllMovies(response.data.content || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on query
  useEffect(() => {
    if (searchQuery) {
      const results = allMovies.filter((movie) =>
        movie.tenPhim.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(results);
    } else {
      setFilteredMovies([]);
    }
  }, [searchQuery, allMovies]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    navigate(`?q=${query}`); // Update the URL with the search query
  };

  const handleMovieClick = (id) => {
    navigate(`/movie-detail/${id}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button>
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
      {searchQuery && filteredMovies.length > 0 && (
        <ul className="search-results">
          {filteredMovies.map((movie) => (
            <li key={movie.maPhim} onClick={() => handleMovieClick(movie.maPhim)}>
              {movie.tenPhim}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
