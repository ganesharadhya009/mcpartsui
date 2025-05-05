import * as yup from "yup";
import { validationMessages } from "../constants";

export const emailValidationSchema = yup
  .object({
    email: yup
      .string()
      .email(validationMessages.email.invalid)
      .required(validationMessages.email.required) as yup.StringSchema,
  })
  .required();