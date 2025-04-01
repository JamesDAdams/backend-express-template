import crypto from 'crypto';

export class GravatarService {

    async getGravatarUrl(email: string, size: number = 80): Promise<string> {
        const trimmedEmail = email.trim().toLowerCase();
        const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
    }

}