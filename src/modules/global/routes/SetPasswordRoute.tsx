import { Navigate, Outlet } from "react-router-dom";
import { routeNames } from "../constants/routesConstants";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PublicLayoutWrapper from "../../login/layout/PublicLayoutWrapper";

/**
 * PublicRoutes Component
 *
 * This component manages the routing for public pages in the application. It ensures that only users
 * who are not authenticated can access certain routes (e.g., the login page). If an authenticated user
 * attempts to access a public route, they will be redirected to the base route.
 *
 * Functionality:
 * - Uses the `useSelector` hook from Redux to access the authentication state (`isLoggedIn`) from the Redux store.
 * - If the user is not logged in (`isLoggedIn` is false), it renders the children components wrapped in
 *   the `PublicLayoutWrapper` for consistent layout styling.
 * - If the user is logged in, it redirects them to the base route using the `Navigate` component.
 *
 * @returns {JSX.Element} The rendered children if not authenticated, or a redirection to the base route if authenticated.
 */
const SetPasswordRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth); // Selecting the login state from Redux

  return isLoggedIn ? (
    <>
      <PublicLayoutWrapper>
        {/* Wrapper for public layout styling */}
        <Outlet /> {/* Render child routes if not authenticated */}
      </PublicLayoutWrapper>
    </>
  ) : (
    <>
      <Navigate to={routeNames.base} />{" "}
      {/* Redirect to base if authenticated */}
    </>
  );
};

export default SetPasswordRoute;
