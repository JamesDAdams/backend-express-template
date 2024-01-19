/**
 * IEmail interface
 * @interface
 */
export interface IEmail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
    attachments?: Array<IEmailAttachments>;
}

/**
 * IEmailAttachments interface
 * @interface
 */
export interface IEmailAttachments {
    filename: string;
    path: string;
}

