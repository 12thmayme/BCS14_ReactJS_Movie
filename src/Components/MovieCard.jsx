import React from "react";
import '../Sass/components/_MovieCard.scss'; // Đảm bảo bạn đã import file SCSS vào component

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img 
        src={movie.hinhAnh} 
        alt={movie.tenPhim} 
        className="movie-card_img" 
      />
      <div className="movie-card_body">
        <h5 className="movie-card_title">{movie.tenPhim}</h5>
        <button
          className="btn btn-primary"
          onClick={() => alert(`Mã phim: ${movie.maPhim}`)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

