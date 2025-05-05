import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestComponent from "../modules/global/components/testcomponents/TestComponent";
import { GlobalReduxProvider } from "../modules/global/components/reduxpersist/GlobalReduxProvider";

/**
 * Test cases for persist when rerenders the component
 */

// localStorage mock
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Persist test description
describe("Login Component with Redux Persist", () => {
  beforeEach(() => {
    localStorage.clear(); // Ensure localStorage is empty before each test
  });

  // Test case for persisting state across mounts
  it("persists state across mounts", async () => {
    const { getByText, rerender } = render(
      <GlobalReduxProvider>
        <TestComponent />
      </GlobalReduxProvider>
    );

    // Assert initial state (expect the login prompt)
    expect(getByText("enter login")).toBeInTheDocument();

    // Click login button and assert that the logged-in state is displayed
    fireEvent.click(getByText("auth"));
    await waitFor(() => {
      expect(getByText("Welcome your password is 2d1i8n")).toBeInTheDocument();
    });

    // Re-render component to check persisted state after logout
    rerender(
      <GlobalReduxProvider>
        <TestComponent />
      </GlobalReduxProvider>
    );

    // Assert persisted state (logged-in state)
    await waitFor(() => {
      expect(getByText("Welcome your password is 2d1i8n")).toBeInTheDocument();
    });

    // Click logout button and assert that we revert to the login state
    fireEvent.click(getByText("logout"));
    await waitFor(() => {
      expect(getByText("enter login")).toBeInTheDocument();
    });
  });

  // Test case for persisting state after logout across mounts
  it("persists state after logout across mounts", async () => {
    const { getByText, rerender } = render(
      <GlobalReduxProvider>
        <TestComponent />
      </GlobalReduxProvider>
    );

    // First login
    fireEvent.click(getByText("auth"));
    // Then logout
    fireEvent.click(getByText("logout"));
    await waitFor(() => {
      expect(getByText("enter login")).toBeInTheDocument();
    });

    // Re-render the component and assert that the state persists (logged out)
    rerender(
      <GlobalReduxProvider>
        <TestComponent />
      </GlobalReduxProvider>
    );

    await waitFor(() => {
      expect(getByText("enter login")).toBeInTheDocument();
    });
  });
});
