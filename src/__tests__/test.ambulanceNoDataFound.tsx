import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GlobalReduxProvider } from "../modules/global/components/reduxpersist/GlobalReduxProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../modules/global/styles/theme";
import "@testing-library/jest-dom";
import ApplicationInsightsProvider from "../modules/global/components/azureinsight/ApplicationInsightsProvider";
import { ToastContainer } from "react-toastify";
import GlobalQueryProvider from "../modules/global/components/querycomponents/GlobalQueryProvider";
import AxiosInterceptorLayer from "../modules/global/components/api/AxiosInterceptorLayer";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import AmbulanceNoDataFound from "../modules/infrastructure/components/ambulance/AmbulanceNoDataFound";
import GlobalErrorBoundary from "../modules/global/components/error/GlobalErrorBoundary";

// Mock environment variables
process.env.VITE_AI_INSTRUMENTATION_KEY = "mock-instrumentation-key";

// Mock the Application Insights module
jest.mock("@microsoft/applicationinsights-web", () => ({
  ApplicationInsights: jest.fn().mockImplementation(() => ({
    loadAppInsights: jest.fn(),
  })),
}));

describe("AmbulanceNoDataFound", () => {
  it("page rendering", async () => {
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
                    <MemoryRouter initialEntries={["/"]}>
                      <Routes>
                        <Route path="/" element={<AmbulanceNoDataFound />} />
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

    expect(
      /You have not added any Ambulances yet. Click below to add Ambulance./
    );
  });

  it("redirection to add ambulance page", async () => {
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
                    <MemoryRouter initialEntries={["/"]}>
                      <Routes>
                        <Route path="/" element={<AmbulanceNoDataFound />} />
                        <Route
                          path="/infrastructure/ambulance/add-ambulance"
                          element={<p>Add Ambulance Page</p>}
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

    fireEvent.click(screen.getByText(/Add Ambulance/));

    expect(/Add Ambulance Page/);
  });
});
