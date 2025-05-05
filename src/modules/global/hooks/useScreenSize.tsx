import { useEffect, useState } from "react";

// Define an interface for the screen size type
export interface screenSizetype {
  width: number; // Width of the screen
  height: number; // Height of the screen
}

/**
 * Custom hook to track the current screen size.
 * It listens for window resize events and updates the screen dimensions accordingly.
 *
 * @returns {screenSizetype} An object containing the current screen width and height.
 */
const useScreenSize = () => {
  const [screen, setScreen] = useState<screenSizetype>({
    width: window?.innerWidth,
    height: window?.innerHeight,
  });

  /**
   * Updates the screen size state based on the current window dimensions.
   */
  const handleResize = () => {
    setScreen({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen; // Return the current screen size
};

export default useScreenSize;
