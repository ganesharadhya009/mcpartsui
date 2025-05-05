import * as yup from "yup";
import { validationMessages } from "../constants";

export const loginValidationSchema = yup
  .object({
    email: yup
      .string()
      .email(validationMessages.email.invalid)
      .required(validationMessages.email.required) as yup.StringSchema,

    password: yup
      .string()
      .required(validationMessages.password.required) as yup.StringSchema,
  })
  .required();
