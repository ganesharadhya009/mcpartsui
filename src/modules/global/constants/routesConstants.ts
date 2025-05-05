/**
 * routeNames
 *
 * This object defines the route names used in the application.
 * Each key represents a specific route that can be used for navigation
 * within the app. This centralizes the route definitions, making it
 * easier to manage and update routes across the application.
 *
 * @constant {Object} routeNames
 * @property {string} login - The route for the login page.
 * @property {string} base - The base route of the application.
 * @property {string} dashboard - The route for the dashboard page.
 * @property {string} profileResetPassword - The route for the profile
 * reset password page.
 */



// NB : update the above documentation whenever adding new page routing

export const routeNames = {
  login: "/login",
  base: "/",
  forgotPassword: "/forgot-password",
  forgotPasswordSuccess: "/forgot-password/popup",
  forgotPasswordError: "/forgot-password/access",
  dashboard: "/dashboard",
  profileResetPassword: "profile/change-password",
  resetPassword: "/resetpassword",
  setNewPassword: "/set-password",
  passwordUpdateSuccess: "/update-success",
  setPasswordSuccess: "/setpassword-success",
  ambulanceNoDataFound: "/infrastructure/ambulance/no-data",
  ambulance: "/infrastructure/ambulance",
  addAmbulancePage: "/infrastructure/ambulance/add-ambulance",
  addEquipment: "/infrastructure/equipments/add-equipment",
  equipment : "/infrastructure/equipments",
  customerList : "/customer",
  addCustomer : "/customer/add-customer",
  materialList : "/master/material"
};
