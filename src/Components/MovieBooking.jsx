import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../constants/token";
import { useNavigate } from "react-router-dom";

const MovieBooking = () => {
  const [cinemaSystems, setCinemaSystems] = useState([]);
  const [branches, setBranches] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Cinema Systems
  useEffect(() => {
    const fetchCinemaSystems = async () => {
      try {
        const response = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
          {
            headers: {
              TokenCybersoft: token,
            },
          }
        );
        const cinemas = response.data.content || [];
        setCinemaSystems(cinemas);

        // Automatically select the first cinema
        if (cinemas.length > 0) {
          setSelectedCinema(cinemas[0].maHeThongRap);
        }
      } catch (err) {
        console.error("Error fetching cinema systems:", err);
        setError("Unable to fetch cinema systems.");
      }
    };

    fetchCinemaSystems();
  }, []);

  // Fetch Branches when a cinema system is selected
  useEffect(() => {
    if (!selectedCinema) return;

    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${selectedCinema}`,
          {
            headers: {
              TokenCybersoft: token,
            },
          }
        );
        const branchList = response.data.content || [];
        setBranches(branchList);

        // Automatically select the first branch
        if (branchList.length > 0) {
          setSelectedBranch(branchList[0].maCumRap);
        }
      } catch (err) {
        console.error("Error fetching branches:", err);
        setError("Unable to fetch branches.");
      }
    };

    fetchBranches();
  }, [selectedCinema]);

  // Fetch Schedules when a branch is selected
  useEffect(() => {
    if (!selectedBranch) return;

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
          {
            headers: {
              TokenCybersoft: token,
            },
          }
        );
        const scheduleData =
          response.data.content.find(
            (cinema) => cinema.maHeThongRap === selectedCinema
          ) || {};
        const branchData =
          scheduleData.lstCumRap?.find(
            (branch) => branch.maCumRap === selectedBranch
          ) || {};
        setSchedules(branchData.danhSachPhim || []);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Unable to fetch schedules.");
      }
    };

    fetchSchedules();
  }, [selectedBranch, selectedCinema]);

  // Handle Schedule Booking
  const handleBookNowClick = (scheduleId) => {
    navigate(`/seats/${scheduleId}`);
  };

  return (
    <div className="movie-booking-container">
      {/* Cinema Systems */}
      <div className="cinema-system-column">
        <div className="cinema-logos">
          {cinemaSystems.map((cinema) => (
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

      {/* Branches */}
      <div className="branch-column">
        <ul>
          {branches.map((branch) => (
            <li
              key={branch.maCumRap}
              className={`branch-item ${
                selectedBranch === branch.maCumRap ? "active" : ""
              }`}
              onClick={() => setSelectedBranch(branch.maCumRap)}
            >
              {branch.tenCumRap}
            </li>
          ))}
        </ul>
      </div>

      {/* Schedules */}
      <div className="schedule-column">
        {schedules.map((movie) => (
          <div key={movie.maPhim} className="schedule-item">
            <h4>{movie.tenPhim}</h4>
            <ul>
              {movie.lstLichChieuTheoPhim.map((schedule) => (
                <li key={schedule.maLichChieu}>
                  <button
                    onClick={() => handleBookNowClick(schedule.maLichChieu)}
                  >
                    {new Date(schedule.ngayChieuGioChieu).toLocaleString()}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default MovieBooking;
