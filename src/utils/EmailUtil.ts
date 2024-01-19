import type { IEmail } from "../interfaces/IEmail";
const nodemailer = require('nodemailer');

export class EmailUtil {

    constructor(
        private readonly transporter = nodemailer.createTransport({
            port: process.env["EMAIL_SERVER_PORT"],
            host: process.env["EMAIL_SERVER_HOST"],
            auth: {
                user: process.env["EMAIL_SERVER_USER"],
                pass: process.env["EMAIL_SERVER_PASSWORD"],
            },
            secure: process.env["EMAIL_SERVER_SECURE"],
        })
    ) {
    }

    public sendEmail = async (email: IEmail): Promise<boolean> => {
        if(process.env["EMAIL_FROM"]) {
            email.from = process.env["EMAIL_FROM"];
        }
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
            return true
        }
    }
}
