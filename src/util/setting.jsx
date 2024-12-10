import axios from "axios";
const DOMAIN = "https://apistore.cybersoft.edu.vn";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";
const TOKEN_USER = "localStorage.getItem(userToken)";
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 3000, // giới hạn thời gian chờ kết quả từ server
});

// cấu hình cho request
http.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers, // giữ lại cái API có headers riêng
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: `Bearer ${TOKEN_USER}`, // thêm phần chung authorization
  };
  return req;
});

// cấu hình response:

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    switch (err?.response.status) {
      case 400:
        {
          alert("Wrong data");
          navigateHistory.push("/admin");
        }
        break;
      case 404:
        {
          alert("Not found");
          navigateHistory.push("/admin");
        }
        break;
      case 401:
        {
          alert("Your token is invalid.");
          navigateHistory.push("/admin");
        }
        break;
      case 403:
        {
          alert("You do not have sufficient access rights.");
          navigateHistory.push("/");
        }
        break;

      case 500:
        {
          alert("error in sever");
          navigateHistory.push("/admin");
        }
        break;
    }

    return Promise.reject(err);
  }
);

// cấu hình chuyển hướng trang khi không dùng hook
import { createBrowserHistory } from "history";
export const navigateHistory = createBrowserHistory();
