import type { IEmail } from "../interfaces/IEmail";
import { EmailUtil } from "../utils/EmailUtil";

export class EmailService {

    /**
     * EmailUtil property
     * @private
     * @type {NodeMailer}
     */
    private emailUtil: EmailUtil;
    /**
     * Instantiates EmailService
     * @constructor
     * @returns void
     */
    constructor() {
        this.emailUtil = new EmailUtil();
    }

    public sendEmail = async (email: IEmail): Promise<boolean> => {
        try {
            return await new Promise<boolean>((resolve, _reject) => {
                this.emailUtil.sendEmail(email).then((result: boolean) => {
                    resolve(result);
                })
            });
        } catch (error) {
            return true
        }
    }
}