export interface IRegisterPayload {
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IVerifyAccountPayload {
  email: string;
  code: string;
}

export interface IResetPayload {
  email: string;
}

export interface IResetPasswordConfirmationPayload {
  email: string;
  password: string;
  code: string;
}