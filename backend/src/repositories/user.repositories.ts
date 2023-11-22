/**
 * @file User repository.
 */

import {
  ILoginRequest,
  IRegistrationRequest,
  IResetPasswordConfirmationRequest,
  IResetPasswordRequest,
  IResponse,
} from '../interfaces/user.interface.js';
import { UserModel } from '../models/user.model.js';
import { sendMail } from '../services/email.services.js';
import { v4 as uuidv4 } from 'uuid';
import * as utils from '../utils/utils.js';
import { RequestError } from '../utils/errors.js';

/**
 * Creates a new user.
 *
 * @returns Promise
 */
export const userRegistration = async (
  user: IRegistrationRequest
): Promise<IResponse> => {
  try {
    const { email, password } = user;

    const existingUser = await UserModel.findUserEmail(email, [
      'user_id',
      'is_verified',
    ]);

    const hashPassword = await utils.hashPassword(password);
    const id = uuidv4();
    const user_type = 'none';
    const verification_code = await utils.optGenerator();

    if (existingUser.length > 0) {
      const { is_verified } = existingUser[0];

      if (!is_verified) {
        //resend email
        throw new RequestError({
          code: 400,
          message: 'Verification required',
        });
      } else {
        throw new RequestError({
          code: 400,
          message: 'User already exist',
        });
      }
    }

    const userData = {
      email,
      password: hashPassword,
      user_id: id,
      user_type,
      verification_code,
    };

    await UserModel.registerUser(userData);
    await sendMail({
      to: email,
      subject: 'Registration code',
      text: `This is verification code : ${verification_code}`,
    });

    return {
      code: 200,
      message: 'User created successfully',
      data: {
        email,
        user_id: id,
        user_type,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * User login
 * @return promise
 */

export const userLogin = async (payload: ILoginRequest): Promise<IResponse> => {
  try {
    const { email, password } = payload;

    const user = await UserModel.findUserEmail(email, [
      'password',
      'user_id',
      'is_verified',
      'user_email',
    ]);

    if (user.length === 0) {
      throw new RequestError({
        code: 400,
        message: 'User not found',
      });
    }

    const {
      password: hashedPassword,
      user_id,
      email: userEmail,
      is_verified,
    } = user[0];

    // if (!is_verified) {
    //   throw new RequestError({
    //     code: 400,
    //     message: 'Verification required',
    //   });
    // }

    const isCorrect = await utils.comparePassword(password, hashedPassword);
    console.log(isCorrect);
    if (!isCorrect) {
      throw new RequestError({
        code: 400,
        message: 'Invalid credentials',
      });
    }

    const token = await utils.jwtToken({
      user_id,
      email: userEmail,
    });

    await UserModel.updateAuthToken(
      {
        token,
      },
      ['token'],
      user_id
    );

    return {
      code: 200,
      message: 'login successfully',
      data: [
        {
          token,
        },
      ],
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Reset user password
 * @return promise
 */

export const resetPassword = async (
  payload: IResetPasswordRequest
): Promise<IResponse> => {
  try {
    const { email } = payload;

    const user = await UserModel.findUserEmail(email, [
      'user_id',
      'user_email',
    ]);

    if (user.length === 0) {
      throw new RequestError({
        code: 400,
        message: 'User not found',
      });
    }

    const { user_id, email: userEmail } = user[0];

    const verification_code = await utils.optGenerator();

    await sendMail({
      to: userEmail,
      subject: 'Reset password code',
      text: `this is verification code : ${verification_code}`,
    });

    // send email token

    return {
      code: 200,
      message: 'User email confirmed successfully',
      data: [],
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Reset user password confirmation
 * @return promise
 */

export const resetPasswordConfirmation = async (
  payload: IResetPasswordConfirmationRequest
): Promise<IResponse> => {
  try {
    const { password, email } = payload;

    const user = await UserModel.findUserEmail(email, [
      'user_id',
      'user_email',
    ]);

    if (user.length === 0) {
      throw new RequestError({
        code: 400,
        message: 'User not found',
      });
    }

    const columns = ['password'];
    const hashPassword = await utils.hashPassword(password);
    const values = {
      password: hashPassword,
    };

    const { user_id } = user[0];
    await UserModel.updateUser(values, columns, user_id);

    return {
      code: 200,
      message: 'User password reset successfully',
      data: [],
    };
  } catch (error) {
    throw error;
  }
};


