import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingForm = ({ movieId }) => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
          {
            headers: {
              TokenCybersoft: token,
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

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!selectedCinema) return;

      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachLichChieuPhim?MaPhim=${movieId}&MaHeThongRap=${selectedCinema.maHeThongRap}`,
          {
            headers: {
              TokenCybersoft: token,
            },
          }
        );
        setSchedules(response.data.content || []);
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
      <h3 className="booking-form__title">Chọn Rạp Chiếu</h3>
      {error && <div className="booking-form__error">{error}</div>}

      <div className="booking-form__content">
        {/* Cinema Logos (Left) */}
        <div className="cinema-logos">
          {cinemas.map((cinema) => (
            <div
              key={cinema.maHeThongRap}
              className={`cinema-logo ${
                selectedCinema &&
                selectedCinema.maHeThongRap === cinema.maHeThongRap
                  ? "active"
                  : ""
              }`}
              onClick={() => handleCinemaClick(cinema)}
            >
              <img src={cinema.logo} alt={cinema.tenHeThongRap} />
            </div>
          ))}
        </div>

        {/* Schedules (Right) */}
        <div className="schedules">
          {selectedCinema ? (
            <>
              <h4>Lịch Chiếu tại {selectedCinema.tenHeThongRap}</h4>
              {schedules.length > 0 ? (
                <ul className="schedule-list">
                  {schedules.map((schedule) => (
                    <li key={schedule.maLichChieu} className="schedule-item">
                      <span>
                        {new Date(
                          schedule.ngayChieuGioChieu
                        ).toLocaleString()}
                      </span>
                      <button className="btn-book">Đặt Vé</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Không có lịch chiếu cho rạp này.</p>
              )}
            </>
          ) : (
            <p>Vui lòng chọn một rạp để xem lịch chiếu.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
