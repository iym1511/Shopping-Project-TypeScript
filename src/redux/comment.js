import { createSlice } from "@reduxjs/toolkit";

let nextId = 0;

const initialState = [];

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    add: (state, action) => {
      nextId++;
      state.push({
        id: nextId,
        pid: action.payload.pid, // pid하나만선택
        name: action.payload.name,
        text: action.payload.text, // text하나만 선택
        date: action.payload.date
      });
      console.log(nextId);
      console.log(action.payload)
    },
    remove: (state, action) => {
      alert("삭제되었습니다.");
      return state.filter((e) => e.id !== action.payload);
    },
  },
});

export const { add, remove } = commentSlice.actions;

export default commentSlice.reducer;
