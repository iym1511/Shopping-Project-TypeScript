import { createSlice } from "@reduxjs/toolkit";

let nextId = 0;

const initialState = [
  // 더미데이터
  {
    id : 0,
    pid : 0,
    name : "홍길동",
    text: "옷이 너무 편해요!!",
    date: "2023-03-22",
    rate: 4
  },
  {
    id : 1,
    pid : 0,
    name : "두루미",
    text: "옷 잘입을게요~ ",
    date: "2023-03-22",
    rate: 5
  },
  {
    id : 0,
    pid : 1,
    name : "홍길동",
    text: "옷이 너무 편해요!!",
    date: "2023-03-22",
    rate: 4
  },
  {
    id : 1,
    pid : 1,
    name : "두루미",
    text: "옷 잘입을게요~ ",
    date: "2023-03-22",
    rate: 5
  },
  {
    id : 0,
    pid : 2,
    name : "홍길동",
    text: "옷이 너무 편해요!!",
    date: "2023-03-22",
    rate: 4
  },
  {
    id : 1,
    pid : 2,
    name : "두루미",
    text: "옷 잘입을게요~ ",
    date: "2023-03-22",
    rate: 5
  },
  {
    id : 0,
    pid : 3,
    name : "홍길동",
    text: "옷이 너무 편해요!!",
    date: "2023-03-22",
    rate: 4
  },
  {
    id : 1,
    pid : 3,
    name : "두루미",
    text: "옷 잘입을게요~ ",
    date: "2023-03-22",
    rate: 5
  },
  {
    id : 0,
    pid : 4,
    name : "홍길동",
    text: "옷이 너무 편해요!!",
    date: "2023-03-22",
    rate: 4
  },
  {
    id : 1,
    pid : 4,
    name : "두루미",
    text: "옷 잘입을게요~ ",
    date: "2023-03-22",
    rate: 5
  },
  {
    id : 0,
    pid : 5,
    name : "홍길동",
    text: "옷이 너무 편해요!!",
    date: "2023-03-22",
    rate: 4
  },
  {
    id : 1,
    pid : 5,
    name : "두루미",
    text: "옷 잘입을게요~ ",
    date: "2023-03-22",
    rate: 5
  },
];

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReview: (state, action) => {
      nextId++;
      state.push({
        id: nextId,
        pid: action.payload.pid,
        name: action.payload.name,
        text: action.payload.text, // text하나만 선택
        date: action.payload.date,
        rate: action.payload.rate
      });
    },
    removeReview: (state, action) => {
      alert("삭제되었습니다.");
      return state.filter((e) => e.id !== action.payload);
    },
  },
});

export const { addReview, removeReview } = reviewSlice.actions;

export default reviewSlice.reducer;
