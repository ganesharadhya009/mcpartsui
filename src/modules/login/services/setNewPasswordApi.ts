import apiUrlConstants from "../../global/constants/apiUrlConstants";
import { axiosInstance } from "../../global/services/gateway/axiosInstance";
import { ResetPassword, setNewPasswordType } from "../types";

export const setNewPasswordApi = async (data: setNewPasswordType | ResetPassword) => {
  const response = await axiosInstance.post(
    apiUrlConstants.SET_NEW_PASSWORD_URL,
    data
  );

  return response.data;
};