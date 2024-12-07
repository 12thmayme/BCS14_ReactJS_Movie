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

        const response = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              TokenCybersoft: token,
            },
          }
        );

        setUserHistory(response.data.content.thongTinDatVe || []);
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
      <div className="container text-center mt-5">
        <p>Loading user history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="user-history container mt-5">
      <h2 className="text-center mb-4">Booking History</h2>
      {userHistory.length > 0 ? (
        <ul className="list-group">
          {userHistory.map((booking, index) => (
            <li key={index} className="list-group-item">
              <h5>{booking.tenPhim || "N/A"}</h5>
              <img
                src={booking.hinhAnh}
                alt={booking.tenPhim}
                style={{ width: "100px", borderRadius: "5px" }}
              />
              <p>
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.ngayDat).toLocaleString() || "N/A"}
              </p>
              <p>
                <strong>Seats:</strong>{" "}
                {booking.danhSachGhe
                  .map((seat) => seat.tenGhe)
                  .join(", ") || "N/A"}
              </p>
              <p>
                <strong>Total Price:</strong>{" "}
                {booking.giaVe.toLocaleString()} VND
              </p>

              <p>
                <strong>Theater:</strong>{" "}
                {booking.danhSachGhe[0]?.tenCumRap || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted">No booking history available.</p>
      )}
    </div>
  );
};

export default UserHistory;
