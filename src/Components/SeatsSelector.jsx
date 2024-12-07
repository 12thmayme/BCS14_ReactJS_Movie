import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { token } from "../constants/token";
import Modal from "./Modal"; // Ensure Modal component is correctly imported

const SeatsSelector = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(300);
  const [modalVisible, setModalVisible] = useState(false); // Booking success modal
  const [errorModalVisible, setErrorModalVisible] = useState(false); // Error modal
  const [errorMessage, setErrorMessage] = useState(""); // Error message for modal

  // Fetch seat data from API
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${scheduleId}`,
          {
            headers: { TokenCybersoft: token },
          }
        );
        setSeatData(response.data.content?.danhSachGhe || []);
      } catch (err) {
        console.error("Error fetching seat data:", err);
      }
    };
    fetchSeats();
  }, [scheduleId]);

  // Timer countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Handle seat selection
  const handleSeatClick = (seat) => {
    if (seat.daDat) return;

    setSelectedSeats((prevSelected) =>
      prevSelected.some((s) => s.maGhe === seat.maGhe)
        ? prevSelected.filter((s) => s.maGhe !== seat.maGhe) // Deselect seat
        : [...prevSelected, seat] // Select seat
    );
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate total price
  const totalPrice = selectedSeats.reduce((total, seat) => total + seat.giaVe, 0);

  // Handle booking order
  const handleOrder = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!userToken || !loggedInUser) {
        setErrorMessage("You must be logged in to place an order.");
        setErrorModalVisible(true);
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
        setSelectedSeats([]); // Reset seat selection
      } else {
        setErrorMessage("Booking failed. Please try again.");
        setErrorModalVisible(true);
      }
    } catch (err) {
      console.error("Error booking seats:", err);
      setErrorMessage("Booking failed. Please try again.");
      setErrorModalVisible(true);
    }
  };

  // Navigate to home
  const navigateHome = () => {
    setModalVisible(false);
    navigate("/");
  };

  // Navigate to login
  const navigateLogin = () => {
    setErrorModalVisible(false);
    navigate("/user/login");
  };

  return (
    <div className="seat-selector__container">
      <div className="seat-selector__layout">
        <h1>Seat Selector</h1>
        <div className="seat-selector__">Screen</div>
        <div className="seat-selector__">
          {seatData.length > 0 ? (
            seatData.map((seat) => (
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
            ))
          ) : (
            <p>No seats available</p>
          )}
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

      {/* Success Modal */}
      <Modal
        isVisible={modalVisible}
        title="Booking Successful!"
        content="Your seats have been booked successfully."
        actionText="Go to Home"
        onClose={() => setModalVisible(false)}
        onAction={navigateHome}
      />

      {/* Error Modal */}
      <Modal
        isVisible={errorModalVisible}
        title="Error"
        content={errorMessage}
        actionText="Go to Login"
        onClose={() => setErrorModalVisible(false)}
        onAction={navigateLogin}
      />
    </div>
  );
};

export default SeatsSelector;
