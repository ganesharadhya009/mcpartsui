import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import GlobalQueryProvider from "../modules/global/components/querycomponents/GlobalQueryProvider";

// Define a type for the data
interface MockData {
  name: string;
  id: number;
}

// Mock ReactQueryDevtools as it's only available in development mode
jest.mock("@tanstack/react-query-devtools", () => {
  const React = require("react"); // Import React inside the mock
  return {
    ReactQueryDevtools: () => React.createElement("div", null, "Devtools"),
  };
});

// Mock environment variable
beforeAll(() => {
  Object.defineProperty(global, "importMeta", {
    value: {
      env: {
        VITE_NODE_ENV: "development", // Mock the environment as 'development'
      },
    },
  });
});

// Mock component that uses useQuery
const TestComponent = ({ shouldError = false }: { shouldError?: boolean }) => {
  const { data, isLoading, error } = useQuery<MockData>({
    queryKey: ["testQueryKey"],
    queryFn: async () => {
      return await new Promise<MockData>((resolve, reject) => {
        setTimeout(() => {
          if (shouldError) {
            reject(new Error("Test Error"));
          } else {
            resolve({ name: "Test Name", id: 1 });
          }
        }, 500);
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return <div>Data: {data?.name}</div>;
};

// Test case for GlobalQueryProvider
describe("GlobalQueryProvider", () => {
  /**
   * Test to verify if the loading state is rendered
   * when the query is in progress.
   */
  it("should show the loading state initially", async () => {
    render(
      <GlobalQueryProvider>
        <TestComponent />
      </GlobalQueryProvider>
    );

    // Loading state is rendered
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  /**
   * Test to check if the correct data is displayed
   * after the query successfully resolves.
   */
  it("should show the data once loaded", async () => {
    render(
      <GlobalQueryProvider>
        <TestComponent />
      </GlobalQueryProvider>
    );

    // Wait for the data to be loaded and ensure it is displayed
    await waitFor(() => {
      expect(screen.getByText(/Data: Test Name/i)).toBeInTheDocument();
    });
  });

  /**
   * Test to verify if an error message is displayed
   * when the query fails to resolve.
   */
  it("should show an error message if the query fails", async () => {
    render(
      <GlobalQueryProvider>
        <TestComponent shouldError />
      </GlobalQueryProvider>
    );

    // Wait for the error to be thrown and ensure the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Error: Test Error/i)).toBeInTheDocument();
    });
  });

  /**
   * Test to check if the GlobalQueryProvider is using
   * the default query configurations properly.
   */
  it("should use default query configurations", async () => {
    render(
      <GlobalQueryProvider>
        <TestComponent />
      </GlobalQueryProvider>
    );

    // Wait for the data to be loaded and ensure it is displayed
    await waitFor(() => {
      expect(screen.getByText(/Data: Test Name/i)).toBeInTheDocument();
    });
  });
});
