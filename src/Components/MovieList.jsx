import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    const url = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"; 
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E"

    try {
      const res = await axios.get(url, {
        headers: {
          TokenCybersoft: token,
          "Content-Type": "application/json",
        },
      });

      setMovies(res.data.content || []); // Lấy danh sách phim từ API.
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setError("Không thể tải danh sách phim. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <p>Đang tải danh sách phim...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list">
      <h2 className="movie-list_title">Danh sách phim</h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.maPhim} className="col-md-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
