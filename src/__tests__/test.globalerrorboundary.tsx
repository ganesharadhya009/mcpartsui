import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReactErrorBoundary from "../modules/global/components/error/GlobalErrorBoundary";
import TestConstant from "../modules/global/constants/testConstants";
import { ErrorConsole } from "../modules/global/types/globalTypes";
import ApplicationInsightsProvider from "../modules/global/components/azureinsight/ApplicationInsightsProvider";

/**
 * Unit testing with jest for error boundaries implementation
 */

jest.mock("../modules/global/services/AzureInsightService", () => ({
  appInsights: {
    loadAppInsights: jest.fn(),
  },
}));

const ProblematicComponent: React.FC = () => {
  throw new Error(TestConstant.ERROR_MESSAGE);
};

describe(TestConstant.DESCRIPTION_ERROR, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(TestConstant.ERROR_BOUNDARY_TEST_1, () => {
    render(
      <ApplicationInsightsProvider>
        <ReactErrorBoundary>
          <div>{TestConstant.ALL_IS_WELL}</div>
        </ReactErrorBoundary>
      </ApplicationInsightsProvider>
    );
    expect(screen.getByText(TestConstant.ALL_IS_WELL)).toBeInTheDocument();
  });

  test(TestConstant.ERROR_BOUNDARY_TEST_2, () => {
    render(
      <ApplicationInsightsProvider>
        <ReactErrorBoundary>
          <ProblematicComponent />
        </ReactErrorBoundary>
      </ApplicationInsightsProvider>
    );
    expect(screen.getByText(TestConstant.ERROR_MESSAGE_GET_BY));
  });

  test(TestConstant.ERROR_BOUNDARY_TEST_3, () => {
    const consoleErrorSpy = jest
      .spyOn(console, TestConstant.ERROR as ErrorConsole)
      .mockImplementation(() => {});

    render(
      <ApplicationInsightsProvider>
        <ReactErrorBoundary>
          <ProblematicComponent />
        </ReactErrorBoundary>
      </ApplicationInsightsProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  test(TestConstant.ERROR_BOUNDARY_TEST_4, () => {
    const { unmount } = render(
      <ApplicationInsightsProvider>
        <ReactErrorBoundary>
          <ProblematicComponent />
        </ReactErrorBoundary>
      </ApplicationInsightsProvider>
    );
    unmount();
    expect(() => {
      render(<div>{TestConstant.NO_ERROR}</div>);
    }).not.toThrow();
  });
});
