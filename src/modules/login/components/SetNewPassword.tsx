import { Box, Button, Typography, TypographyVariant } from "@mui/material";
import loginConstant from "../constants";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ResetPassword,
  setNewPasswordError,
  setNewPasswordResponse,
  setNewPasswordType,
} from "../types";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import styleConstant from "../../global/constants/styleConstants";
import { InputForm } from "../../common/components/form/InputForm";
import globalConstant from "../../global/constants/globalConstants";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ButtonColor,
  ButtonVariant,
  ColorVariant,
  InputAdnormentPositionType,
} from "../../global/types/globalTypes";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { routeNames } from "../../global/constants/routesConstants";
import errorToast from "../../global/utils/ErrorToast";
import { passwordvalidationSchema } from "../schema/passwordvalidationSchema";
import { forgotResetPasswordAPi } from "../services/forgotResetPasswordApi";
import { setNewPasswordApi } from "../services/setNewPasswordApi";
import { StyledList, StyledListIcon, StyledListItem } from "./Styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CancelIcon from "@mui/icons-material/Cancel";
import { isaplhanumeric, specialchar, upperandlowercase } from "../utils/regex";
/**
 * SetNew password page renders password fields to set new password for first time login and forgot password user.
 * Page has new Password and confirm new password fields to submit.
 *
 * Functionality:
 * The component handled with azure app insights to track success and error events.
 * The component uses mutation for the querying api.
 * Fields handled with UseForm with React-hook-form.
 * Schema validation done YupResolver.
 * Mui Components used in the UI Rendering.
 * Loading Spinner is used from the generic component.
 * @returns SetNewPasswordPage
 */

