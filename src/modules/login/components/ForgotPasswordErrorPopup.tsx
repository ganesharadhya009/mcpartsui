import { Box, Typography, TypographyVariant } from "@mui/material";
// import "../styles/forgotpassword.css";
import forgotPassword from "../../global/assets/icons/ForgotPassword.svg";
import loginConstant from "../constants";
import styleConstant from "../../global/constants/styleConstants";
import { InputAdnormentPositionType } from "../../global/types/globalTypes";

/**
 * Forgot password page renders error message for staff user.
 * @returns message page
 */

const ForgotPasswordErrorPopup = () => {
  return (
    <>
      <div className="square">
        <div className="circle">
          <img
            className="alert-image"
            src={forgotPassword}
            loading="lazy"
            alt=""
          />
        </div>
      </div>
      <Box className="forgot-password-box">
        <Typography
          variant={styleConstant.INPUT_VARIENT_H1 as TypographyVariant}
          textAlign={
            styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
          }
        >
          {loginConstant.FORGOT_PASSWORD_QUESTION}
        </Typography>
        <Typography
          variant={styleConstant.VARIENT_BODY_1 as TypographyVariant}
          textAlign={
            styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
          }
          color={styleConstant.COLOR_INFO_MAIN}
        >
          {loginConstant.FORGOT_PASSWORD_STAFF_INFO}
        </Typography>
      </Box>
    </>
  );
};

export default ForgotPasswordErrorPopup;
