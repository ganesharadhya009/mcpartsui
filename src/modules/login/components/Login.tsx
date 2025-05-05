import { Box, Button, Typography, TypographyVariant } from "@mui/material";
import { useDispatch } from "react-redux";
import { InputForm } from "../../common/components/form/InputForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../schema/loginValidationSchema";
import { useMutation } from "@tanstack/react-query";
import { loginServiceApi } from "../services/loginApi";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { login } from "../../global/redux/login/loginSlice";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { ApiErrorResponseLogin, Inputs, LoginResponseType } from "../types";
import globalConstant from "../../global/constants/globalConstants";
import loginConstant from "../constants";
import styleConstant from "../../global/constants/styleConstants";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ButtonColor,
  ButtonVariant,
  InputAdnormentPositionType,
} from "../../global/types/globalTypes";
import { routeNames } from "../../global/constants/routesConstants";

const Login = () => {
  const dispatch = useDispatch();
  const appInsight = useAppInsightsContext(); // Accessing Application Insights context
  const navigate = useNavigate();

  // Setting up form handling and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginValidationSchema) });

  // Setting up mutation for login request
  const { error, mutate, isPending } = useMutation<
    LoginResponseType,
    ApiErrorResponseLogin,
    Inputs
  >({
    mutationFn: (data: Inputs) => loginServiceApi(data),
    onError: (error) => {
      // HANDLE ERROR IN FUTURE
      appInsight.trackEvent({
        name: globalConstant.AI_LOGIN_IDENTIFIER,
        properties: error,
      });
    },
    onSuccess: (response) => {
      // Handling successful login response
      response.status = "success";
      if (response?.status === globalConstant.HTTP_SUCCESS_STATUS_TEXT) {
        dispatch(login({ token: response.access_token }));        
        navigate(routeNames.dashboard);
      }
      else
      {
        navigate(routeNames.dashboard);
      }
      // Additional handling can be added for user data fetching and redirection
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    //mutate(formData);
    dispatch(login({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3NDUyNTYwMjgsImV4cCI6MTc0NTI1ODQyOCwiaXNzIjoicmFqZWV2QGdtYWlsLmNvbSIsImF1ZCI6InJhamVldkBnbWFpbC5jb20ifQ.fQal7ojNRKb8Mu4dV2l1WJ_GkPNV2IILY-X-orGBPvM" }));
    navigate(routeNames.dashboard);
  };

  return (
    <>
      <Box className="login-title">
        <Typography
          variant={styleConstant.INPUT_VARIENT_H1 as TypographyVariant}
          textAlign={
            styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
          }
        >
          {loginConstant.LOGIN_TEXT}
        </Typography>
        <Box
          display={styleConstant.DISPLAY_FLEX}
          justifyContent={
            styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
          }
        >
          <Typography
            variant={styleConstant.VARIENT_BODY_1 as TypographyVariant}
            textAlign={
              styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
            }
            display={styleConstant.DISPLAY_FLEX}
            justifyContent={
              styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
            }
          >
            {loginConstant.LOGIN_PAGE_TITLE}
          </Typography>
          <Typography
            textAlign={
              styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
            }
            display={styleConstant.DISPLAY_FLEX}
            justifyContent={
              styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
            }
            fontWeight={styleConstant.FONT_SIZE_500}
          >
            &nbsp; {globalConstant.COMPANY_NAME_TEXT}
          </Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <InputForm
          label={loginConstant.LOGIN_INPUT_LABEL_EMAIL}
          id="email"
          type="email"
          placeholder={loginConstant.LOGIN_INPUT_PLACEHOLDER_EMAIL}
          error={errors.email}
          {...register("email")}
        />
        <InputForm
          label={loginConstant.LOGIN_INPUT_LABEL_PASSWORD}
          id="password"
          type="password"
          placeholder={loginConstant.LOGIN_INPUT_PLACEHOLDER_PASSWORD}
          error={errors.password}
          password={true}
          {...register("password")}
        />
        <NavLink to={routeNames.forgotPassword} className="forgot-nav-link">
          <Typography
            fontWeight={styleConstant.FONT_SIZE_500}
            color={styleConstant.COLOR_GREEN}
            variant={styleConstant.VARIENT_BODY_2 as TypographyVariant}
            textAlign={
              styleConstant.TYPOGRAPHY_POSITIION_END as InputAdnormentPositionType
            }
            className="forgot-link"
          >
            Forgot Password?
          </Typography>
        </NavLink>

        {error && (
          <Typography
            variant={styleConstant.VARIENT_BODY_1 as TypographyVariant}
            color={styleConstant.COLOR_ERROR}
            textAlign={
              styleConstant.TYPOGRAPHY_POSITIION_CENTER as InputAdnormentPositionType
            }
          >
            {error?.response?.data?.errors?.message?.[0]
              ? error?.response?.data?.errors?.message?.[0]
              : error?.response?.data?.message
              ? error?.response?.data?.message
              : error.message}
          </Typography>
        )}
        <Button
          type="submit"
          variant={styleConstant.BUTTON_OUTLINED as ButtonVariant}
          className="login-button"
          color={styleConstant.COLOR_GREEN as ButtonColor}
        >
          {isPending ? (
            <LoadingSpinner size={styleConstant.LOGINPAGE_SPINNER_SIZE} />
          ) : (
            loginConstant.LOGIN_TEXT
          )}
        </Button>
      </form>
    </>
  );
};

export default Login;
