export interface IRegistrationRequest {
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IResetPasswordRequest {
  email: string;
}

export interface IResetPasswordConfirmationRequest {
  password: string;
  email: string;
}

export interface IResponse {
  code: number;
  message: string;
  data?: any;
}
