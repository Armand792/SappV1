export interface IRegisterPayload {
  email: string;
  password: string;
}

export interface IVerifyAccountPayload {
  email: string;
  code: string;
}
