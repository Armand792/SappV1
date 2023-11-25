/**
 * @file user routes
 */
import { Router } from 'express';
import { validateSchema, whitelist } from '../utils/utils.js';
import {
  continueWithGoogle,
  createUser,
  loginUser,
  resetPassword,
  resetPasswordConfirmation,
  verifyAccount,
} from '../controllers/user.controller.js';
import {
  ContinueWithGoogleSchema,
  LoginSchema,
  RegistrationSchema,
  ResetPasswordConfirmationSchema,
  ResetPasswordSchema,
  VerificationSchema,
} from '../schemas/user.schema.js';

const router = Router();

router
  .route('/continue-with-google')
  .post([validateSchema(ContinueWithGoogleSchema)], continueWithGoogle);

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
