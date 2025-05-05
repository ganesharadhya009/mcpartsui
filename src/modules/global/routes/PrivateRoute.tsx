import { Navigate, Outlet } from "react-router-dom";
import { routeNames } from "../constants/routesConstants";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PrivateLayout from "../layout/PrivateLayout";
import LoadingFullScreen from "../../common/components/LoadingFullScreen";
import useAuth from "../hooks/useAuth";

/**
 * PrivateRoute Component
 *
 * This component serves as a guard for private routes, ensuring that only authenticated users can access
 * specific parts of the application. If a user is not logged in, they will be redirected to the login page.
 *
 * Functionality:
 * - It uses the `useSelector` hook from Redux to access the authentication state (`isLoggedIn`) from the Redux store.
 * - If the user is authenticated (`isLoggedIn` is true), the component renders its children using the `Outlet` component.
 * - If the user is not authenticated, it redirects them to the login page using the `Navigate` component.
 *
 * @returns {JSX.Element} The rendered children if authenticated, or a redirection to the login page if not.
 */
const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const { isPending } = useAuth();

  if (isPending) return <LoadingFullScreen />;

  return isLoggedIn ? (
    <>
      <PrivateLayout>
        <Outlet /> {/* Render child routes if authenticated */}
      </PrivateLayout>
    </>
  ) : (
    <>
      <Navigate to={routeNames.login} />{" "}
      {/* Redirect to login if not authenticated */}
    </>
  );
};

export default PrivateRoute;
