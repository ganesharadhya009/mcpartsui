import { ReactNode, useEffect } from "react";
import { axiosInstance } from "../../services/gateway/axiosInstance";
import apiConstants from "../../constants/apiConstants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import globalConstant from "../../constants/globalConstants";
import errorToast from "../../utils/ErrorToast";
import { logout } from "../../redux/login/loginSlice";
import { useErrorBoundary } from "react-error-boundary";

/**
 * @typedef AxiosInterceptorLayerPropType
 * @property {ReactNode} children - The child components to be wrapped within the AxiosInterceptorLayer.
 */
type AxiosInterceptorLayerPropType = {
  children: ReactNode;
};

/**
 * AxiosInterceptorLayer is a component that sets up Axios request and response interceptors
 * for handling API requests and responses. It ensures the correct Content-Type headers are set,
 * includes the authorization token in requests, and manages error handling for certain statuses like 401 and 500.
 *
 * @param {AxiosInterceptorLayerPropType} props - The properties containing the child components.
 * @returns {ReactNode} The children components wrapped within the Axios interceptor logic.
 */
const AxiosInterceptorLayer = ({ children }: AxiosInterceptorLayerPropType) => {
  // Extract token from Redux store
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  /**
   * Sets up Axios request and response interceptors.
   * - Request interceptor: Adds headers like `Content-Type` and `Authorization`.
   * - Response interceptor: Handles specific error statuses like 401 (unauthorized) and 500 (server error).
   */
  useEffect(() => {
    /**
     * Request interceptor:
     * - Sets the appropriate Content-Type header based on the request data.
     * - Attaches an Authorization header with a Bearer token if the token exists.
     */
    const requestInterceptor = axiosInstance.interceptors.request.use(
      function (config) {
        const { data } = config;
        // Set the Content-Type header based on the data type
        if (typeof data == apiConstants.API_REQUEST_CONTENT_TYPE) {
          config.headers[apiConstants.CONTENT_TYPE] =
            apiConstants.CONTENT_TYPE_TEXT_PLAIN;
        } else if (data instanceof FormData) {
          config.headers[apiConstants.CONTENT_TYPE] =
            apiConstants.CONTENT_TYPE_MULTI_PART_FORM_DATA;
        } else {
          config.headers[apiConstants.CONTENT_TYPE] =
            apiConstants.CONTENT_TYPE_APPLICATION_JSON;
        }

        if (token) {
          //config.headers.Authorization = `Bearer ${token}`;
        } else {
          config.headers.Authorization = null;
        }

        return config;
      },
      function (error) {
        // Handle request errors
        return Promise.reject(error);
      }
    );

    /**
     * Response interceptor:
     * - Handles 401 Unauthorized errors.
     * - Handles 500 Internal Server Error and triggers custom error handling or logging.
     */
    const responseInterceptor = axiosInstance.interceptors.response.use(
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
          dispatch(logout());
          errorToast({ message: globalConstant.UNAUTHORIZED_ACCESS });
          showBoundary(error);
        }

        if (
          error?.response?.status ===
          globalConstant.HTTP_INTERNAL_SERVER_ERROR_STATUS_CODE
        ) {
          // Handle 401 Unauthorized error (e.g., force logout or refresh token) and will be tracked from Error Boundary to Azure insights
          showBoundary(error);
        }
        // Handle other response errors
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component unmounts
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, showBoundary, token]); // Re-run effect when the token changes

  // Render child components
  return children;
};

export default AxiosInterceptorLayer;
