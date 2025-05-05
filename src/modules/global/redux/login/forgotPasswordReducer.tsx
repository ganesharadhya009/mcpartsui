import {
  ForgotPasswordAction,
  ForgotPasswordState,
} from "../../types/globalTypes";

/**
 * returns the forgotPasswordReducer
 * @param state is the value of the component property
 * @param action is the action payload
 */

export const forgotPasswordReducer = (
  state: ForgotPasswordState,
  action: ForgotPasswordAction
) => {
  state.email_auth = action.payload.email_auth;
};
