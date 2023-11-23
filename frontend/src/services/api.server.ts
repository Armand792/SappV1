import {
  IRegisterPayload,
  IVerifyAccountPayload,
} from '@/interfaces/user.interface';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (payload: IRegisterPayload) => {
  return (await instance.post('/user/register', JSON.stringify(payload)))?.data;
};

export const verifyAccount = async (payload: IVerifyAccountPayload) => {
  return (await instance.post('/user/verify-account', JSON.stringify(payload)))
    ?.data;
};
