import apiUrlConstants from "../../global/constants/apiUrlConstants";
import { axiosInstance } from "../../global/services/gateway/axiosInstance";
import { Inputs } from "../types";

export const loginServiceApi = async (data: Inputs) => {
  const response = await axiosInstance.post(
    apiUrlConstants.LOGIN_API_URL,
    data
  );

  return response.data;
};
