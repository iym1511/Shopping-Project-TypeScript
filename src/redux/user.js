import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "문일윤",
  id: "iym1511",
  email: "iym1511@naver.com",
  apiaddress: "땡땡아파트",
  apizonecode: "41234",
  detailAddress: "302동 201호",
  isLoggedIn: true
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.comment = action.payload.comment;
      state.item = action.payload.item;
      state.pid = action.payload.pid;
    },
    logout: (state) => {
      state.name = initialState.name;
      state.id = initialState.id;
      state.email = initialState.email;
      state.password = initialState.password;
      state.phone = initialState.phone;
      state.isLoggedIn = initialState.isLoggedIn;
      state.comment = initialState.comment;
      state.item = initialState.item;
      state.pid = initialState.pid;
    },
    updateAddress: (state, action) => {
      state.address = action.payload.apiaddress;
      state.zonecode = action.payload.apizonecode;
      state.detailAddress = action.payload.detailAddress;
      state.delComment = action.payload.delComment;
    },
  },
});

export const {
  loginUser,
  logout,
  shopaddCounttt,
  shopminuseCounttt,
  shopcartAddtt,
  shopdelete,
  toggleCheckbox,
  toggleCheckboxAll,
  deleteChecked,
  updateAddress,
} = userSlice.actions;

export default userSlice.reducer;
