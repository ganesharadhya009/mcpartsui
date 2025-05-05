import SideBannerLogo from "../../global/assets/icons/side-bar.jpg";
import mcPartsLogo from "../../global/assets/icons/mcParts-edited-logo.png";
import "../styles/login.css";
import { Box, Typography, TypographyVariant } from "@mui/material";
import loginConstant from "../constants";
import styleConstant from "../../global/constants/styleConstants";
import { InputAdnormentPositionType } from "../../global/types/globalTypes";

/**
 * Default SideBanner component for the public routes consists logo
 * @returns sideBanner
 */

const SideBanner = () => {
  return (
    <Box className="side-banner-box">
      <Box className="mcParts-logo-box">
        <img
          className="mcParts-logo-side-banner"
          src={mcPartsLogo}
          alt={loginConstant.SIDEBANNER_MCPARTS_LOGO_ALT_TEXT}
        />
      </Box>
      <Box className="sidebar-logo-box">
        <img
          className="side-banner-logo"
          src={SideBannerLogo}
          alt={loginConstant.SIDEBANNER_LOGO_ALT_TEXT}
        />
      </Box>
      <Box className="bottom-side-banner">
        <Typography
          variant={styleConstant.INPUT_VARIENT_H1 as TypographyVariant}
          textAlign={
            styleConstant.ADORNMENT_POSITION_START as InputAdnormentPositionType
          }
        >
          {loginConstant.SIDE_BANNER_HERO_TITLE}
        </Typography>
        <Typography
          variant={styleConstant.VARIENT_BODY_1 as TypographyVariant}
          textAlign={
            styleConstant.ADORNMENT_POSITION_START as InputAdnormentPositionType
          }
        >
          {loginConstant.SIDE_BANNER_HERO_DESCRIPTION}
        </Typography>
      </Box>
    </Box>
  );
};

export default SideBanner;
