import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";

// Create browser history for tracking route changes
const browserHistory = createBrowserHistory();

// Create an instance of the React Plugin for Application Insights
const reactPlugin = new ReactPlugin();

/**
 * Configuration object for Application Insights
 *
 * @property {string} instrumentationKey - The instrumentation key for your Application Insights resource.
 * @property {Array} extensions - Array of extensions to be used by Application Insights. In this case, the React Plugin.
 * @property {Object} extensionConfig - Configuration specific to each extension.
 * @property {Object} [reactPlugin.identifier] - Configuration for the React Plugin, providing the browser history for route tracking.
 * @property {boolean} enableAutoRouteTracking - Enables automatic route tracking.
 * @property {boolean} disableExceptionTracking - Disables automatic exception tracking if set to true.
 * @property {boolean} disableFetchTracking - Disables automatic fetch requests tracking if set to true.
 * @property {boolean} disableAjaxTracking - Disables automatic  ajax requests tracking if set to true.
 */

const appInsightsConfig = {
  instrumentationKey: process.env.VITE_AI_INSTRUMENTATION_KEY,
  extensions: [reactPlugin],
  extensionConfig: {
    [reactPlugin.identifier]: { history: browserHistory },
  },
  enableAutoRouteTracking: Boolean(process.env.VITE_AI_AUTO_ROUTE_TRACKING),
  disableExceptionTracking: Boolean(
    process.env.VITE_AI_DISABLE_AUTO_EXCEPTION_TRACKING
  ),
  disableFetchTracking: Boolean(process.env.VITE_AI_DISABLE_FETCH_TRACKING),
  disableAjaxTracking: Boolean(process.env.VITE_AI_DISABLE_AJAX_TRACKING),
};

/**
 * Initialize an instance of Application Insights with the provided configuration.
 * This instance is responsible for collecting telemetry data, including page views, custom events, and exceptions.
 */
const appInsights = new ApplicationInsights({
  config: appInsightsConfig,
});

// Load the Application Insights instance to start collecting telemetry data
appInsights.loadAppInsights();

// Export the appInsights instance and reactPlugin for use in other parts of the application
export { appInsights, reactPlugin };
