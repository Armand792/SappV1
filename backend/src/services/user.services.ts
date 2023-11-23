/**
 * @file user service.
 */

import {
  ILoginRequest,
  IRegistrationRequest,
  IResponse,
  IResetPasswordRequest,
  IResetPasswordConfirmationRequest,
  IVerificationRequest,
} from '../interfaces/user.interface.js';
import * as repo from '../repositories/user.repositories.js';

/**
 * Creates a new user.
 *
 * @returns Promise
 */
export const userRegistration = async (
  user: IRegistrationRequest
): Promise<IResponse | []> => {
  return await repo.userRegistration(user);
};

/**
 * Login user.
 *
 * @returns Promise
 */
export const userLogin = async (
  user: ILoginRequest
): Promise<IResponse | []> => {
  return await repo.userLogin(user);
};

/**
 * Reset user password.
 *
 * @returns Promise
 */
export const resetPassword = async (
  user: IResetPasswordRequest
): Promise<IResponse | []> => {
  return await repo.resetPassword(user);
};

/**
 * Reset user password confirmation.
 *
 * @returns Promise
 */
export const resetPasswordConfirmation = async (
  user: IResetPasswordConfirmationRequest
): Promise<IResponse | []> => {
  return await repo.resetPasswordConfirmation(user);
};

/**
 * Verify user account
 *
 * @returns Promise
 */
export const verifyAccount = async (
  verificationData: IVerificationRequest
): Promise<IResponse | []> => {
  return await repo.verifyAccount(verificationData);
};