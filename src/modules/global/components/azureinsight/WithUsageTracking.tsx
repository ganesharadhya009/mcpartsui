import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "../../services/AzureInsightService";
import globalConstant from "../../constants/globalConstants";

/**
 * Type definition for the props of the component wrapped by the HOC.
 *
 * @typedef {Object} WithUsageTrackingProps
 * @property {unknown} [key] - Any additional props that might be passed to the wrapped component.
 */
type WithUsageTrackingProps = {
  [key: string]: unknown; // You can refine this type based on your props
};

/**
 * Higher-Order Component (HOC) to enable Application Insights usage tracking for a React component.
 *
 * This HOC wraps the provided component and tracks telemetry data such as page views and interactions
 * using the Application Insights React Plugin. It can also provide a custom component name for better tracking.
 *
 * @template P
 * @param {React.FC<P>} Component - The component to be wrapped and tracked.
 * @param {string} [componentName='Component'] - An optional custom name for the component, useful for distinguishing telemetry data.
 *
 * @returns {React.FC<P>} - The wrapped component with usage tracking.
 */
const withUsageTracking = <P extends WithUsageTrackingProps>(
  Component: React.FC<P>,
  componentName: string = globalConstant.COMPONENT
) => {
  return withAITracking(reactPlugin, Component, componentName);
};

export default withUsageTracking;
