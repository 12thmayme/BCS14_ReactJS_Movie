import React, { useState, useEffect } from "react";
import axios from "axios";
import { token } from "../constants/token";
const BookingSystem = () => {
  const [cinemaSystems, setCinemaSystems] = useState([]);
  const [selectedCinemaSystem, setSelectedCinemaSystem] = useState(null);
  const [cinemaClusters, setCinemaClusters] = useState([]);
  const [selectedCinemaCluster, setSelectedCinemaCluster] = useState(null);
  const [movieSchedules, setMovieSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [error, setError] = useState("");

  // Fetch Cinema Systems
  useEffect(() => {
    const fetchCinemaSystems = async () => {
      try {
        const response = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
          {
            headers: { TokenCybersoft: token },
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

  // Fetch Cinema Clusters When a Cinema System is Selected
  useEffect(() => {
    if (!selectedCinemaSystem) return;

    const fetchCinemaClusters = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${selectedCinemaSystem}`,
          {
            headers: { TokenCybersoft: token },
          }
        );
        setCinemaClusters(response.data.content || []);
      } catch (err) {
        console.error("Error fetching cinema clusters:", err);
        setError("Unable to fetch cinema clusters.");
      }
    };

    fetchCinemaClusters();
  }, [selectedCinemaSystem]);

  // Fetch Schedules When a Cinema Cluster is Selected
  useEffect(() => {
    if (!selectedCinemaCluster) return;

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
          {
            headers: { TokenCybersoft: token },
          }
        );
        const schedules = response.data.content.find(
          (cinema) => cinema.maHeThongRap === selectedCinemaSystem
        );
        setMovieSchedules(schedules?.cumRapChieu || []);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Unable to fetch movie schedules.");
      }
    };

    fetchSchedules();
  }, [selectedCinemaCluster, selectedCinemaSystem]);

  const handleCinemaSystemSelect = (cinemaSystemId) => {
    setSelectedCinemaSystem(cinemaSystemId);
    setCinemaClusters([]);
    setMovieSchedules([]);
  };

  const handleCinemaClusterSelect = (clusterId) => {
    setSelectedCinemaCluster(clusterId);
    setMovieSchedules([]);
  };

  const handleBookTicket = (schedule) => {
    setSelectedSchedule(schedule);
    // Navigate to a booking page or process the booking further
    console.log("Booking for schedule:", schedule);
  };

  return (
    <div className="booking-system container mt-5">
      <h2 className="text-center mb-4">Book Your Tickets</h2>

      {/* Cinema Systems */}
      <div className="cinema-systems">
        <h4>Select a Cinema System</h4>
        <div className="d-flex flex-wrap gap-3">
          {cinemaSystems.map((cinema) => (
            <div
              key={cinema.maHeThongRap}
              className={`cinema-system-card ${
                selectedCinemaSystem === cinema.maHeThongRap ? "active" : ""
              }`}
              onClick={() => handleCinemaSystemSelect(cinema.maHeThongRap)}
            >
              <img
                src={cinema.logo}
                alt={cinema.tenHeThongRap}
                className="img-fluid"
                style={{ height: "60px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cinema Clusters */}
      {selectedCinemaSystem && cinemaClusters.length > 0 && (
        <div className="cinema-clusters mt-4">
          <h4>Select a Cinema Cluster</h4>
          <ul className="list-group">
            {cinemaClusters.map((cluster) => (
              <li
                key={cluster.maCumRap}
                className={`list-group-item ${
                  selectedCinemaCluster === cluster.maCumRap ? "active" : ""
                }`}
                onClick={() => handleCinemaClusterSelect(cluster.maCumRap)}
              >
                {cluster.tenCumRap}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Movie Schedules */}
      {selectedCinemaCluster && movieSchedules.length > 0 && (
        <div className="movie-schedules mt-4">
          <h4>Available Schedules</h4>
          <ul className="list-group">
            {movieSchedules.map((schedule) => (
              <li
                key={schedule.maLichChieu}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{new Date(schedule.ngayChieuGioChieu).toLocaleString()}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBookTicket(schedule)}
                >
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Display */}
      {error && <p className="text-danger mt-4">{error}</p>}
    </div>
  );
};

export default BookingSystem;
