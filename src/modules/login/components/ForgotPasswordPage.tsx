import { Box, Button, Typography, TypographyVariant } from "@mui/material";
import loginConstant from "../constants";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailValidationSchema } from "../schema/emailValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EmailType,
  ForgotPasswordErrorResponse,
  forgotPasswordResponseType,
} from "../types";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import styleConstant from "../../global/constants/styleConstants";
import { InputForm } from "../../common/components/form/InputForm";
import globalConstant from "../../global/constants/globalConstants";
import { forgotPasswordAPi } from "../services/forgotPasswordApi";
import { useNavigate } from "react-router-dom";
import {
  ButtonColor,
  ButtonVariant,
  InputAdnormentPositionType,
} from "../../global/types/globalTypes";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { routeNames } from "../../global/constants/routesConstants";
import errorToast from "../../global/utils/ErrorToast";

/**
 * Forgot password Management page renders the email field to verify and send password link email to the user.
 * This page renders email field to give valid email to verify.
 * The email sent has the link to reset the password for the verified user.
 *
 * Functionality:
 * The component handled with azure app insights to track success and error events.
 * The component uses mutation for the querying api.
 * Fields handled with UseForm with React-hook-form.
 * Schema validation done YupResolver.
 * Mui Components used in the UI Rendering.
 * Loading Spinner is used from the generic component.
 * @returns ForgotPasswordPage
 */

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const appInsight = useAppInsightsContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailType>({
    resolver: yupResolver(emailValidationSchema),
  });

  //handled api querying through mutation
  const { mutate, isPending } = useMutation<
    forgotPasswordResponseType,
    ForgotPasswordErrorResponse,
    EmailType
  >({
    mutationFn: (data: EmailType) => forgotPasswordAPi(data),

    onError: (error) => {
      // handle error here
      if (
        error?.response?.data?.code ==
        globalConstant.HTTP_UNAUTHORIZED_ERROR_STATUS_CODE
      ) {
        appInsight.trackEvent({
          name: globalConstant.AZURE_TRACK_FORGOT_PASSWORD_ERR,
          properties: error,
        });
        navigate(routeNames.forgotPasswordError);
      } else if (
        error?.response?.data?.code == globalConstant.HTTP_INVALID_USER_CODE
      ) {
        appInsight.trackEvent({
          name: globalConstant.AZURE_TRACK_FORGOT_PASSWORD_INVALID_USER,
          properties: error,
        });
        navigate(routeNames.forgotPasswordSuccess);
      } else {
        errorToast({ message: error?.response?.data?.message });
      }
    },

    onSuccess: (response) => {
      // Handling forgotPassword success response
      if (response?.code === globalConstant.HTTP_SUCCESS_STATUS_CODE) {
        appInsight.trackEvent({
          name: globalConstant.AZURE_TRACK_FORGOT_PASSWORD_SUCCESS,
        });
        navigate(routeNames.forgotPasswordSuccess);
      }
    },
  });

  const onSubmit: SubmitHandler<EmailType> = (formData) => {
    mutate(formData);
  };

  return (
    <>
      <Box className="forgot-password-management-box">
        <Typography
          variant={styleConstant.INPUT_VARIENT_H1 as TypographyVariant}
          textAlign={
            styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
          }
        >
          {loginConstant.FORGOT_PASSWORD_HEADER}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="forgot-password-form"
        >
          <InputForm
            id="email"
            type="email"
            label={loginConstant.EMAIL_FIELD}
            placeholder={loginConstant.LOGIN_INPUT_PLACEHOLDER_EMAIL}
            error={errors.email}
            {...register("email")}
          />
          <Typography
            variant={styleConstant.VARIENT_BODY_1 as TypographyVariant}
            color={styleConstant.COLOR_TEXT_PRIMARY}
          ></Typography>
          <div className="reset-password-btn-align">
            <Button
              type="submit"
              className="reset-password-btn"
              variant={styleConstant.BUTTON_CONTAINED as ButtonVariant}
              color={styleConstant.COLOR_GREEN as ButtonColor}
            >
              {isPending ? (
                <LoadingSpinner
                  size={styleConstant.FORGOT_PASSWORD_SPINNER_SIZE}
                />
              ) : (
                loginConstant.RESET_PASSWORD_BTN
              )}
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
