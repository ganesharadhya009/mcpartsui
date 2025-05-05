import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../modules/login/components/Login";
import { GlobalReduxProvider } from "../modules/global/components/reduxpersist/GlobalReduxProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../modules/global/styles/theme";
import "@testing-library/jest-dom";
import ApplicationInsightsProvider from "../modules/global/components/azureinsight/ApplicationInsightsProvider";
import { ToastContainer } from "react-toastify";
import GlobalQueryProvider from "../modules/global/components/querycomponents/GlobalQueryProvider";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
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
jest.mock("../modules/login/services/loginApi.tsx", () => ({
  loginServiceApi: jest.fn(() =>
    Promise.resolve({
      status: "success",
      access_token: "mock-token",
    })
  ),
}));

describe("LoginPage", () => {
  it("redirects to dashboard after successful login", async () => {
    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalReduxProvider>
          <ApplicationInsightsProvider>
            <ToastContainer />
            <GlobalQueryProvider>
              <GlobalErrorBoundary>
                <QueryErrorResetBoundary>
                  <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/dashboard" element={<div>Dashboard</div>} />
                    </Routes>
                  </MemoryRouter>
                </QueryErrorResetBoundary>
              </GlobalErrorBoundary>
            </GlobalQueryProvider>
          </ApplicationInsightsProvider>
        </GlobalReduxProvider>
      </ThemeProvider>
    );

    // Simulate user input
    fireEvent.change(
      screen.getByPlaceholderText("Enter your email or mobile"),
      { target: { value: "test@example.com" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "Password@123" },
    });

    // Click on login button
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the mutation to resolve and navigation to occur
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });
});
