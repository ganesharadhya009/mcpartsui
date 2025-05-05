import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordReducer } from "./forgotPasswordReducer";
import { ForgotPasswordState } from "../../types/globalTypes";
import globalConstant from "../../constants/globalConstants";

/**
 * forgotPassword slice returns the initial state, login and logout reducer state when it is dispatched
 */

const initialState: ForgotPasswordState = {
  email_auth: false,
};

export const forgotPasswordSlice = createSlice({
  name: globalConstant.FORGOT_PASSWORD_SLICE,
  initialState,
  reducers: {
    forgotPassword: forgotPasswordReducer,
  },
});

export const { forgotPassword } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
