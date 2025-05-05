export type Inputs = { email?: string | undefined; password?: string | undefined };
export type ResetPasswordType = {
  password?: string | undefined;
  newPassword?: string | undefined;
  confirmPassword?: string | undefined;
  email?: string | undefined;
};

export interface ApiErrorResponseLogin {
  status: number;
  message: string;
  response: {
    data: {
      errors?: {
        message?: string[];
      };
      message: string;
    };
  };
}
export interface ApiErrorResponse {
  status: number;
  message: string;
  response: {
    data: {
      errors?: {
        message?: string[];
      };
      message: string;
    };
  };
}

export interface LoginResponseType {
  access_token: string;
  status: string;
  passwordreset: boolean;
}

export interface forgotPasswordResponseType {

  code: number;
  message: string;
}

export interface EmailType {
  email?: string;
}

export interface ResetPassword {
  id?: string;
  token?: string;
  newPassword?: string;
  confirmPassword?: string;
  password?: string;
}

export interface ForgotPasswordErrorResponse {
  status: number;
  message: string;
  response: {
    data: {
      code: number;
      errors?: {
        code?: number;
        message?: string[];
      };
      message: string;
    };
  };
}

export interface setNewPasswordType {
  newPassword?: string | undefined;
}

export interface setNewPasswordResponse {
  status: string;
}
export interface setNewPasswordError {
  code: number;
  message: string;
  response: {
    data: {
      code: number;
      errors?: {
        code?: number;
        message?: string[];
      };
      message: string;
    };
  };
}