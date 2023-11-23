/**
 * @file user routes
 */
import { Router } from 'express';
import { validateSchema, whitelist } from '../utils/utils.js';
import {
  createUser,
  loginUser,
  resetPassword,
  resetPasswordConfirmation,
  verifyAccount,
} from '../controllers/user.controller.js';
import {
  LoginSchema,
  RegistrationSchema,
  ResetPasswordConfirmationSchema,
  ResetPasswordSchema,
  VerificationSchema,
} from '../schemas/user.schema.js';

const router = Router();

router
  .route('/register')
  .post([validateSchema(RegistrationSchema)], createUser);

router.route('/login').post([validateSchema(LoginSchema), loginUser]);

router
  .route('/verify-account')
  .post([validateSchema(VerificationSchema), verifyAccount]);

router
  .route('/reset-password')
  .post([validateSchema(ResetPasswordSchema), resetPassword]);

  
router
  .route('/reset-password-confirmation')
  .post([
    validateSchema(ResetPasswordConfirmationSchema),
    resetPasswordConfirmation,
  ]);

export default router;
