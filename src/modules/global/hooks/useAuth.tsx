import { useEffect } from "react";
import { setUserData } from "../redux/login/loginSlice";
import globalConstant from "../constants/globalConstants";
import { getUserDataApiService } from "../../login/services/getUserDataApiService";
import { useMutation } from "@tanstack/react-query";
import { UserDataType } from "../types/globalTypes";
import { ApiErrorResponse } from "../../login/types";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../constants/routesConstants";

/**
 * Custom hook to manage user authentication data.
 * It fetches user data when the token is available and the user data is not already present in the state.
 * Utilizes React Query for API calls and Redux for state management.
 *
 * @returns {Object} An object containing:
 * - isPending: A boolean indicating whether the data fetching is in progress.
 */
const useAuth = () => {
  const { token, userData } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appInsights = useAppInsightsContext();

  const { isPending, mutate } = useMutation<UserDataType, ApiErrorResponse>({
    mutationFn: () => getUserDataApiService(),
    onError: (error) => {
      appInsights.trackEvent({
        name: globalConstant.AI_GET_USER_DATA_IDENTIFIER,
        properties: error,
      });
    },
    onSuccess: (response) => {
      dispatch(setUserData({ userData: response }));
      if (response.isFirstTimeLogin) {
        navigate(routeNames.setNewPassword);
      }
    },
  });

  useEffect(() => {
    // Fetch user data if it doesn't exist and token is available
    if (!userData && token) {
      mutate();
    }
  }, [mutate, token, userData]);

  return { isPending };
};

export default useAuth;
