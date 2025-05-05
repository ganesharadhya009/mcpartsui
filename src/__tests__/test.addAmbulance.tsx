import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GlobalReduxProvider } from "../modules/global/components/reduxpersist/GlobalReduxProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../modules/global/styles/theme";
import "@testing-library/jest-dom";
import ApplicationInsightsProvider from "../modules/global/components/azureinsight/ApplicationInsightsProvider";
import { ToastContainer } from "react-toastify";
import GlobalQueryProvider from "../modules/global/components/querycomponents/GlobalQueryProvider";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import GlobalErrorBoundary from "../modules/global/components/error/GlobalErrorBoundary";
import AddAmbulance from "../modules/infrastructure/components/ambulance/AddAmbulance";
import { routeNames } from "../modules/global/constants/routesConstants";
import { Suspense } from "react";
import LoadingFullScreen from "../modules/common/components/LoadingFullScreen";
import SidebarProvider from "../modules/global/context/SideBarContext";

// Mock environment variables
process.env.VITE_AI_INSTRUMENTATION_KEY = "mock-instrumentation-key";

// Mock the Application Insights module
jest.mock("@microsoft/applicationinsights-web", () => ({
  ApplicationInsights: jest.fn().mockImplementation(() => ({
    loadAppInsights: jest.fn(),
  })),
}));

// Mock the API call
jest.mock("../modules/infrastructure/services/ambulanceServices.ts", () => ({
  addAmbulanceApiService: jest.fn(() =>
    Promise.resolve({
      status: "success",
    })
  ),
  getAmbulanceOwnershipCheckBoxData: jest.fn(() =>
    Promise.resolve([
      { label: "Own", value: "own" },
      { label: "Outsourced", value: "outsourced" },
    ])
  ),
  getFacilityApiService: jest.fn(() =>
    Promise.resolve([
      { label: "Duty Doctor", value: "dutyDoctor" },
      { label: "Oxygen", value: "oxygen" },
      { label: "Ventilator", value: "ventilator" },
      { label: "Nurse", value: "nurse" },
    ])
  ),
}));

describe("Add Ambulance", () => {
  it("redirects to ambulance landing page after successfully adding ambulance", async () => {
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
                      <Route
                        path="/"
                        element={
                          <SidebarProvider>
                            <Suspense fallback={<LoadingFullScreen />}>
                              <AddAmbulance />
                            </Suspense>
                          </SidebarProvider>
                        }
                      />
                      <Route
                        path={routeNames.ambulance}
                        element={<div>Ambulance Landing Page</div>}
                      />
                    </Routes>
                  </MemoryRouter>
                </QueryErrorResetBoundary>
              </GlobalErrorBoundary>
            </GlobalQueryProvider>
          </ApplicationInsightsProvider>
        </GlobalReduxProvider>
      </ThemeProvider>
    );

    // Wait for the form inputs to load before interacting with them
    await waitFor(() => screen.getByPlaceholderText("Enter Vehicle Number"));
    await waitFor(() => screen.getByLabelText("Outsourced"));
    await waitFor(() => screen.getByLabelText("Name"));
    await waitFor(() => screen.getByLabelText("Mobile Number"));
    await waitFor(() => screen.getByLabelText("Facilities"));

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Enter Vehicle Number"), {
      target: { value: "KL10B232" },
    });

    const ownershipCheckbox = screen.getByLabelText("Outsourced");
    fireEvent.click(ownershipCheckbox);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Amarnath" },
    });

    fireEvent.change(screen.getByLabelText("Mobile Number"), {
      target: { value: 9562532222 },
    });

    const facilitiesSelect = screen.getByLabelText("Facilities");
    fireEvent.mouseDown(facilitiesSelect);

    // Select a facility (e.g., "Duty Doctor")
    const dutyDoctorOption = screen.getByText("Duty Doctor");
    fireEvent.click(dutyDoctorOption);

    fireEvent.keyDown(facilitiesSelect, { key: "Escape", code: "Escape" });

    // Click on submit button
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Wait for the mutation to resolve and check if the page is redirected
    await waitFor(() => {
      expect(screen.getByText(/Ambulance Landing Page/i)).toBeInTheDocument();
    });
  });
});
