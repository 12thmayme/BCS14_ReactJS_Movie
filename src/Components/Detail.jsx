import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null); // Add error state
  const param = useParams();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";

const getMovieByID = async () => {
  try {
    const url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${param.id}`;
    console.log("Request URL:", url); // Debug: Log the full URL

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        TokenCybersoft: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Status:", response.status);
      console.error("Error Data:", errorData);
      setError(`Error: ${response.status} - ${errorData}`);
      return;
    }

    const data = await response.json();
    console.log("API Response:", data);
    setMovie(data.content);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    setError("An error occurred while fetching the movie details.");
  }
};


useEffect(() => {
  getMovieByID();
}, [param.id]);

if (error) {
  return <p>{error}</p>;
}

if (!movie) {
  return <p>Loading movie details...</p>;
}


  return (
    <div className="movie-detail-container">
       <div className="movie-detail__main">
       <div className="movie-detail__poster">
          <img src={movie.hinhAnh} alt={movie.tenPhim} />
        </div>
       </div>
       {/* Right Section: Info */}
       <div className="movie-detail__info">
       <h2 className="movie-detail__title">{movie.tenPhim}</h2>
          <p className="movie-detail__description">{movie.moTa}</p>
          <p>Rating: {movie.danhGia}/10</p>
       </div>
       {/* Trailer Section */}
      <div className="movie-detail__trailer">
        <h3 className="trailer-title">Trailer</h3>
      {movie.trailer ? (
        <iframe
          width="100%"
          height="315"
          src={movie.trailer.replace("watch?v=", "embed/")}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available.</p>
      )}
      </div>
    </div>
  );
};

export default Detail;
