import apiUrlConstants from "../../global/constants/apiUrlConstants";
import { axiosInstance } from "../../global/services/gateway/axiosInstance";

/**
 * getUserDataApiService
 * This function sends a GET request to the server to fetch user data.
 *
 * @returns {Promise<any>} - Returns a promise that resolves to the response data containing the user information.
 *
 * The request is sent using the axiosInstance to the GET_USER_DATA_URL defined in the apiUrlConstants.
 */

export const getUserDataApiService = async () => {
  const response = await axiosInstance.get(apiUrlConstants.GET_USER_DATA_URL);

  return response.data;
};
