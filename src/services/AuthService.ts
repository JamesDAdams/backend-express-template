import { UnauthorizedError, InternalServerError } from 'routing-controllers';
import bcryptjs from 'bcryptjs';
import { UserService } from '../services';
import { generateJWT, TokenBlacklistService } from '../utils/Jwt';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { IUserWithoutPassword } from '../interfaces/IUser';
import { log } from '../app';

export class AuthService {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(loginDto: LoginDto): Promise<unknown> {
    try {
      const { email, password } = loginDto;

      // Find user by email and get their id, email and password
      const user: any = await this.userService.getByEmail(email);

      // User doesn't exist
      if (!user) {
        throw new UnauthorizedError('Invalid credentials');
      }

      // Verify password hash
      const verifyPassword = bcryptjs.compareSync(password, user.password);

      // Wrong password
      if (!verifyPassword) {
        throw new UnauthorizedError('Invalid credentials');
      }

      // Generate JWT
      let token: string;
      try {
        token = await generateJWT(user);
      } catch (jwtError) {
        if (jwtError instanceof Error) {
          throw new InternalServerError(
            `Error while generating token: ${jwtError.message}`,
          );
        }
        throw new InternalServerError('Unknown error while generating token');
      }

      const { password: userPassword, ...userWithoutPassword } = user;

      return {
        ok: 1,
        token: `Bearer ${token}`,
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new InternalServerError(`Error ${error}`);
    }
  }

  async logout(token: string): Promise<unknown> {
    try {
      if (!token) {
        throw new UnauthorizedError('No token provided');
      }

      // Remove 'Bearer ' prefix if present
      const cleanToken = token.replace('Bearer ', '');

      // Add token to blacklist
      TokenBlacklistService.addToBlacklist(cleanToken);

      return {
        ok: 1,
        message: 'Successfully logged out',
      };
    } catch (error) {
      throw new InternalServerError(`Error during logout: ${error}`);
    }
  }

  async register(registerDto: RegisterDto): Promise<unknown> {
    try {
      console.log('Registering user:', registerDto);
      const user = await this.userService.create({
        ...registerDto
      });
      console.log('User created:', user);

      // Générer le JWT
      let token: string;
      try {
        token = await generateJWT(user);
      } catch (jwtError) {
        if (jwtError instanceof Error) {
          throw new InternalServerError(
            `Error while generating token: ${jwtError.message}`,
          );
        }
        throw new InternalServerError('Unknown error while generating token');
      }

      const { password: userPassword, ...userWithoutPassword } = user;

      return {
        ok: 1,
        token: `Bearer ${token}`,
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new InternalServerError(`Error registering user: ${error}`);
    }
  }
}
