import axios from "axios";
import apiConstants from "../../constants/apiConstants";
import { store } from "../../redux/store";
import globalConstant from "../../constants/globalConstants";
import errorToast from "../../utils/ErrorToast";
import { logout } from "../../redux/login/loginSlice";

const baseURL = process.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL,
  timeout: apiConstants.API_TIMEOUT_IN_MILLI_SECS,
  withCredentials: false,
});

const setInterceptors = () => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    function (config) {
      let token = null;
      const rootState = "true"; //localStorage?.getItem("persist:root") as string;
      if (rootState) {
        if (JSON.parse(rootState)?.login) {
          //token = JSON.parse(JSON.parse(rootState)?.auth)?.token; // Retrieve token from localstorage
        }
      }
      const { data } = config;

      const state = store.getState();

      // Set the Content-Type header based on the data type
      if (typeof data === apiConstants.API_REQUEST_CONTENT_TYPE) {
        config.headers[apiConstants.CONTENT_TYPE] =
          apiConstants.CONTENT_TYPE_TEXT_PLAIN;
      } else if (data instanceof FormData) {
        config.headers[apiConstants.CONTENT_TYPE] =
          apiConstants.CONTENT_TYPE_MULTI_PART_FORM_DATA;
      } else {
        config.headers[apiConstants.CONTENT_TYPE] =
          apiConstants.CONTENT_TYPE_APPLICATION_JSON;
      }

      // Add Authorization header if the token is available
      if (token || state.auth.token) {
        config.headers.Authorization = `Bearer ${
          token ? token : state.auth.token
        }`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      // Return the successful response
      return response;
    },
    function (error) {
      if (
        error?.response?.status ===
        globalConstant.HTTP_UNAUTHORIZED_ERROR_STATUS_CODE
      ) {
        // Handle 401 Unauthorized error (e.g., force logout or refresh token) and will be tracked from Error Boundary to Azure insights
        store.dispatch(logout());
        errorToast({ message: globalConstant.UNAUTHORIZED_ACCESS });
      }

      return Promise.reject(error);
    }
  );
};

setInterceptors();
