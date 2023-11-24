import {
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordConfirmationPayload,
  IResetPayload,
  IVerifyAccountPayload,
} from '@/interfaces/user.interface';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 *
 * @description user request
 *
 */
export const register = async (payload: IRegisterPayload) => {
  return (await instance.post('/user/register', JSON.stringify(payload)))?.data;
};

export const login = async (payload: ILoginPayload) => {
  return (await instance.post('/user/login', JSON.stringify(payload)))?.data;
};

export const verifyAccount = async (payload: IVerifyAccountPayload) => {
  return (await instance.post('/user/verify-account', JSON.stringify(payload)))
    ?.data;
};

export const resetPassword = async (payload: IResetPayload) => {
  return (await instance.post('/user/reset-password', JSON.stringify(payload)))
    ?.data;
};

export const resetPasswordConfirmation = async (
  payload: IResetPasswordConfirmationPayload
) => {
  return (
    await instance.post(
      '/user/reset-password-confirmation',
      JSON.stringify(payload)
    )
  )?.data;
};

