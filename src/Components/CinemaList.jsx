import React, { useState, useEffect } from 'react';

const CinemaList = () => {
  const [cinemas, setCinemas] = useState([]);  // state để lưu danh sách các hệ thống rạp
  const [loading, setLoading] = useState(true);  // trạng thái loading

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";

  useEffect(() => {
    // Gọi API để lấy danh sách các hệ thống rạp
    fetch('http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinHeThongRap', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === 200 && Array.isArray(data.content)) {
        setCinemas(data.content); // Lưu danh sách hệ thống rạp vào state cinemas
      } else {
        setCinemas([]);  // Nếu không có dữ liệu hợp lệ
      }
      setLoading(false);  // Đặt trạng thái loading thành false khi dữ liệu đã được tải
    })
    .catch((error) => {
      console.error("Error fetching cinemas:", error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="cinema-list_title">Các hệ thống rạp</h2>
      <div className="row">
        {/* Duyệt qua danh sách cinemas và hiển thị */}
        {cinemas.length > 0 ? (
          cinemas.map((cinema) => (
            <div className="cinema-card col-md-2" key={cinema.maHeThongRap}>
              <img
                src={cinema.logo}
                alt={cinema.tenHeThongRap}
                className="cinema-card_logo"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            </div>
          ))
        ) : (
          <p>No cinemas available.</p>  // Hiển thị thông báo nếu không có hệ thống rạp nào
        )}
      </div>
    </div>
  );
};

export default CinemaList;
