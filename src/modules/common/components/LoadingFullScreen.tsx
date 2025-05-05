import { Box } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import { getLoaderFullScreenProps } from "../../global/styles/styles";

/**
 * LoadingFullScreen Component
 *
 * This component displays a full-screen loading spinner, typically used
 * to indicate that a process is ongoing and the user should wait. It
 * utilizes the `LoadingSpinner` component for the visual loading indicator.
 *
 * @returns {JSX.Element} The rendered loading screen.
 */
const LoadingFullScreen = () => {
  return (
    <Box {...getLoaderFullScreenProps()}>
      <LoadingSpinner />
    </Box>
  );
};

export default LoadingFullScreen;
