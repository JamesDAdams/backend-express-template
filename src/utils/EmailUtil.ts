import type { IEmail } from '../interfaces/IEmail';
const nodemailer = require('nodemailer');

export class EmailUtil {
  public transporter: any;

  constructor() {
    if (process.env.NODE_ENV === 'dev') {
      this.transporter = nodemailer.createTransport({
        port: process.env['EMAIL_SERVER_PORT'],
        host: process.env['EMAIL_SERVER_HOST'],
        secure: process.env['EMAIL_SERVER_SECURE'] === 'true' ? true : false,
      });
    } else {
      this.transporter = nodemailer.createTransport({
        port: process.env['EMAIL_SERVER_PORT'],
        host: process.env['EMAIL_SERVER_HOST'],
        auth: {
          user: process.env['EMAIL_SERVER_USER'],
          pass: process.env['EMAIL_SERVER_PASSWORD'],
        },
        secure: process.env['EMAIL_SERVER_SECURE'] === 'true' ? true : false,
      });
    }
  }

  public sendEmail = async (email: IEmail): Promise<boolean> => {
    email.from = process.env['EMAIL_SERVER_FROM'] ?? '';
    try {
      return await new Promise<boolean>((resolve, reject) => {
        this.transporter.sendMail(email, (err: any, _info: any) => {
          if (err) {
            reject(err); // Reject the promise with the error
          } else {
            resolve(true); // Resolve the promise with a boolean value
          }
        });
      });
    } catch (error) {
      return true;
    }
  };
}
