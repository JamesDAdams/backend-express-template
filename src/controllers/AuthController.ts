import { JsonController, Post, Body, HeaderParam } from 'routing-controllers';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { AuthService } from '../services';

@JsonController('/auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<unknown> {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  logout(@HeaderParam('authorization') token: string): Promise<unknown> {
    return this.authService.logout(token);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto): Promise<unknown> {
    return this.authService.register(registerDto);
  }
}
