import sendGrid from '@sendgrid/mail';
import { BaseError, RequestError } from '../utils/errors.js';
interface IEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendMail = async function ({
  to,
  subject,
  text = '',
  html = '',
}: IEmailOptions): Promise<void> {
  try {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY ?? '');

    const options = {
      to,
      from: 'benjamin.mai@worthycause.com',
      subject,
      text,
    };

    await sendGrid.send(options);
  } catch (error: any) {
    throw new BaseError({
      code: 422,
      message: 'Email provider failed',
    });
  }
};
