import jwt, { Secret, SignOptions} from 'jsonwebtoken';
import { IUser, JwtPayload } from '../interfaces/IUser';
import { StringValue } from 'ms';

export const generateJWT = async (user: IUser): Promise<string> => {
  const secret = process.env['JWT_SECRET_KEY'];
  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }

  return new Promise<string>((resolve, reject) => {
    const userCopy = { ...user };
    delete userCopy.password;
    const payload = { user: userCopy };

    const options: SignOptions = {
      expiresIn: (process.env['JWT_TIME_EXPIRE'] as StringValue) || '1h'
    };

    jwt.sign(
      payload,
      secret as Secret,
      options,
      (err, token) => {
        if (err || !token) {
          reject(new Error(err?.message ?? 'Token generation failed'));
          return;
        }
        resolve(token);
      }
    );
  });
};

export const verifyJWT = (token: string): JwtPayload => {
  const secret = process.env['JWT_SECRET_KEY'];
  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }
  return jwt.verify(token, secret as Secret) as JwtPayload;
};

export class TokenBlacklistService {
  private static readonly blacklistedTokens: Set<string> = new Set();

  static addToBlacklist(token: string): void {
    this.blacklistedTokens.add(token);
  }

  static isBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }
}
