import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminRegister: {
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    hoTen: "",
  },
};

const registerAdminReducer = createSlice({
  name: "registerAdminReducer",
  initialState,
  reducers: {
    handleChangeInputAction: (state, action) => {
      // Xử lý set state
      const { name, value } = action.payload;
      state.adminRegister[name] = value;
    },
  },
});

export const { handleChangeInputAction } = registerAdminReducer.actions;

export default registerAdminReducer.reducer;
