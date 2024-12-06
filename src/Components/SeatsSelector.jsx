import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { token } from "../constants/token";
import Modal from "./Modal";

const SeatsSelector = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(300);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSeatClick = (seat) => {
    if (seat.daDat) return;

    if (selectedSeats.some((s) => s.maGhe === seat.maGhe)) {
      setSelectedSeats(selectedSeats.filter((s) => s.maGhe !== seat.maGhe));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const totalPrice = selectedSeats.reduce((total, seat) => total + seat.giaVe, 0);

  const handleOrder = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!userToken || !loggedInUser) {
        setError("You must be logged in to place an order.");
        return;
      }

      const bookingData = {
        maLichChieu: scheduleId,
        danhSachVe: selectedSeats.map((seat) => ({
          maGhe: seat.maGhe,
          giaVe: seat.giaVe,
        })),
        taiKhoanNguoiDung: loggedInUser?.taiKhoan,
      };

      const response = await axios.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            TokenCybersoft: token,
          },
        }
      );

      if (response.status === 200) {
        setModalVisible(true);
        setSelectedSeats([]);
      } else {
        setError("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Error booking seats:", err);
      setError("Booking failed. Please try again.");
    }
  };

  const navigateHome = () => {
    setModalVisible(false); // Close modal
    navigate("/home"); // Redirect to home page
  };

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
          onClick={handleOrder}
        >
          Proceed to Payment ({selectedSeats.length})
        </button>
        <p>Time Left: {formatTime(timer)}</p>
      </div>

      {/* Modal */}
      <Modal
        isVisible={modalVisible}
        title="Booking Successful!"
        content="Your seats have been booked successfully."
        onClose={() => setModalVisible(false)}
        navigateHome={navigateHome}
      />
    </div>
  );
};

export default SeatsSelector;
