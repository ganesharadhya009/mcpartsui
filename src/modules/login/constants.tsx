const loginConstant = {
  FORGOT_PASSWORD_QUESTION: "Forgot Your Password?",
  FORGOT_PASSWORD_STAFF_INFO:
    "Kindly contact the Management to receive the temporary password to Login",
  LOGIN_TEXT: "Login",
  LOGIN_PAGE_TITLE: "Login to continue on",
  LOGIN_INPUT_LABEL_EMAIL: "Email ID / Mobile Number",
  LOGIN_INPUT_PLACEHOLDER_EMAIL: "Enter your email or mobile",
  LOGIN_INPUT_LABEL_PASSWORD: "Password",
  LOGIN_INPUT_PLACEHOLDER_PASSWORD: "Enter your password",
  LOGIN_ERROR_INVALID_CREDENTIALS: "Invalid credentials",
  SIDEBANNER_MCPARTS_LOGO_ALT_TEXT: "mcParts-logo-side-banner",
  SIDEBANNER_LOGO_ALT_TEXT: "side-banner-logo",
  SIDE_BANNER_HERO_TITLE: "Lorem Ipsum Dolor",
  SIDE_BANNER_HERO_DESCRIPTION:
    "It is a long established fact that a reader will be distracted by the readable content of a page when.",
  FORGOT_PASSWORD_HEADER: "Forgot Password",
  EMAIL_FIELD: "Email ID/ Mobile Number",
  RESET_PASSWORD_BTN: "Reset Password",
  EMAIL_HELPER: "Please enter valid email",
  FORGOT_PASSWORD_LINK_MESSSAGE:
    "The link is shared with your registered email",
  FORGOT_PASSWORD_LINK_SUB_MESSAGE: "Reset your password by clicking the link",
  RESET_PASSWORD_CURRENT_PASSWORD_LABEL: "Current Password",
  RESET_PASSWORD_NEW_PASSWORD_LABEL: "New Password",
  RESET_PASSWORD_CONFIRM_PASSWORD_LABEL: "Confirm Password",
  RESET_PASSWORD_CONFIRM_PASSWORD_PLACE_HOLDER: "Enter confirm password",
  RESET_PASSWORD_NEW_PASSWORD_PLACE_HOLDER: "Enter new password",
  RESET_PASSWORD_CURRENT_PASSWORD_PLACE_HOLDER: "Enter current password",
  RESET_PASSWORD_BUTTON: "RESET PASSWORD",
  RESET_PASSWORD_SUCCES_MESSAGE: "Your password has been changed successfully!",
  RESET_PASSWORD_SECTION_HEADING: "Password Change",
  SET_NEW_PASSWORD_HEADER: "Set New Password",
  NEW_PASSWORD_FIELD_LABEL: "New Password",
  CONFIRM_NEW_PASSWORD_LABEL: "Confirm New Password",
  PASSWORD_CONSTRAINTS_HEADER: "Password Should Have Atleast:",
  CONSTRAINT_1 : "8-15 Characters",
  CONSTRAINT_2 : "1 Lower + Upper Case",
  CONSTRAINT_3 : "1 Alphabet + 1 Numeric Digit",
  CONSTRAINT_4 : "One Special Character !@#$%^&*()_",
  PASSWORD_UPDATE_SUCCESS_H1 : "Password Updated Successfully!",
  PASSWORD_UPDATE_SUCCESS_H2 : "Use your New Password to Login",
  SET_PASSWORD_STATUS : "password updated successfully",
  RESET_PASSWORD_STATUS : "success",
  UPDATE_PASSWORD : "Update Password"
};

export const validationMessages = {
  email: {
    required: "Email is mandatory",
    invalid: "Must be a valid email ID (Ex: yourname@yourcompany.com)",
  },
  password: {
    required: "Password is mandatory",
    min: "Password must be at least 8 characters long",
    max: "Password cannot exceed 15 characters",
    uppercaseLowercase:
      "Password must have at least one uppercase and one lowercase letter",
    alphabetNumeric:
      "Password must have at least one alphabet and one numeric character",
    specialCharacter:
      "Password must have at least one special character (!@#$%&^&*()_)",
  },
  newPassword: {
    required: "New password is mandatory",
    min: "New password must be at least 8 characters long",
    max: "New password cannot exceed 15 characters",
    uppercaseLowercase:
      "New password must have at least one uppercase and one lowercase letter",
    alphabetNumeric:
      "New password must have at least one alphabet and one numeric character",
    specialCharacter:
      "New password must have at least one special character (!@#$%&^&*()_)",
  },
  confirmPassword: {
    required: "Confirm password is mandatory",
    min: "Confirm password must be at least 8 characters long",
    max: "Confirm password cannot exceed 15 characters",
    uppercaseLowercase:
      "Confirm password must have at least one uppercase and one lowercase letter",
    alphabetNumeric:
      "Confirm password must have at least one alphabet and one numeric character",
    specialCharacter:
      "Confirm password must have at least one special character (!@#$%&^&*()_)",
    passwordMatch: "New password and Confirm password should match",
    testName: "test-match",
  },
};

export default loginConstant;
