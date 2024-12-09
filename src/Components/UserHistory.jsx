import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../constants/token";

const UserHistory = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserHistory = async () => {
      setLoading(true);

      try {
        const userToken = localStorage.getItem("userToken");

        const localUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!localUser || !localUser.taiKhoan) {
          setError("No logged-in user found.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              TokenCybersoft: token,
            },
          }
        );

        if (
          response.data &&
          response.data.content &&
          response.data.content.thongTinDatVe
        ) {
          setUserHistory(response.data.content.thongTinDatVe || []);
        } else {
          setError("No booking history available.");
        }
      } catch (err) {
        console.error("Error fetching user history:", err);
        setError("Unable to fetch user history.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, []);

  const totalExpenditure = userHistory.reduce(
    (total, booking) => total + booking.giaVe * booking.danhSachGhe.length,
    0
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading user history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div class="booking-history-container">
    <h2>
      Booking History
    </h2>
    {userHistory.length > 0 ? (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Movie</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Image</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Booking Date</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Seats</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Total Price (VND)</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Theater</th>
          </tr>
        </thead>
        <tbody>
          {userHistory.map((booking, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{booking.tenPhim || "N/A"}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <img
                  src={booking.hinhAnh || ""}
                  alt={booking.tenPhim}
                  style={{ width: "50px", borderRadius: "5px" }}
                />
              </td>
              <td style={{ padding: "10px" }}>
                {new Date(booking.ngayDat).toLocaleString() || "N/A"}
              </td>
              <td style={{ padding: "10px" }}>
                {booking.danhSachGhe.map((seat) => seat.tenGhe).join(", ") || "N/A"}
              </td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                {(booking.giaVe * booking.danhSachGhe.length).toLocaleString()}
              </td>
              <td style={{ padding: "10px" }}>
                {booking.danhSachGhe[0]?.tenCumRap || "N/A"}
              </td>
            </tr>
          ))}
          <tr style={{ fontWeight: "bold", backgroundColor: "#f1f1f1" }}>
            <td colSpan="4" style={{ padding: "10px" }}>
              Total Expenditure
            </td>
            <td colSpan="2" style={{ padding: "10px", textAlign: "right", color: "#d96c2b" }}>
              {userHistory
                .reduce((total, booking) => total + booking.giaVe * booking.danhSachGhe.length, 0)
                .toLocaleString()}{" "}
              VND
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <p style={{ textAlign: "center", color: "#6c757d" }}>
        No booking history available.
      </p>
    )}
  </div>
  

  );
};

export default UserHistory;
