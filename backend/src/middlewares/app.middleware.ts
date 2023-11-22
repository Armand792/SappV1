import { NextFunction, Response, Request } from 'express';
import { buildErrorResponse } from '../utils/utils.js';

/**
 * AllowedHttpMethods middleware.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const allowedHttpMethods = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedMethods = ['POST', 'GET', 'PUT', 'DELETE'];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json(buildErrorResponse(['Method Not Allowed']));
  }
  return next();
};

/**
 * AllowedContentType middleware.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const allowedContentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (req.method === 'POST' || req.method === 'PUT') {
  //   return res
  //     .status(415)
  //     .json(buildErrorResponse(['Unsupported Content-Type']));
  // }
  return next();
};
