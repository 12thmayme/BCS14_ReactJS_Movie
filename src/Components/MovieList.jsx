import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { token } from "../constants/token";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndexNowShowing, setCurrentIndexNowShowing] = useState(0);
  const [currentIndexComingSoon, setCurrentIndexComingSoon] = useState(0);
  const itemsPerPage = 5; // Số lượng phim hiển thị mỗi lần

  const fetchMovies = async () => {
    const url =
      "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01";


    try {
      const res = await axios.get(url, {
        headers: {
          TokenCybersoft: token,
          "Content-Type": "application/json",
        },
      });

      setMovies(res.data.content || []);
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

  const moviesNowShowing = movies.filter((movie) => movie.dangChieu);
  const moviesComingSoon = movies.filter((movie) => movie.sapChieu);

  const handlePrev = (setIndex, currentIndex, totalItems) => {
    setIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = (setIndex, currentIndex, totalItems) => {
    setIndex((prev) => (prev + 1) % totalItems);
  };

  const getVisibleMovies = (movies, currentIndex) => {
    const totalMovies = movies.length;
    const visibleMovies = [];

    for (let i = 0; i < itemsPerPage; i++) {
      const movieIndex = (currentIndex + i) % totalMovies;
      visibleMovies.push(movies[movieIndex]);
    }

    return visibleMovies;
  };

  if (loading) return <p>Đang tải danh sách phim...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list">
  {/* Background Overlay */}
  <div className="movie-list__background-overlay"></div>

  {/* Movies Now Playing Section */}
  <section className="movie-section">
    <div className="movie-section__header">
      <h3 className="movie-section__subtitle">Watch New Movies</h3>
       <i classname="flaticon flaticon-film-roll"></i>
      <h2 className="movie-section__title">Movies Now Playing</h2>
    </div>
    <div className="carousel">
      <button
        className="carousel__button carousel__button--prev"
        onClick={() =>
          handlePrev(
            setCurrentIndexNowShowing,
            currentIndexNowShowing,
            moviesNowShowing.length
          )
        }
      >
        &#10094;
      </button>
      <div className="carousel__wrapper">
        {getVisibleMovies(moviesNowShowing, currentIndexNowShowing).map(
          (movie) => (
            <div key={movie.maPhim} className="carousel__item">
              <MovieCard movie={movie} />
            </div>
          )
        )}
      </div>
      <button
        className="carousel__button carousel__button--next"
        onClick={() =>
          handleNext(
            setCurrentIndexNowShowing,
            currentIndexNowShowing,
            moviesNowShowing.length
          )
        }
      >
        &#10095;
      </button>
    </div>
  </section>

  {/* Coming Soon Section */}
  <section className="movie-section">
    <div className="movie-section__header">
      <h3 className="movie-section__subtitle">Coming Soon</h3>
      <h2 className="movie-section__title">Don't Miss These Movies!</h2>
    </div>
    <div className="carousel">
      <button
        className="carousel__button carousel__button--prev"
        onClick={() =>
          handlePrev(
            setCurrentIndexComingSoon,
            currentIndexComingSoon,
            moviesComingSoon.length
          )
        }
      >
        &#10094;
      </button>
      <div className="carousel__wrapper">
        {getVisibleMovies(moviesComingSoon, currentIndexComingSoon).map(
          (movie) => (
            <div key={movie.maPhim} className="carousel__item">
              <MovieCard movie={movie} />
            </div>
          )
        )}
      </div>
      <button
        className="carousel__button carousel__button--next"
        onClick={() =>
          handleNext(
            setCurrentIndexComingSoon,
            currentIndexComingSoon,
            moviesComingSoon.length
          )
        }
      >
        &#10095;
      </button>
    </div>
  </section>
</div>

  );
};

export default MovieList;
