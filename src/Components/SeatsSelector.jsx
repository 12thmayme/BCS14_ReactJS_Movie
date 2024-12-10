import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { token } from "../constants/token";
import Modal from "./Modal";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCouch } from "react-icons/fa";

const SeatsSelector = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [seatData, setSeatData] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(300);
  const [modalConfig, setModalConfig] = useState({
    isVisible: false,
    title: "",
    content: "",
    actionText: "",
    onAction: () => {},
  });
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const renderSeatIcon = (seat) => {
    if (seat.daDat) {
      return <AiOutlineCheck style={{ color: "#dc3545", fontSize: "18px" }} />;
    }
    if (selectedSeats.some((s) => s.maGhe === seat.maGhe)) {
      return <FaCouch style={{ color: "#28a745", fontSize: "18px" }} />;
    }
    switch (seat.loaiGhe) {
      case "VIP":
        return <FaCouch style={{ color: "#ffc107", fontSize: "18px" }} />;
      case "Couple":
        return <FaCouch style={{ color: "#17a2b8", fontSize: "18px" }} />;
      default:
        return <FaCouch style={{ color: "#6c757d", fontSize: "18px" }} />;
    }
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${scheduleId}`,
          {
            headers: { TokenCybersoft: token },
          }
        );

        const content = response.data.content;
        console.log("API Response:", content); // Log the response for debugging

        if (content) {
          setSeatData(content.danhSachGhe || []);
          setMovieInfo(content.thongTinPhim || []);
        } else {
          console.error("Invalid content structure:", content);
        }
      } catch (err) {
        console.error("Error fetching seat data:", err);
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

    setSelectedSeats((prevSelected) =>
      prevSelected.some((s) => s.maGhe === seat.maGhe)
        ? prevSelected.filter((s) => s.maGhe !== seat.maGhe)
        : [...prevSelected, seat]
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + seat.giaVe,
    0
  );

  const confirmOrder = () => {
    setConfirmationModalVisible(true);
  };

  const handleOrder = async () => {
    setConfirmationModalVisible(false);

    try {
      const userToken = localStorage.getItem("userToken");
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!userToken || !loggedInUser) {
        setModalConfig({
          isVisible: true,
          title: "Error",
          content: "You must be logged in to place an order.",
          actionText: "Go to Login",
          onAction: () => navigate("/user/login"),
        });
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
        setModalConfig({
          isVisible: true,
          title: "Booking Successful!",
          content: "Your seats have been booked successfully.",
          actionText: "Go to Your Order History",
          onAction: () => navigate("/user/history"),
        });
        setSelectedSeats([]);
      } else {
        throw new Error("Booking failed.");
      }
    } catch (err) {
      console.error("Error booking seats:", err);
      setModalConfig({
        isVisible: true,
        title: "Error",
        content: "Booking failed. Please try again.",
        actionText: "Retry",
        onAction: () =>
          setModalConfig((prev) => ({ ...prev, isVisible: false })),
      });
    }
  };

  return (
    <div className="seat-selector__container">
      <div className="seat-selector__layout">
        <div className="seat-selector__screen">Screen</div>
        <div className="seat-selector__grid">
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
                {renderSeatIcon(seat)}
              </button>
            ))
          ) : (
            <p>No seats available</p>
          )}
        </div>
      </div>

      <div className="seat-selector__summary">
        <h3>Total Price: {totalPrice.toLocaleString()} VND</h3>

        {movieInfo && (
          <>
            <p>
              <strong>Theater:</strong> {movieInfo.tenCumRap}
            </p>
            <p>
              <strong>Screen:</strong> {movieInfo.tenRap}
            </p>
            <p>
              <strong>Date:</strong> {movieInfo.ngayChieu}
            </p>
            <p>
              <strong>Time:</strong> {movieInfo.gioChieu}
            </p>
            <p>
              <strong>Movie:</strong> {movieInfo.tenPhim}
            </p>
          </>
        )}
        {selectedSeats.length > 0 && (
          <p>
            <strong>Selected Seats:</strong>{" "}
            {selectedSeats.map((seat) => seat.tenGhe).join(", ")}
          </p>
        )}
        <button
          disabled={selectedSeats.length === 0}
          className="btn btn-primary"
          onClick={confirmOrder}
        >
          Proceed to Payment ({selectedSeats.length})
        </button>
        <p>
          <strong style={{ color: "red" }}>Time Left:</strong>{" "}
          {formatTime(timer)}
        </p>
      </div>

      <Modal
        isVisible={confirmationModalVisible}
        title="Confirm Order"
        content="Are you really sure to order?"
        actionText="Confirm"
        onClose={() => setConfirmationModalVisible(false)}
        onAction={handleOrder}
      />

      <Modal
        isVisible={modalConfig.isVisible}
        title={modalConfig.title}
        content={modalConfig.content}
        actionText={modalConfig.actionText}
        onClose={() =>
          setModalConfig((prev) => ({ ...prev, isVisible: false }))
        }
        onAction={modalConfig.onAction}
      />
    </div>
  );
};

export default SeatsSelector;
