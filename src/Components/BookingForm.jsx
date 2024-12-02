// src/components/BookingForm/BookingForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingForm = ({ movieId }) => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState("");

  const token =
    "eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ";

  // Fetch cinemas from API
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
          {
            headers: {

              TokenCybersoft: token, // Add the token here
            },
          }
        );
        setCinemas(response.data.content);
      } catch (err) {
        console.error("Error fetching cinemas:", err);
        setError("Unable to fetch cinemas. Please try again later.");
      }
    };

    fetchCinemas();
  }, []);

  // Fetch schedules when a cinema is selected
  useEffect(() => {
    const fetchSchedules = async () => {
      if (!selectedCinema) return;

      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachLichChieuPhim?MaPhim=${movieId}&MaHeThongRap=${selectedCinema.maHeThongRap}`,
          {
            headers: {
              TokenCybersoft: token, // Add the token here
            },
          }
        );
        setSchedules(response.data.content);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Unable to fetch schedules. Please try again later.");
      }
    };

    fetchSchedules();
  }, [selectedCinema, movieId]);

  const handleCinemaClick = (cinema) => {
    setSelectedCinema(cinema);
    setSchedules([]); // Reset schedules when a new cinema is selected
  };

  return (
    <div className="booking-form-container">
      <h3>Chọn Rạp Chiếu</h3>
      {error && <div className="booking-form__error">{error}</div>}

      {/* Cinema Logos */}
      <div className="cinema-logos">
        {cinemas.map((cinema) => (
          <div
            key={cinema.maHeThongRap}
            className={`cinema-logo ${
              selectedCinema && selectedCinema.maHeThongRap === cinema.maHeThongRap
                ? "active"
                : ""
            }`}
            onClick={() => handleCinemaClick(cinema)}
          >
            <img src={cinema.logo} alt={cinema.tenHeThongRap} />
          </div>
        ))}
      </div>

      {/* Schedules */}
      {selectedCinema && (
        <div className="schedules">
          <h4>Lịch Chiếu tại {selectedCinema.tenHeThongRap}</h4>
          {schedules.length > 0 ? (
            <ul className="schedule-list">
              {schedules.map((schedule) => (
                <li key={schedule.maLichChieu} className="schedule-item">
                  <span>{new Date(schedule.ngayChieuGioChieu).toLocaleString()}</span>
                  <button className="btn-book">Đặt Vé</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có lịch chiếu cho rạp này.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
