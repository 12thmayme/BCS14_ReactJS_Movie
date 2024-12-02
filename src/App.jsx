import React from "react";
import MovieSeat from "./Components/HomePages";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "../src/Sass/main.scss";
import HomeTemplate from "./Components/HomeTemplate";
import HomePages from "./Components/HomePages";
import Account from "./Components/Account";

import Film from "./Components/Admin/Film";
import AdminTemplate from "./Components/Admin/AdminTemplate";
import FormEdit from "./Components/Admin/FormEdit";
import EditUser from "./Components/Admin/EditUser";
import UserManagement from "./Components/Admin/UserManagement";
import RegisterAdmin from "./Components/Admin/RegisterAdmin";
import LogInAdmin from "./Components/Admin/LogInAdmin";

import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="" element={<HomeTemplate />}>
            <Route index element={<HomePages />}></Route>
            <Route path="/" element={<HomePages />}></Route>
            <Route path="/account" element={<Account />}></Route>
          </Route>

          <Route path="admin" element={<AdminTemplate />}>
            <Route path="film" element={<Film />}></Route>
            <Route path="user-management" element={<UserManagement />}></Route>
            <Route path="edit-user" element={<EditUser />}></Route>
            <Route path="edit-user">
              <Route path=":userID" element={<EditUser />}></Route>
            </Route>
            <Route path="product-form" element={<FormEdit />}></Route>
            <Route path="product-form">
              <Route path=":productID" element={<FormEdit />}></Route>
            </Route>
            <Route path="register-admin" element={<RegisterAdmin />}></Route>
            <Route path="login-admin" element={<LogInAdmin />}></Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
