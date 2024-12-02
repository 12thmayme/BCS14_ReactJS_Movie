import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [apiUser, setApiUser] = useState(null); // User data from API
  const [localUser, setLocalUser] = useState(null); // User data from localStorage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        setLocalUser(storedUser);

        // Fetch user from API
        const url =
          "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01";
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIk5hbWUiOiJTYW1wbGUgVG9rZW4ifQ.NwApTKr-Q8knbG8PBoX57PX_5Fy8AmZSPup9KM1gV-g";

        const response = await axios.get(url, {
          headers: {
            TokenCybersoft: token,
          },
        });

        // Assume the first user in the API data matches the logged-in user for simplicity
        setApiUser(response.data.content[0] || null);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Profile</h2>

      {/* LocalStorage User Data */}
      {localUser && (
        <div className="card mx-auto mb-4" style={{ maxWidth: "500px" }}>
          <div className="card-header bg-success text-white text-center">
            <h3>LocalStorage User</h3>
          </div>
          <div className="card-body">
            <p>
              <strong>Username:</strong> {localUser.taiKhoan}
            </p>
            <p>
              <strong>Email:</strong> {localUser.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {localUser.soDT || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {localUser.maLoaiNguoiDung || "User"}
            </p>
          </div>
        </div>
      )}

      {/* API User Data */}
      {apiUser && (
        <div className="card mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-header bg-primary text-white text-center">
            <h3>API User</h3>
          </div>
          <div className="card-body">
            <p>
              <strong>Username:</strong> {apiUser.taiKhoan}
            </p>
            <p>
              <strong>Email:</strong> {apiUser.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {apiUser.soDT || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {apiUser.maLoaiNguoiDung || "User"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
