import * as yup from "yup";
import { validationMessages } from "../constants";

export const passwordvalidationSchema = yup
    .object({
        newPassword: yup
            .string()
            .required(validationMessages.newPassword.required)
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])/,
                validationMessages.newPassword.uppercaseLowercase
            )
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)/,
                validationMessages.newPassword.alphabetNumeric
            )
            .matches(
                /^(?=.*[!@#$%&^&*()_])/,
                validationMessages.newPassword.specialCharacter
            )
            .min(8, validationMessages.newPassword.min)
            .max(15, validationMessages.newPassword.max) as yup.StringSchema,

        confirmPassword: yup
            .string()

            .required(validationMessages.confirmPassword.required)
            .test(
                validationMessages.confirmPassword.testName,
                validationMessages.confirmPassword.passwordMatch,
                function (value) {
                    return this.parent.newPassword === value;
                }
            ) as yup.StringSchema,
    })
    .required();