const SetNewPasswordPage = () => {
  const navigate = useNavigate();
  const appInsight = useAppInsightsContext();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: yupResolver(passwordvalidationSchema),
  });

  //   handled api querying through mutation
  const { mutate: resetPassword, isPending: isLoading } = useMutation<
    setNewPasswordResponse,
    setNewPasswordError,
    ResetPassword
  >({
    mutationFn: (data: ResetPassword) => forgotResetPasswordAPi(data),

    onError: (error) => {
      // handle error here

      appInsight.trackEvent({
        name: globalConstant.AZURE_TRACK_FORGOT_PASSWORD_INVALID_USER,
        properties: error,
      });
      errorToast({ message: error?.response?.data?.message });
    },

    onSuccess: (response) => {
      // Handling forgotPassword success response
      if (response?.status === loginConstant.RESET_PASSWORD_STATUS) {
        appInsight.trackEvent({
          name: globalConstant.AZURE_TRACK_FORGOT_PASSWORD_SUCCESS,
        });
        navigate(routeNames.passwordUpdateSuccess);
      }
    },
  });

  const { mutate: setPassword, isPending } = useMutation<
    setNewPasswordResponse,
    setNewPasswordError,
    setNewPasswordType
  >({
    mutationFn: (data: setNewPasswordType | ResetPassword) =>
      setNewPasswordApi(data),

    onError: (error) => {
      // handle error here

      if (error) {
        appInsight.trackEvent({
          name: globalConstant.AZURE_TRACK_FORGOT_PASSWORD_INVALID_USER,
          properties: error,
        });
      }
      errorToast({ message: error?.response?.data?.message });
    },

    onSuccess: (response) => {
      // Handling setNewPassword success response
      if (response?.status === loginConstant.SET_PASSWORD_STATUS) {
        appInsight.trackEvent({
          name: globalConstant.AZURE_TRACK_FORGOT_PASSWORD_SUCCESS,
        });
        navigate(routeNames.setPasswordSuccess);
      }
    },
  });

  const passwordLengthValidation =
    (watch("newPassword")?.length as number) > 7 &&
    (watch("newPassword")?.length as number) < 16;

  const onSubmit: SubmitHandler<ResetPassword> = (formData) => {
    if (
      searchParams.get(globalConstant.QUERY_PARAM_ID) &&
      searchParams.get(globalConstant.QUERY_PARAM_TOKEN)
    ) {
      const token = new URLSearchParams(window.location.search).get(
        globalConstant.QUERY_PARAM_TOKEN
      );

      resetPassword({
        password: formData.newPassword,
        id: searchParams.get(globalConstant.QUERY_PARAM_ID) || "",
        token: token || "",
      });
    } else {
      setPassword(formData as setNewPasswordType);
    }
  };

  return (
    <>
      <Box className="set-password-card">
        <Typography
          variant={styleConstant.INPUT_VARIENT_H1 as TypographyVariant}
          textAlign={
            styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
          }
        >
          {loginConstant.SET_NEW_PASSWORD_HEADER}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="set-password-form">
          <InputForm
            label={loginConstant.NEW_PASSWORD_FIELD_LABEL}
            id="newPassword"
            type="password"
            placeholder={loginConstant.LOGIN_INPUT_PLACEHOLDER_PASSWORD}
            password={true}
            {...register("newPassword")}
          />
          <InputForm
            label={loginConstant.CONFIRM_NEW_PASSWORD_LABEL}
            id="confirmPassword"
            type="password"
            placeholder={loginConstant.LOGIN_INPUT_PLACEHOLDER_PASSWORD}
            error={errors.confirmPassword}
            password={true}
            {...register("confirmPassword")}
          />
          <Typography
            fontWeight={styleConstant.FONT_SIZE_600}
            fontFamily={styleConstant.FONT_FAMILY}
            color={styleConstant.COLOR_TEXT_PRIMARY}
          >
            {loginConstant.PASSWORD_CONSTRAINTS_HEADER}
          </Typography>
          <StyledList className={errors.newPassword && "vibrating"}>
            <StyledListItem disableGutters>
              <StyledListIcon>
                {passwordLengthValidation ? (
                  <CheckCircleIcon />
                ) : errors.newPassword ? (
                  <CancelIcon
                    color={styleConstant.COLOR_ERROR as ColorVariant}
                  />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </StyledListIcon>
              {loginConstant.CONSTRAINT_1}
            </StyledListItem>

            <StyledListItem disableGutters>
              <StyledListIcon>
                {upperandlowercase(watch("newPassword") as string) ? (
                  <CheckCircleIcon />
                ) : errors.newPassword ? (
                  <CancelIcon
                    color={styleConstant.COLOR_ERROR as ColorVariant}
                  />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </StyledListIcon>
              {loginConstant.CONSTRAINT_2}
            </StyledListItem>

            <StyledListItem disableGutters>
              <StyledListIcon>
                {isaplhanumeric(watch("newPassword") as string) ? (
                  <CheckCircleIcon />
                ) : errors.newPassword ? (
                  <CancelIcon
                    color={styleConstant.COLOR_ERROR as ColorVariant}
                  />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </StyledListIcon>
              {loginConstant.CONSTRAINT_3}
            </StyledListItem>

            <StyledListItem disableGutters>
              <StyledListIcon>
                {specialchar(watch("newPassword") as string) ? (
                  <CheckCircleIcon />
                ) : errors.newPassword ? (
                  <CancelIcon
                    color={styleConstant.COLOR_ERROR as ColorVariant}
                  />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </StyledListIcon>
              {loginConstant.CONSTRAINT_4}
            </StyledListItem>
          </StyledList>

          <div className="reset-password-btn-align">
            <Button
              type="submit"
              className="reset-password-btn"
              variant={styleConstant.BUTTON_CONTAINED as ButtonVariant}
              color={styleConstant.COLOR_GREEN as ButtonColor}
            >
              {isPending || isLoading ? (
                <LoadingSpinner size={styleConstant.LOGINPAGE_SPINNER_SIZE} />
              ) : (
                loginConstant.UPDATE_PASSWORD
              )}
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default SetNewPasswordPage;
