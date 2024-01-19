import { UnauthorizedError, InternalServerError } from 'routing-controllers';
import bcryptjs from 'bcryptjs';
import { UserService } from '../services';
import { generateJWT } from '../utils/GenerateJWT';
import { LoginDto } from '../dtos/LoginDto';

export class AuthService {
  async login(loginDto: LoginDto): Promise<{}> {
    try {
      const { email, password } = loginDto;

      // Find user by email and get their id, email and password
      const userService = new UserService();
      const user: any = await userService.getByEmail(email);

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
      const token = await generateJWT(user.uuid);

      return {
        ok: 1,
        token: `Bearer ${token}`,
      };
    } catch (error) {
      throw new InternalServerError(`Error ${error}`);
    }
  }

}
