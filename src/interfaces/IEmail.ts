
export interface IEmail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
    attachments?: Array<IEmailAttachments>;
}

export interface IEmailAttachments {
    filename: string;
    path: string;
}

