import apiUrlConstants from "../../global/constants/apiUrlConstants";
import { axiosInstance } from "../../global/services/gateway/axiosInstance";
import { EmailType } from "../types";

export const forgotPasswordAPi = async (data: EmailType) => {
  const response = await axiosInstance.post(
    apiUrlConstants.FORGOT_PASSWORD_URL,
    data
  );

  return response.data;
};
