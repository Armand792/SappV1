/**
 * @file User repository.
 */

import {
  IContinueWithGoogleRequest,
  ILoginRequest,
  IRegistrationRequest,
  IResetPasswordConfirmationRequest,
  IResetPasswordRequest,
  IResponse,
  IVerificationRequest,
} from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import { sendMail } from '../services/email.services';
import { v4 as uuidv4 } from 'uuid';
import * as utils from '../utils/utils';
import { RequestError } from '../utils/errors';

/**
 * ContinueWithGoogle signin and signup
 * @return promise
 */

export const continueWithGoogle = async (
  payload: IContinueWithGoogleRequest
): Promise<IResponse> => {
  try {
    const { email, token } = payload;

    const user = await UserModel.findUserEmail(email, [
      'user_id',
      'user_email',
    ]);

    if (user.length === 0 && email !== '') {
      // throw new RequestError({
      //   code: 400,
      //   message: 'Not allowed to login, you have to register',
      // });

      const id = uuidv4();
      const user_type = 'none';

      const userData = {
        email,
        user_id: id,
        user_type,
        token,
        is_verified: true,
      };

      await UserModel.continueWithGoogle(userData);

      return {
        code: 200,
        message: 'login successfully',
        data: [
          {
            token,
            user_id: id,
          },
        ],
      };
    } else {
      const { user_id } = user[0];
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
            user_id,
          },
        ],
      };
    }

   

  
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
      message: 'successfully Registered',
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

    if (!is_verified) {
      throw new RequestError({
        code: 400,
        message: 'Verification required',
      });
    }

    const isCorrect = await utils.comparePassword(password, hashedPassword);

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
          user_id,
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
      'is_verified',
    ]);

    if (user.length === 0) {
      throw new RequestError({
        code: 400,
        message: 'User not found',
      });
    }

    const { user_id, user_email: userEmail, is_verified } = user[0];

    if (!is_verified) {
      throw new RequestError({
        code: 400,
        message: 'Verification required',
      });
    }

    const verification_code = await utils.optGenerator();
    await UserModel.updateAuthToken(
      {
        verification_code,
      },
      ['verification_code'],
      user_id
    );

    await sendMail({
      to: userEmail,
      subject: 'Reset password code',
      text: `this is verification code : ${verification_code}`,
    });

    return {
      code: 200,
      message: 'Reset password code sent successfully',
      data: [],
    };
  } catch (error) {
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
    const { password, email, code } = payload;

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

    const { user_id } = user[0];

    const verificationData = await UserModel.findUserVerificationById(user_id, [
      'verification_code',
    ]);

    if (verificationData.length === 0) {
      throw new RequestError({
        code: 400,
        message: 'User not found',
      });
    }

    const { verification_code } = verificationData[0];

    if (verification_code !== code) {
      throw new RequestError({
        code: 400,
        message: 'Invalid verification code',
      });
    }

    const columns = ['password'];
    const hashPassword = await utils.hashPassword(password);
    const values = {
      password: hashPassword,
    };

    await UserModel.updateUser(values, columns, user_id);

    await UserModel.updateAuthToken(
      {
        verification_code: '',
      },
      ['verification_code'],
      user_id
    );

    return {
      code: 200,
      message: 'User password reset successfully',
      data: [],
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Verify user account
 * @return promise
 */

export const verifyAccount = async (
  payload: IVerificationRequest
): Promise<IResponse> => {
  try {
    const { code, email } = payload;

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

    const { user_id } = user[0];

    const verificationData = await UserModel.findUserVerificationById(user_id, [
      'verification_code',
    ]);

    if (verificationData.length === 0) {
      throw new RequestError({
        code: 400,
        message: 'User not found',
      });
    }

    const { verification_code } = verificationData[0];

    if (verification_code !== code) {
      throw new RequestError({
        code: 400,
        message: 'Invalid verification code',
      });
    }

    await UserModel.updateUser(
      {
        is_verified: true,
      },
      ['is_verified'],
      user_id
    );

    return {
      code: 200,
      message: 'User verified successfully',
      data: [],
    };
  } catch (error) {
    throw error;
  }
};
