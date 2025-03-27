import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import chatBoxReducer from "./chatbox/chatBoxSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatbox: chatBoxReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
