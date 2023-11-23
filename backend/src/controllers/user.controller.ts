import { Request, Response } from 'express';
import * as apiUtils from '../utils/utils.js';
import * as userServices from '../services/user.services.js';
import { DataBaseError, RequestError } from '../utils/errors.js';

/**
 * Post handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const payload = {
      email,
      password,
    };
    const registration_information =
      await userServices.userRegistration(payload);

    res
      .status(200)
      .json(apiUtils.buildSuccessResponse(registration_information));
  } catch (error) {
    if (error instanceof DataBaseError) {
      return res
        .status(422)
        .json(apiUtils.buildErrorResponse(['Server error']));
    } else if (error instanceof RequestError) {
      return res
        .status(error.code ?? 200)
        .json(apiUtils.buildErrorResponse(error));
    } else {
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};

/**
 * Post handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const payload = {
      email,
      password,
    };
    const login_information = await userServices.userLogin(payload);

    res.status(200).json(apiUtils.buildSuccessResponse(login_information));
  } catch (error) {
    if (error instanceof DataBaseError) {
      return res
        .status(422)
        .json(apiUtils.buildErrorResponse(['Server error']));
    } else if (error instanceof RequestError) {
      return res
        .status(error.code ?? 200)
        .json(apiUtils.buildErrorResponse(error));
    } else {
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};

/**
 * Post handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const payload = {
      email,
    };
    const reset_password_information =
      await userServices.resetPassword(payload);

    res
      .status(200)
      .json(apiUtils.buildSuccessResponse(reset_password_information));
  } catch (error) {
    if (error instanceof DataBaseError) {
      return res
        .status(422)
        .json(apiUtils.buildErrorResponse(['Server error']));
    } else if (error instanceof RequestError) {
      return res
        .status(error.code ?? 200)
        .json(apiUtils.buildErrorResponse(error));
    } else {
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};

/**
 * Post handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const resetPasswordConfirmation = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const payload = {
      password,
      email,
    };
    const reset_password_information =
      await userServices.resetPasswordConfirmation(payload);

    res
      .status(200)
      .json(apiUtils.buildSuccessResponse(reset_password_information));
  } catch (error) {
    if (error instanceof DataBaseError) {
      return res
        .status(422)
        .json(apiUtils.buildErrorResponse(['Server error']));
    } else if (error instanceof RequestError) {
      return res
        .status(error.code ?? 200)
        .json(apiUtils.buildErrorResponse(error));
    } else {
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};


/**
 * Post handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const verifyAccount = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, code } = req.body;
    const payload = {
      code,
      email,
    };
    
    const verification_information =
      await userServices.verifyAccount(payload);

    res
      .status(200)
      .json(apiUtils.buildSuccessResponse(verification_information));
  } catch (error) {
    if (error instanceof DataBaseError) {
      return res
        .status(422)
        .json(apiUtils.buildErrorResponse(['Server error']));
    } else if (error instanceof RequestError) {
      return res
        .status(error.code ?? 200)
        .json(apiUtils.buildErrorResponse(error));
    } else {
      return res
        .status(500)
        .json(apiUtils.buildErrorResponse(['Server error']));
    }
  }
};




