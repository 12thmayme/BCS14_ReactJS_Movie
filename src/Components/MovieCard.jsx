import React from "react";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handlePlayClick = () => {
    setShowTrailer(true);
  };

  const handleCloseModal = () => {
    setShowTrailer(false);
  };

  return (
    <>
      <div className="movie-card">
        <div className="movie-card__image-container">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="movie-card__image"
          />
          <div
            className="movie-card__play-icon"
            onClick={handlePlayClick}
          >
            <i className="fa fa-play"></i>
          </div>
        </div>

        <div className="movie-card__info">
          <h3 className="movie-card__title">{movie.tenPhim}</h3>
          <p className="movie-card__rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <i
                key={index}
                className={`fa fa-star ${
                  index < Math.round(movie.danhGia / 2)
                    ? "star--active"
                    : "star--inactive"
                }`}
              ></i>
            ))}
          </p>
          <button className="movie-card__button">Get Ticket</button>
        </div>
      </div>

      {/* Modal for Trailer */}
      {showTrailer && (
  <div className="movie-card__modal">
    <div className="movie-card__modal-content">
      <button
        className="movie-card__modal-close"
        onClick={handleCloseModal}
      >
        &times;
      </button>
      <iframe
        src={`https://www.youtube.com/embed/${movie.trailer.split("v=")[1]}`}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}
    </>
  );
};

export default MovieCard;

