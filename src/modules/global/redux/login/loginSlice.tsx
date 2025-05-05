import { createSlice } from "@reduxjs/toolkit";
import {
  loginReducer,
  logoutReducer,
  setUserDataReducer,
} from "./loginReducer";
import { LoginStateType } from "../../types/globalTypes";
import GlobalConstant from "../../constants/globalConstants";

/**
 * Login slice returns the initial state, login and logout reducer state when it is dispatched
 */

const initialState: LoginStateType = {
  token: null,
  isLoggedIn: false,
  userData: null,
};

export type RootState = {
  auth: LoginStateType;
};

export const loginSlice = createSlice({
  name: GlobalConstant.LOGIN,
  initialState,
  reducers: {
    login: loginReducer,
    logout: logoutReducer,
    setUserData: setUserDataReducer,
  },
});

export const { login, logout, setUserData } = loginSlice.actions;
export default loginSlice.reducer;
