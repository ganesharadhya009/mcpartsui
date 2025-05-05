import { render, fireEvent, screen } from "@testing-library/react";
import { toast } from "react-toastify";
import TestToastComponent from "../modules/global/components/testcomponents/TestToastComponent";

/**
 * error and success toast test cases for the events
 */

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ToastComponent", () => {
  test("calls toast.success when button is clicked", () => {
    render(<TestToastComponent />);
    // Simulate button click

    fireEvent.click(screen.getByText("success"));

    // Assert that toast.success was called with the correct message
    expect(toast.success).toHaveBeenCalledWith("This is a success message!", {
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "bottom-right",
      progress: undefined,
      theme: "light",
    });
  });

  test("calls toast.error when button is clicked", () => {
    render(<TestToastComponent />);
    // Simulate button click

    fireEvent.click(screen.getByText("error"));

    // Assert that toast.error was called with the correct message
    expect(toast?.error).toHaveBeenCalledWith("This is a error message!", {
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "bottom-right",
      progress: undefined,
      theme: "light",
    });
  });
});
