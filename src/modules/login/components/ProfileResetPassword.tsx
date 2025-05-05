/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { InputForm } from "../../common/components/form/InputForm";
import SectionHeader from "../../common/components/SectionHeader";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ApiErrorResponseLogin,
  LoginResponseType,
  ResetPasswordType,
} from "../types";
import { useMutation } from "@tanstack/react-query";
import globalConstant from "../../global/constants/globalConstants";
import { SubmitHandler, useForm } from "react-hook-form";
import loginConstant from "../constants";
import { resetPasswordSchema } from "../schema/resetPasswordValidationSchema";
import { Box, Button } from "@mui/material";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import FormActionToolBar from "../../common/components/FormActionToolBar";
import { resetPasswordApiService } from "../services/resetPasswordServiceApi";
import successToast from "../../global/utils/SuccessToast";
import errorToast from "../../global/utils/ErrorToast";
import styleConstant from "../../global/constants/styleConstants";
import { handleNavigate } from "../../global/utils/handleCancel";
import { RootState } from "../../global/redux/login/loginSlice";

/**
 * ProfileResetPassword component allows users to reset their passwords.
 * It includes a form to input the current password, new password, and confirm password.
 *
 * It utilizes React Hook Form for form management and validation,
 * along with React Query for handling API requests and state management.
 *
 * @returns {JSX.Element} The rendered ProfileResetPassword component.
 */
const ProfileResetPassword = () => {
  const appInsight = useAppInsightsContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { userData } = useSelector((state: RootState) => state.auth);

  const { mutate, isPending } = useMutation<
    LoginResponseType,
    ApiErrorResponseLogin,
    ResetPasswordType
  >({
    mutationFn: (data: ResetPasswordType) => resetPasswordApiService(data),
    onError: (error) => {
      appInsight.trackEvent({
        name: globalConstant.AI_RESET_PASSWORD_INDENTIFIER,
        properties: error,
      });
      errorToast({
        message: error?.response?.data?.message,
      });
    },
    onSuccess: (_response) => {
      successToast({ message: loginConstant.RESET_PASSWORD_SUCCES_MESSAGE });
      navigate(-1);
    },
  });

  /**
   * Handles form submission.
   * Calls the mutate function with the form data and user email.
   *
   * @param {ResetPasswordType} formData - The form data submitted by the user.
   */
  const onSubmit: SubmitHandler<ResetPasswordType> = (formData) => {
    mutate({ ...formData, email: userData?.email });
  };

  /**
   * Navigates back to the previous page when the cancel button is clicked.
   */
  const handleCancel = () => {
    handleNavigate(navigate, -1);
  };

  return (
    <>
      <SectionHeader title={loginConstant.RESET_PASSWORD_SECTION_HEADING} />
      <form
        className="profile-reset-password"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm
          label={loginConstant.RESET_PASSWORD_CURRENT_PASSWORD_LABEL}
          id="password"
          type="password"
          placeholder={
            loginConstant.RESET_PASSWORD_CURRENT_PASSWORD_PLACE_HOLDER
          }
          error={errors.password}
          password={true}
          {...register("password")}
        />
        <InputForm
          label={loginConstant.RESET_PASSWORD_NEW_PASSWORD_LABEL}
          id="newPassword"
          type="password"
          placeholder={loginConstant.RESET_PASSWORD_NEW_PASSWORD_PLACE_HOLDER}
          error={errors.newPassword}
          password={true}
          {...register("newPassword")}
        />
        <InputForm
          label={loginConstant.RESET_PASSWORD_CONFIRM_PASSWORD_LABEL}
          id="confirmPassword"
          type="password"
          placeholder={
            loginConstant.RESET_PASSWORD_CONFIRM_PASSWORD_PLACE_HOLDER
          }
          error={errors.confirmPassword}
          password={true}
          {...register("confirmPassword")}
        />
        <FormActionToolBar>
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            gap="16px"
            width="100%"
          >
            <Button variant="outlined-green" onClick={handleCancel}>
              {globalConstant.CANCEL_TEXT}
            </Button>
            <Button variant="contained-green" type="submit">
              {isPending ? (
                <LoadingSpinner size={styleConstant.SPINNER_SIZE_SUBMIT} />
              ) : (
                globalConstant.SAVE_TEXT
              )}
            </Button>
          </Box>
        </FormActionToolBar>
      </form>
    </>
  );
};

export default ProfileResetPassword;
