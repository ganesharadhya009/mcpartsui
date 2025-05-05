import { ReactNode } from "react";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "../../services/AzureInsightService";

/**
 * ApplicationInsightsProvider Component
 *
 * This component provides the Application Insights React Plugin context to its children,
 * enabling telemetry tracking (e.g., page views, user actions) within React components.
 *
 * @param {ReactNode} children - The child components that will have access to the Application Insights context.
 *
 * @returns {JSX.Element} A context provider that wraps the children and passes down the Application Insights React Plugin instance.
 */
const ApplicationInsightsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
};

export default ApplicationInsightsProvider;
