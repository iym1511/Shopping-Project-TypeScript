import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    shopaddCount(state, action) {
      // 위 배열안의 id와 값을올려줄 물건id가 같으면 증가
      let nums = state.findIndex((a) => a.id === action.payload);
      state[nums].count++;
      // 가격에다가 수량증가하면 가격++
      state[nums].money += state[nums].save;
    },
    shopminuseCount(state, action) {
      let nums = state.findIndex((a) => a.id === action.payload);
      if (state[nums].count > 1) {
        state[nums].count--;
        state[nums].money -= state[nums].save;
      }
    },
    shopdelete(state, action) {
      alert("삭제되었습니다.");
      return state.filter((a) => a.id !== action.payload);
    },
    shopAlldelete(state) {
      return (state = []);
    },
    shopcartAdd(state, action) {
      // 처음에 빈배열이라서 같은게 없어서 false 반환
      const someCheck = state.some((a) => a.id === action.payload.id);
      // console.log(someCheck);
      // 값이 있으면 true 값이 없으면 false
      // 처음에 빈배열이라 false 반환하니 거꾸로 true로 만들어줘서 if문 실행
      if (!someCheck) {
        state.push(action.payload);
      } else {
        alert("이미있는 상품입니다.");
      }
    },

    toggleCheckbox(state, action) {
      state.forEach((item) => {
        if (item.id === action.payload) {
          item.checked = !item.checked;
        }
      });
    },
    toggleCheckboxAll(state, action) {
      const isChecked = action.payload;
      state.forEach((item) => {
        item.checked = isChecked;
      });
    },

    deleteChecked(state) {
      return state.filter((item) => !item.checked);
    },

    // add: (state, action) => {
    //   const comment = state.comment.find((item) =>{
    //     item.id === action.payload.id
    //   })
    //   nextId++;
    //   state.push({
    //     id: nextId,
    //     pid: action.payload.pid, // pid하나만선택
    //     name: action.payload.name,
    //     text: action.payload.text, // text하나만 선택
    //   });
    //   console.log(nextId);
    //   console.log(comment)
    // },
  },
});

export const {
  shopaddCount,
  shopminuseCount,
  shopdelete,
  shopcartAdd,
  shoptextAdd,
  toggleCheckbox,
  deleteChecked,
  toggleCheckboxAll,
  shopAlldelete,
} = mainSlice.actions;

export default mainSlice.reducer;
