import nodemailer from 'nodemailer';
interface IEmailOptions {
  to: string;
  subject: string;
  type: string;
  text?: string;
}
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nwaforaugutine922@gmail.com',
    pass: 'Austinebase@321?..',
  },
});

export const sendMail = async function ({
  to,
  subject,
  text = '',
}: IEmailOptions) {
  try {
    let mailDetails = {
      from: 'nwaforaugutine922@gmail.com',
      to,
      subject,
      text: text,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
        console.log('Error Occurs');
      } else {
        console.log('Email sent successfully');
      }
    });
  } catch (error) {}
};
