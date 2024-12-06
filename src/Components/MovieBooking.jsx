import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../constants/token";

const MovieBooking = () => {
  const [cinemaSystems, setCinemaSystems] = useState([]);
  const [branches, setBranches] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [error, setError] = useState("");

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
        setCinemaSystems(response.data.content || []);
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
        setBranches(response.data.content || []);
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

  return (
    <div className="movie-booking-container">
      <h2 className="text-center mb-4">Book Movie Tickets</h2>

      {/* Cinema Systems */}
      <div className="cinema-system-selector">
        <h3>Select Cinema System</h3>
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
      {branches.length > 0 && (
        <div className="branch-selector">
          <h3>Select Branch</h3>
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
      )}

      {/* Schedules */}
      {schedules.length > 0 && (
        <div className="schedule-list">
          <h3>Available Schedules</h3>
          <ul>
            {schedules.map((movie) => (
              <li key={movie.maPhim} className="schedule-item">
                <h4>{movie.tenPhim}</h4>
                <ul>
                  {movie.lstLichChieuTheoPhim.map((schedule) => (
                    <li key={schedule.maLichChieu}>
                      <span>
                        {new Date(schedule.ngayChieuGioChieu).toLocaleString()}
                      </span>
                      <button className="btn btn-primary">Book Now</button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default MovieBooking;
