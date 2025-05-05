import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "../modules/login/components/ForgotPasswordPage";
import { GlobalReduxProvider } from "../modules/global/components/reduxpersist/GlobalReduxProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../modules/global/styles/theme";
import "@testing-library/jest-dom";
import ApplicationInsightsProvider from "../modules/global/components/azureinsight/ApplicationInsightsProvider";
import { ToastContainer } from "react-toastify";
import GlobalQueryProvider from "../modules/global/components/querycomponents/GlobalQueryProvider";
import AxiosInterceptorLayer from "../modules/global/components/api/AxiosInterceptorLayer";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ForgotPasswordSuccessPopup from "../modules/login/components/SuccessPopup";
import ForgotPasswordErrorPopup from "../modules/login/components/ForgotPasswordErrorPopup";
import GlobalErrorBoundary from "../modules/global/components/error/GlobalErrorBoundary";

// Mock environment variables
process.env.VITE_AI_INSTRUMENTATION_KEY = "mock-instrumentation-key";

// Mock the Application Insights module
jest.mock("@microsoft/applicationinsights-web", () => ({
  ApplicationInsights: jest.fn().mockImplementation(() => ({
    loadAppInsights: jest.fn(),
  })),
}));

// Mock the API call
jest.mock("../modules/login/services/forgotPasswordApi.tsx", () => ({
  forgotPasswordAPi: jest.fn(({ email }) => {
    if (email == "rajeev@jeev.ai") {
      return Promise.resolve({
        code: 200,
        message: "mail sent successfully",
      });
    } else {
      return Promise.reject({
        response: {
          data: {
            code: 401,
          },
        },
      });
    }
  }),
}));

describe("ForgotPasswordPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to success popup message", async () => {
    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalReduxProvider>
          <ApplicationInsightsProvider>
            <ToastContainer />
            <GlobalQueryProvider>
              <GlobalErrorBoundary>
                <AxiosInterceptorLayer>
                  <QueryErrorResetBoundary>
                    <MemoryRouter initialEntries={["/forgot-password"]}>
                      <Routes>
                        <Route
                          path="/forgot-password"
                          element={<ForgotPasswordPage />}
                        />
                        <Route
                          path="/forgot-password/popup"
                          element={<ForgotPasswordSuccessPopup />}
                        />
                      </Routes>
                    </MemoryRouter>
                  </QueryErrorResetBoundary>
                </AxiosInterceptorLayer>
              </GlobalErrorBoundary>
            </GlobalQueryProvider>
          </ApplicationInsightsProvider>
        </GlobalReduxProvider>
      </ThemeProvider>
    );

    // Simulate user input
    // fireEvent.click(screen.getByRole('link', { name: 'Forgot Password?' }));
    fireEvent.change(
      screen.getByPlaceholderText("Enter your email or mobile"),
      { target: { value: "rajeev@jeev.ai" } }
    );

    // Click on reset button
    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    // Wait for the mutation to resolve and navigation to occur
    await waitFor(() => {
      expect(
        screen.getByText("The link has been shared to your registered mail ID")
      ).toBeInTheDocument();
    });
  });

  it("redirects to unauthorized user popup message", async () => {
    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalReduxProvider>
          <ApplicationInsightsProvider>
            <ToastContainer />
            <GlobalQueryProvider>
              <GlobalErrorBoundary>
                <AxiosInterceptorLayer>
                  <QueryErrorResetBoundary>
                    <MemoryRouter initialEntries={["/forgot-password"]}>
                      <Routes>
                        <Route
                          path="/forgot-password"
                          element={<ForgotPasswordPage />}
                        />
                        <Route
                          path="/forgot-password/access"
                          element={<ForgotPasswordErrorPopup />}
                        />
                      </Routes>
                    </MemoryRouter>
                  </QueryErrorResetBoundary>
                </AxiosInterceptorLayer>
              </GlobalErrorBoundary>
            </GlobalQueryProvider>
          </ApplicationInsightsProvider>
        </GlobalReduxProvider>
      </ThemeProvider>
    );

    // Simulate user input
    // fireEvent.click(screen.getByText("Forgot Password?"));
    fireEvent.change(
      screen.getByPlaceholderText("Enter your email or mobile"),
      { target: { value: "rajeev@gmail.com" } }
    );

    // Click on reset button
    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    // Wait for the mutation to resolve and navigation to occur
    await waitFor(() => {
      expect(
        screen.getByText(
          "Kindly contact the Management to receive the temporary password to Login"
        )
      ).toBeInTheDocument();
    });
  });
});
