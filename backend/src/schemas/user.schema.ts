import { JSONSchemaType } from 'ajv';
import {
  ILoginRequest,
  IRegistrationRequest,
  IResetPasswordConfirmationRequest,
  IResetPasswordRequest,
} from 'src/interfaces/user.interface';

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
    },
    required: ['email', 'password'],
    additionalProperties: false,
  };