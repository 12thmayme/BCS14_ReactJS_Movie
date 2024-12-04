import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { token } from "../constants/token";


const SeatsSelector = () => {
  const { scheduleId } = useParams(); // Get the schedule ID from the URL
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(300); // Timer starts at 300 seconds (5 minutes)
  const [error, setError] = useState("");

  // Fetch seat data from API
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${scheduleId}`,
          {
            headers: {
              TokenCybersoft: token,
            },
          }
        );
        setSeatData(response.data.content.danhSachGhe || []);
      } catch (err) {
        console.error("Error fetching seat data:", err);
        setError("Unable to fetch seat data. Please try again later.");
      }
    };

    fetchSeats();
  }, [scheduleId]);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle seat selection
  const handleSeatClick = (seat) => {
    if (seat.daDat) return; // Prevent selecting already booked seats

    if (selectedSeats.some((selected) => selected.maGhe === seat.maGhe)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((s) => s.maGhe !== seat.maGhe));
    } else {
      // Select seat
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate total price
  const totalPrice = selectedSeats.reduce((total, seat) => total + seat.giaVe, 0);

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="seat-selector__container">
      <div className="seat-selector__layout">
        <h1>Seat Selector</h1>
        <div className="seat-selector__">Screen</div>
        <div className="seat-selector__">
          {seatData.map((seat) => (
            <button
              key={seat.maGhe}
              className={`seat ${
                seat.daDat
                  ? "reserved"
                  : selectedSeats.some((s) => s.maGhe === seat.maGhe)
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.daDat}
            >
              {seat.tenGhe}
            </button>
          ))}
        </div>
      </div>

      <div className="seat-selector__summary">
        <h2>Selected Seats</h2>
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat.maGhe}>
              {seat.tenGhe} - {seat.giaVe.toLocaleString()} VND
            </li>
          ))}
        </ul>
        <h3>Total Price: {totalPrice.toLocaleString()} VND</h3>
        <button
          disabled={selectedSeats.length === 0}
          className="btn btn-primary"
        >
          Proceed to Payment ({selectedSeats.length})
        </button>
        <p>Time Left: {formatTime(timer)}</p>
      </div>
    </div>
  );
};

export default SeatsSelector;
