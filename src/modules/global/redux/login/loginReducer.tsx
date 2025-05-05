import {
  LoginActionType,
  LoginStateType,
  SetUserActionType,
} from "../../types/globalTypes";

/**
 * Returns the login and logout with updated state reducers
 * @param state is the value of the component property and variable
 * @param action returns the action need to be taken with the payload
 */

export const loginReducer = (
  state: LoginStateType,
  action: LoginActionType
) => {
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

export const logoutReducer = (state: LoginStateType) => {
  state.token = null;
  state.isLoggedIn = false;
  state.userData = null;
};

export const setUserDataReducer = (
  state: LoginStateType,
  action: SetUserActionType
) => {
  state.userData = action.payload.userData;
};
