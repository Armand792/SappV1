import { JSONSchemaType } from 'ajv';
import {
  ILoginRequest,
  IRegistrationRequest,
  IResetPasswordConfirmationRequest,
  IResetPasswordRequest,
  IVerificationRequest,
} from 'src/interfaces/user.interface.js';

export const RegistrationSchema: JSONSchemaType<IRegistrationRequest> = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

export const LoginSchema: JSONSchemaType<ILoginRequest> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },

    password: {
      type: 'string',
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

export const ResetPasswordSchema: JSONSchemaType<IResetPasswordRequest> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
  },
  required: ['email'],
  additionalProperties: false,
};

export const ResetPasswordConfirmationSchema: JSONSchemaType<IResetPasswordConfirmationRequest> =
  {
    type: 'object',
    properties: {
      password: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
    },
    required: ['email', 'password', 'code'],
    additionalProperties: false,
  };

export const VerificationSchema: JSONSchemaType<IVerificationRequest> = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
  required: ['email', 'code'],
  additionalProperties: false,
};