import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { token } from "../constants/token";

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // Unified user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      try {
        // Get logged-in user from localStorage
        const localUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!localUser || !localUser.taiKhoan) {
          setError("No logged-in user found.");
          setLoading(false);
          return;
        }

        // Fetch user data from API
        const url = `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${localUser.taiKhoan}`;

        const response = await axios.get(url, {
          headers: {
            TokenCybersoft: token,
          },
        });

        const apiUser = response.data.content.find(
          (user) => user.taiKhoan === localUser.taiKhoan
        );

        // Combine API data with localStorage data (local data takes priority)
        setUserData({
          ...apiUser,
          ...localUser,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <p>Loading user data...</p>
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
    <div className="user-profile container mt-5">
      <h2 className="text-center mb-4">User Profile</h2>
      {userData ? (
        <div className="card mx-auto" style={{ maxWidth: "500px" }}>
          {/* User Information */}
          <div className="card-header text-center">
            <h3>{userData.hoTen || "User Name Not Provided"}</h3>
          </div>
          <div className="card-body">
            <p>
              <strong>Username:</strong> {userData.taiKhoan || "Not Provided"}
            </p>
            <p>
              <strong>Email:</strong> {userData.email || "Not Provided"}
            </p>
            <p>
              <strong>Phone Number:</strong> {userData.soDT || "Not Provided"}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              {userData.maLoaiNguoiDung === "QuanTri" ? "Admin" : "Customer"}
            </p>
          </div>

          {/* Booking History
          {userData.thongTinDatVe && userData.thongTinDatVe.length > 0 ? (
            <div className="mt-4">
              <h4>Booking History</h4>
              <ul className="list-group">
                {userData.thongTinDatVe.map((booking, index) => (
                  <li key={index} className="list-group-item">
                    <p>
                      <strong>Movie:</strong> {booking.tenPhim || "N/A"}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
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
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-muted mt-4 text-center">
              No booking history available.
            </p>
          )} */}
        </div>
      ) : (
        <p className="text-center text-muted">No user data available.</p>
      )}
    </div>
  );
};

export default UserProfile;
