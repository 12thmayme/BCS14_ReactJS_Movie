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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px",  color: "#d96c2b" }}>
        Booking History
      </h2>
      {userHistory.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {userHistory.map((booking, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={booking.hinhAnh}
                alt={booking.tenPhim}
                style={{
                  width: "120px",
                  height: "auto",
                  objectFit: "cover",
                  borderRight: "1px solid #ddd",
                }}
              />
              <div
                style={{
                  flex: 1,
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h5 style={{ margin: "0", color: "#343a40" }}>
                  {booking.tenPhim || "N/A"}
                </h5>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "14px",
                    color: "#495057",
                  }}
                >
                  <strong style={{ color: "#212529" }}>Booking Date:</strong>{" "}
                  {new Date(booking.ngayDat).toLocaleString() || "N/A"}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "14px",
                    color: "#495057",
                  }}
                >
                  <strong style={{ color: "#212529" }}>Seats:</strong>{" "}
                  {booking.danhSachGhe.map((seat) => seat.tenGhe).join(", ") ||
                    "N/A"}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "14px",
                    color: "#495057",
                  }}
                >
                  <strong style={{ color: "#212529" }}>Total Price:</strong>{" "}
                  {(
                    booking.giaVe * booking.danhSachGhe.length
                  ).toLocaleString()}{" "}
                  VND
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "14px",
                    color: "#495057",
                  }}
                >
                  <strong style={{ color: "#212529" }}>Theater:</strong>{" "}
                  {booking.danhSachGhe[0]?.tenCumRap || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#6c757d" }}>
          No booking history available.
        </p>
      )}
    </div>
  );
};

export default UserHistory;
