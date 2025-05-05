import { Box, Button, Typography, TypographyVariant } from "@mui/material";
import forgotPasswordSuccess from "../../global/assets/icons/ForgotPasswordSuccessPopup.svg";
import loginConstant from "../constants";
import styleConstant from "../../global/constants/styleConstants";
import {
  ButtonColor,
  ButtonVariant,
  InputAdnormentPositionType,
} from "../../global/types/globalTypes";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../global/constants/routesConstants";

/**
 * Forgot password page renders success message of link email sent to user .
 * @returns message page
 */

const SuccessPopup = ({ enableLogin = styleConstant.ENABLE_LOGIN }) => {
  const navigate = useNavigate();

  let headerMessage = loginConstant.FORGOT_PASSWORD_LINK_MESSSAGE;
  let subMessage = loginConstant.FORGOT_PASSWORD_LINK_SUB_MESSAGE;

  if (enableLogin) {
    headerMessage = loginConstant.PASSWORD_UPDATE_SUCCESS_H1;
    subMessage = loginConstant.PASSWORD_UPDATE_SUCCESS_H2;
  }

  return (
    <>
      <img
        className="forgot-password-success-popup"
        src={forgotPasswordSuccess}
        loading="lazy"
        alt=""
      />

      <Box className="forgot-password-success-card">
        <Typography
          variant={styleConstant.INPUT_VARIENT_H1 as TypographyVariant}
          textAlign={
            styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
          }
        >
          {headerMessage}
        </Typography>
        <Typography
          fontSize={styleConstant.FORGOT_PASSWORD_FONT_SIZE}
          fontWeight={styleConstant.FORGOT_PASSWORD_FONT_WEIGHT}
          fontFamily={styleConstant.FONT_FAMILY}
          lineHeight={styleConstant.FORGOT_PASSWORD_LINE_HEIGHT}
          textAlign={
            styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
          }
          color={styleConstant.COLOR_TEXT_SECONDARY}
        >
          {subMessage}
        </Typography>
      </Box>
      {enableLogin ? (
        <Button
          className="reset-password-btn"
          variant={styleConstant.BUTTON_CONTAINED as ButtonVariant}
          color={styleConstant.COLOR_GREEN as ButtonColor}
          onClick={() => navigate(routeNames.login)}
        >
          {loginConstant.LOGIN_TEXT}
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default SuccessPopup;
