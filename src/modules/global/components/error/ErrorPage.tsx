import { FallbackProps } from "react-error-boundary";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import GlobalConstant from "../../constants/globalConstants";
import { ButtonColor, ButtonVariant } from "../../types/globalTypes";

/**
 * Global error page for redirecting in case of application errors.
 * @param error, resetErrorBoundary
 * @returns Component which shows the generic error page.
 */

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Box className="custombox">
    <Stack spacing={GlobalConstant.GAP}>
      <Typography>{GlobalConstant.ERROR_INFO}</Typography>
      <Typography>
        {GlobalConstant.ERROR_MESSAGE}: {error.message}
      </Typography>
      <Button
        variant={GlobalConstant.TEXT as ButtonVariant}
        color={GlobalConstant.INFO_COLOR as ButtonColor}
        onClick={resetErrorBoundary}
      >
        {GlobalConstant.BACK}
      </Button>
    </Stack>
  </Box>
);

export default ErrorPage;
