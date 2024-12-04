import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleSelector = () => {
  const [cinemaSystems, setCinemaSystems] = useState([]);
  const [selectedCinemaSystem, setSelectedCinemaSystem] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [movieSchedules, setMovieSchedules] = useState([]);
  const [error, setError] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E"

  useEffect(() => {
    // Fetch cinema systems and their schedules
    const fetchCinemaSystems = async () => {
      try {
        const response = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01",
          {
            headers: {
            // Authorization: `Bearer ${token}`,
              TokenCybersoft: token,
            },
          }
        );
        setCinemaSystems(response.data.content);
      } catch (err) {
        console.error("Error fetching cinema systems:", err);
        setError("Unable to fetch cinema systems. Please try again later.");
      }
    };

    fetchCinemaSystems();
  }, []);

// useEffect(() => {
//     axios
//       .get(
//         'https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01',
//         {
//           headers: {
//             TokenCybersoft:
//               'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E',
//           },
//         }
//       )
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   }, []);

  const handleCinemaSystemClick = (cinemaSystem) => {
    setSelectedCinemaSystem(cinemaSystem);
    setSelectedCinema(null); // Reset cinema selection
    setMovieSchedules([]); // Clear movie schedules
  };

  const handleCinemaClick = (cinema) => {
    setSelectedCinema(cinema);
    setMovieSchedules(cinema.lichChieuPhim); // Set schedules for the selected cinema
  };

  return (
    <div className="schedule-selector">
      <h2 className="title">Chọn Lịch Chiếu</h2>
      {error && <div className="error">{error}</div>}

      {/* Cinema System Selection */}
      <div className="cinema-system-list">
        {cinemaSystems.map((system) => (
          <div
            key={system.maHeThongRap}
            className={`cinema-system-item ${
              selectedCinemaSystem?.maHeThongRap === system.maHeThongRap
                ? "active"
                : ""
            }`}
            onClick={() => handleCinemaSystemClick(system)}
          >
            <img src={system.logo} alt={system.tenHeThongRap} />
            <p>{system.tenHeThongRap}</p>
          </div>
        ))}
      </div>

      {/* Cinema Selection */}
      {selectedCinemaSystem && (
        <div className="cinema-list">
          <h3>Rạp thuộc hệ thống: {selectedCinemaSystem.tenHeThongRap}</h3>
          {selectedCinemaSystem.lstCumRap.map((cinema) => (
            <div
              key={cinema.maCumRap}
              className={`cinema-item ${
                selectedCinema?.maCumRap === cinema.maCumRap ? "active" : ""
              }`}
              onClick={() => handleCinemaClick(cinema)}
            >
              <p>{cinema.tenCumRap}</p>
              <small>{cinema.diaChi}</small>
            </div>
          ))}
        </div>
      )}

      {/* Movie Schedule Display */}
      {selectedCinema && (
        <div className="movie-schedule">
          <h3>Lịch Chiếu tại {selectedCinema.tenCumRap}</h3>
          {movieSchedules.length > 0 ? (
            <ul>
              {movieSchedules.map((schedule) => (
                <li key={schedule.maLichChieu}>
                  <span>{schedule.tenPhim}</span> -{" "}
                  <span>
                    {new Date(schedule.ngayChieuGioChieu).toLocaleString()}
                  </span>
                  <button className="btn-book">Đặt Vé</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có lịch chiếu tại rạp này.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleSelector;
