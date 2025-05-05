import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import ErrorPage from "./ErrorPage";
import { ReactElement, ReactNode, ReactPortal } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SeverityLevel } from "@microsoft/applicationinsights-web";
import { AxiosError } from "axios";
import globalConstant from "../../constants/globalConstants";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/login/loginSlice";
import errorToast from "../../utils/ErrorToast";

/**
 * GlobalErrorBoundary Component
 *
 * This component provides a global error boundary for the application. If an error is thrown within
 * any of its child components, it catches the error, logs it using Application Insights, and renders a fallback UI.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components that will be wrapped by the error boundary.
 * These components will be monitored for errors.
 * @param {() => void} props.onReset - Callback function triggered when the error boundary is reset.
 *
 * @returns {JSX.Element} The error boundary component that wraps the children and provides a fallback UI.
 * If an error occurs, the fallback component (ErrorPage) will be displayed.
 */

const GlobalErrorBoundary = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<string>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
  onReset?: () => void;
}) => {
  // Get the Application Insights instance from context
  const appInsights = useAppInsightsContext();
  const dispatch = useDispatch();

  return (
    <ErrorBoundary
      // The component to render when an error is caught
      FallbackComponent={ErrorPage}
      // Callback to log the error using Application Insights
      onError={(error, errorInfo) => {
        if (error instanceof AxiosError) {
          if (
            error.status === globalConstant.HTTP_UNAUTHORIZED_ERROR_STATUS_CODE
          ) {
            dispatch(logout());
            errorToast({ message: globalConstant.UNAUTHORIZED_ACCESS });
          }
        }
        appInsights?.trackException({
          error: error,
          exception: error,
          severityLevel: SeverityLevel?.Error,
          properties: { ...errorInfo },
        });
      }}
      // Reset handler passed from props, called when the boundary is reset
      onReset={props.onReset}
    >
      {props.children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
