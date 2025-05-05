import apiUrlConstants from "../../global/constants/apiUrlConstants";
import { axiosInstance } from "../../global/services/gateway/axiosInstance";
import { ResetPasswordType } from "../types";

/**
 * resetPasswordApiService
 * This function sends a POST request to the server for resetting the user's password.
 *
 * @param {ResetPasswordType} data - Object containing the user's old password, new password, and email address.
 * @returns {Promise<any>} - Returns a promise that resolves to the response data from the API.
 *
 * The request is sent using the axiosInstance to the CHANGE_PASSWORD_API_URL defined in the apiUrlConstants.
 */
export const resetPasswordApiService = async (data: ResetPasswordType) => {
  const response = await axiosInstance.post(
    apiUrlConstants.CHANGE_PASSWORD_API_URL,
    {
      oldPassword: data.password,
      newPassword: data.newPassword,
      email: data.email,
    }
  );

  return response.data;
};
