import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getMyInfo } from "../../services/adminService";
export interface UserState {
  userInfo: any | null; // Use a specific type instead of 'any' if possible
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: UserState = {
  userInfo: null,
  isAuthenticated: false,
  loading: true,
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.loading = false; // Set loading to false after user info is fetched
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.loading = false; // Reset loading state when logged out
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("x-user-id");
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Manually control the loading state
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo, clearUserInfo, setLoading } = userSlice.actions;

export default userSlice.reducer;

export const initializeUser = () => async (dispatch) => {
  const user = await getMyInfo();
  if (user === null) dispatch(setLoading(false));
  else dispatch(setUserInfo(user));
};
