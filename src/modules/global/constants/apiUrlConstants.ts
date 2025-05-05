/**
 * apiUrlConstants
 *
 * This object contains the API endpoint URLs used in the application.
 * It centralizes the API URLs, making it easier to manage and update them
 * in one place. This approach enhances maintainability and reduces
 * the risk of errors due to hardcoded strings scattered throughout the codebase.
 *
 * @constant {Object} apiUrlConstants
 * @property {string} LOGIN_API_URL - The API endpoint for user login.
 * @property {string} CHANGE_PASSWORD_API_URL - The API endpoint for changing a user's password.
 * @property {string} GET_USER_DATA_URL - The API endpoint for retrieving user data.
 */

// NB : Update the above documentation with the API url when added new paths

const apiUrlConstants = {
  LOGIN_API_URL: "/account/login",
  FORGOT_PASSWORD_URL: "account/ForgotPassword/",
  CHANGE_PASSWORD_API_URL: "/account/ChangePassword",
  GET_USER_DATA_URL: "/account/GetUser",
  RESET_PASSWORD_URL: "/account/ResetPassword",
  SET_NEW_PASSWORD_URL: "/account/SetPassword",
  GET_AMBULANCE_FACILITY_URL:
    "/Infrastructure/AmbulanceFacility/HospitalAmbulanceFacility",
  GET_OWNERSHIP_URL: "/Infrastructure/Ambulance/HospitalAmbulance/OwnerShip",
  ADD_AMBULANCE_URL: "/Infrastructure/Ambulance/HospitalAmbulance",
};

export default apiUrlConstants;
