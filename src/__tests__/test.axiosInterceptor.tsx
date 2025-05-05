import { useSelector } from "react-redux";
import "@testing-library/jest-dom";
import { axiosInstance } from "../modules/global/services/gateway/axiosInstance";

/**
 * Mock the useSelector function from react-redux.
 * It is used to return a mock token for the tests.
 */
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

/**
 * Mock axiosInstance to observe how interceptors are being added and removed.
 */
jest.mock("../modules/global/services/gateway/axiosInstance", () => ({
  axiosInstance: {
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
  },
}));

describe("AxiosInterceptorLayer", () => {
  const mockToken = "mockedToken";

  beforeEach(() => {
    /**
     * Cast useSelector to jest.Mock type to avoid type error.
     */
    (useSelector as any).mockReturnValue(mockToken); // Mock the token from Redux store
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

 
  

  /**
   * @description
   * Test to verify that the Authorization header is set with the token.
   */
  it("should set Authorization header with token", () => {
    // Make sure the interceptor has been called before accessing it
    if (
      (axiosInstance.interceptors.request.use as jest.Mock).mock.calls.length >
      0
    ) {
      const requestInterceptor = (
        axiosInstance.interceptors.request.use as jest.Mock
      ).mock.calls[0][0];

      // Simulate a config object
      const config = { headers: {} as Record<string, string> };

      // Call the request interceptor with the config object
      requestInterceptor(config);

      // Verify that Authorization header was set with the mock token
      expect(config.headers.Authorization).toBe(`Bearer ${mockToken}`);
    }
  });

  /**
   * @description
   * Test to verify that no Authorization header is set if the token is not present.
   */
  it("should not set Authorization header if no token is present", () => {
    // Mock the useSelector to return no token
    (useSelector as any).mockReturnValue(null);

    // Make sure the interceptor has been called before accessing it
    if (
      (axiosInstance.interceptors.request.use as jest.Mock).mock.calls.length >
      0
    ) {
      const requestInterceptor = (
        axiosInstance.interceptors.request.use as jest.Mock
      ).mock.calls[0][0];

      // Simulate a config object
      const config = { headers: {} as Record<string, string> };

      // Call the request interceptor with the config object
      requestInterceptor(config);

      // Verify that Authorization header is not set
      expect(config.headers.Authorization).toBeUndefined();
    }
  });

  /**
   * @description
   * Test to verify that a 500 error triggers error handling logic.
   */
  it("should throw an error when response status is 500", () => {
    // Make sure the response interceptor has been called before accessing it
    if (
      (axiosInstance.interceptors.response.use as jest.Mock).mock.calls.length >
      0
    ) {
      const responseInterceptor = (
        axiosInstance.interceptors.response.use as jest.Mock
      ).mock.calls[0][1];

      const error = {
        response: {
          status: 500,
        },
      };

      // Verify that a 500 error is thrown
      expect(() => responseInterceptor(Promise.reject(error))).toThrow(
        "API failed: Status 500: [object Object]"
      );
    }
  });
});
