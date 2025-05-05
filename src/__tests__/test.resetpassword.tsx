import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import ProfileResetPassword from "../modules/login/components/ProfileResetPassword";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../modules/global/styles/theme";
import { GlobalReduxProvider } from "../modules/global/components/reduxpersist/GlobalReduxProvider";
import ApplicationInsightsProvider from "../modules/global/components/azureinsight/ApplicationInsightsProvider";
import { ToastContainer } from "react-toastify";
import GlobalQueryProvider from "../modules/global/components/querycomponents/GlobalQueryProvider";
import AxiosInterceptorLayer from "../modules/global/components/api/AxiosInterceptorLayer";
import SidebarProvider from "../modules/global/context/SideBarContext";
import GlobalErrorBoundary from "../modules/global/components/error/GlobalErrorBoundary";

// Mock environment variables
process.env.VITE_AI_INSTRUMENTATION_KEY = "mock-instrumentation-key";

// Mock the Application Insights module
jest.mock("@microsoft/applicationinsights-web", () => ({
  ApplicationInsights: jest.fn().mockImplementation(() => ({
    loadAppInsights: jest.fn(),
  })),
}));

// Mock the resetPasswordApiService
jest.mock("../modules/login/services/resetPasswordServiceApi", () => ({
  resetPasswordApiService: jest.fn(), // Define the mock directly inside jest.mock
}));

describe("ProfileResetPassword", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalReduxProvider>
          <ApplicationInsightsProvider>
            <ToastContainer />
            <GlobalQueryProvider>
              <GlobalErrorBoundary>
                <AxiosInterceptorLayer>
                  <SidebarProvider>
                    <MemoryRouter initialEntries={["/"]}>
                      <Routes>
                        <Route path="/" element={<ProfileResetPassword />} />
                        <Route
                          path="/dashboard"
                          element={<div>Dashboard</div>}
                        />
                      </Routes>
                    </MemoryRouter>
                  </SidebarProvider>
                </AxiosInterceptorLayer>
              </GlobalErrorBoundary>
            </GlobalQueryProvider>
          </ApplicationInsightsProvider>
        </GlobalReduxProvider>
      </ThemeProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows an error for new password less than required length", async () => {
    fireEvent.change(screen.getByLabelText(/current password/i), {
      target: { value: "oldPassword" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: "short" }, // Invalid password
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(
        screen.getByText(
          /New password must have at least one uppercase and one lowercase letter/i
        )
      ).toBeInTheDocument();
    });
  });
});
