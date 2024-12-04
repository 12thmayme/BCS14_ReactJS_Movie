import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { token } from "../constants/token";

const ScheduleSelector = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const navigate = useNavigate(); // Initialize navigate hook
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState("");

  // Fetch Cinema Systems
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
        setCinemas(response.data.content || []);
      } catch (err) {
        console.error("Error fetching cinema systems:", err);
        setError("Unable to fetch cinema systems.");
      }
    };

    fetchCinemas();
  }, []);

  // Fetch Movie Schedules When Cinema is Selected
  useEffect(() => {
    if (!selectedCinema) return;

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
          {
            headers: {
              TokenCybersoft: token,
            },
          }
        );
        const cinemaSchedules = response.data.content.heThongRapChieu.find(
          (cinema) => cinema.maHeThongRap === selectedCinema
        );
        setSchedules(cinemaSchedules?.cumRapChieu || []);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Unable to fetch schedules.");
      }
    };

    fetchSchedules();
  }, [selectedCinema, id]);

  const handleBookClick = (scheduleId) => {
    // Navigate to the booking page for the selected schedule
    navigate(`/schedule/${scheduleId}`);
  };

  return (
    <div className="schedule-selector-container">
      <h2>Chọn Lịch Xem Phim</h2>

      {/* Error Display */}
      {error && <p className="error-message">{error}</p>}

      {/* Cinema Selector */}
      <div className="cinema-selector">
        <h3>Select a Cinema</h3>
        <div className="cinema-logos">
          {cinemas.map((cinema) => (
            <div
              key={cinema.maHeThongRap}
              className={`cinema-logo ${
                selectedCinema === cinema.maHeThongRap ? "active" : ""
              }`}
              onClick={() => setSelectedCinema(cinema.maHeThongRap)}
            >
              <img src={cinema.logo} alt={cinema.tenHeThongRap} />
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Display */}
      {selectedCinema && schedules.length > 0 && (
        <div className="schedule-container">
          <h3>Available Schedules</h3>
          {schedules.map((cinema) => (
            <div key={cinema.maCumRap} className="cinema-schedule">
              <h4>{cinema.tenCumRap}</h4>
              <ul>
                {cinema.lichChieuPhim.map((schedule) => (
                  <li key={schedule.maLichChieu}>
                    {new Date(schedule.ngayChieuGioChieu).toLocaleString()}{" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBookClick(schedule.maLichChieu)}
                    >
                      Book
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {selectedCinema && schedules.length === 0 && (
        <p>No schedules available for the selected cinema.</p>
      )}
    </div>
  );
};

export default ScheduleSelector;
