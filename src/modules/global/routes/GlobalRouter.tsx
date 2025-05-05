import { Routes, Route } from "react-router-dom"; // Importing routing components from react-router-dom
import PublicRoutes from "./PublicRoutes"; // Component to handle public routes
import { routeNames } from "../constants/routesConstants"; // Constants for route names
import PrivateRoute from "./PrivateRoute"; // Component to handle private routes
import LoginPage from "../../login/components/Login"; // Importing the login page component
import { Button } from "@mui/material"; // Importing Button component from Material UI
import { useDispatch } from "react-redux"; // Hook to access the Redux dispatch function
import { logout } from "../redux/login/loginSlice"; // Action to handle logout
import ForgotPasswordPage from "../../login/components/ForgotPasswordPage";
import SuccessPopup from "../../login/components/SuccessPopup";
import ForgotPasswordErrorPopup from "../../login/components/ForgotPasswordErrorPopup";
import ProfileResetPassword from "../../login/components/ProfileResetPassword";
import SetNewPasswordPage from "../../login/components/SetNewPassword";
import SetPasswordRoute from "./SetPasswordRoute";
import AmbulanceNoDataFound from "../../infrastructure/components/ambulance/AmbulanceNoDataFound";
import AddAmbulance from "../../infrastructure/components/ambulance/AddAmbulance";
import Breadcrumb from "../../common/components/Breadcrumbs";
import { Suspense } from "react";
import LoadingFullScreen from "../../common/components/LoadingFullScreen";
import AddEquipment from "../../infrastructure/components/equipments/AddEquipment";
import EquipmentListPage from "../../infrastructure/components/equipments/EquipmentListPage";
import CustomerList from "../../customer/components/customerList";
import AddCustomer from "../../customer/components/addCustomer";
import MaterialMaster from "../../master/materials/materialList"

/**
 * GlobalRouter Component
 *
 * This component defines the routing for the application, utilizing React Router for navigation.
 * It contains both public and private routes based on the authentication state.
 *
 * - Public Routes: Accessible to all users (e.g., LoginPage).
 * - Private Routes: Accessible only to authenticated users (e.g., the base route with logout functionality).
 *
 * @returns {JSX.Element} The rendered routes.
 */
const GlobalRouter = () => {
  const dispatch = useDispatch();

  // Logout handler function
  const onclick = () => {
    dispatch(logout());
  };

  return (
    <Routes>
      {/* Public routes wrapped in PublicRoutes component */}
      <Route element={<PublicRoutes />}>
        <Route path={routeNames.login} element={<LoginPage />} />
        <Route
          path={routeNames.forgotPassword}
          element={<ForgotPasswordPage />}
        />{" "}
        <Route
          path={routeNames.forgotPasswordSuccess}
          element={<SuccessPopup />}
        />{" "}
        <Route
          path={routeNames.forgotPasswordError}
          element={<ForgotPasswordErrorPopup />}
        />{" "}
        <Route
          path={routeNames.resetPassword}
          element={<SetNewPasswordPage />}
        />{" "}
        <Route
          path={routeNames.passwordUpdateSuccess}
          element={<SuccessPopup enableLogin={true} />}
        />{" "}
        {/* Login page route */}
      </Route>
      <Route element={<SetPasswordRoute />}>
        <Route
          path={routeNames.setNewPassword}
          element={<SetNewPasswordPage />}
        />{" "}
        <Route
          path={routeNames.setPasswordSuccess}
          element={<SuccessPopup enableLogin={true} />}
        />{" "}
      </Route>
      {/* Private routes wrapped in PrivateRoute component */}
      <Route element={<PrivateRoute />}>
        <Route path={"*"} element={<Breadcrumb />} />
        <Route
          path={routeNames.profileResetPassword}
          element={<ProfileResetPassword />}
        />
        <Route
          path={routeNames.ambulanceNoDataFound}
          element={<AmbulanceNoDataFound />}
        />
        <Route
          path={routeNames.addAmbulancePage}
          element={
            <Suspense fallback={<LoadingFullScreen />}>
              <AddAmbulance />
            </Suspense>
          }
        />
        <Route
          path={routeNames.addEquipment}
          element={
            <Suspense fallback={<LoadingFullScreen />}>
              <AddEquipment />
            </Suspense>
          }
        />
         <Route
          path={routeNames.customerList}
          element={
            <Suspense fallback={<LoadingFullScreen />}>
                <CustomerList/>
            </Suspense>
          }
        />
         <Route
          path={routeNames.addCustomer}
          element={
            <Suspense fallback={<LoadingFullScreen />}>
               <AddCustomer/> 
            </Suspense>
          }
        />
         <Route
          path={routeNames.materialList}
          element={
            <Suspense fallback={<LoadingFullScreen />}>
               <MaterialMaster/> 
            </Suspense>
          }
        />
        <Route
          path={routeNames.dashboard}
          element={
            <Button variant="contained" onClick={onclick}>
              Logout
            </Button>
          }
        />
        <Route path={routeNames.equipment} element={<EquipmentListPage/>} />
      </Route>
    </Routes>
  );
};

export default GlobalRouter;
