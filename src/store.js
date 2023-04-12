import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "../src/redux/shop";
import mainReducer from "../src/redux/main";
import commentReducer from "./redux/comment";
import signupReducer from "./redux/singup";
import userReuducer from "./redux/user";
import reviewReducer from "./redux/review";

// redux-parsist
import storage from "redux-persist/lib/storage"; // 로컬 스토리지
import storageSession from "redux-persist/lib/storage/session"; // 세션 스토리지
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  players: playersReducer,
  main: mainReducer,
  comment: commentReducer,
  user: userReuducer,
  signup: signupReducer,
  review: reviewReducer,
});

const persistConfig = {
  key: "Root", // 체크박스기능하는데 오류날때마다 문자열 바꿔줘야 오류안생기고 로그인됨 원인 : ????
  // 로컬스토리지를 사용할것이기 때문에 storage를 적어주었다
  storage: storage,
  list: ["players", "main", "comment", "user", "signup", "review"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

// export default configureStore({
//   reducer: {
//     players: playersReducer,
//     main: mainReducer,
//     comment: commentReducer,
//     user: userReuducer,
//     signup: signupReducer,
//   },
// });
