import { ReactNode } from "react";
import SideBanner from "./SideBanner";
import { Box } from "@mui/material";
import "../styles/login.css"
import "../styles/forgotpassword.css";

type PublicLayoutWrapperPropsType = {
  children: ReactNode;
};

/**
 * Default layout Wrapper component and content wrapper component for the public route
 */

const PublicLayoutWrapper = ({ children }: PublicLayoutWrapperPropsType) => {
  return (
    <Box className="layout-wrapper">
      <SideBanner />
      <Box className="content-wrapper">
        <Box className="login-card">{children}</Box>
      </Box>
    </Box>
  );
};

export default PublicLayoutWrapper;