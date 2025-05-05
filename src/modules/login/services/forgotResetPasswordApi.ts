import apiUrlConstants from "../../global/constants/apiUrlConstants";
import { axiosInstance } from "../../global/services/gateway/axiosInstance";
import { ResetPassword } from "../types";

export const forgotResetPasswordAPi = async (data: ResetPassword) => {
  const response = await axiosInstance.post(
    apiUrlConstants.RESET_PASSWORD_URL,
    data
  );

  return response.data;
};