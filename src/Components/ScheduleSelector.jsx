import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { token } from "../constants/token";

const ScheduleSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState("");

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
        if (response.data.content.length > 0) {
          setSelectedCinema(response.data.content[0].maHeThongRap);
        }
      } catch (err) {
        console.error("Error fetching cinema systems:", err);
        setError("Unable to fetch cinema systems.");
      }
    };

    fetchCinemas();
  }, []);

  useEffect(() => {
    if (!selectedCinema) return;

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
          {
            headers: { TokenCybersoft: token },
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

  return (
    <>
    <h1 class="schedule-selector-title text-center">Select Movies</h1>
    <div className="schedule-selector">
  {/* Cinema Selector */}
  <div className="cinema-selector">
    <div className="cinema-logos scrollable">
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
  <div className="schedule-display">
    {schedules.map((cinema) => (
      <div key={cinema.maCumRap} className="cinema-schedule">
        <h4>{cinema.tenCumRap}</h4>
        <div className="schedule-times">
          {cinema.lichChieuPhim.map((schedule) => (
            <button
              key={schedule.maLichChieu}
              className="schedule-time"
              onClick={() => navigate(`/home/${schedule.maLichChieu}`)}
            >
              {new Date(schedule.ngayChieuGioChieu).toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
};

export default ScheduleSelector;
