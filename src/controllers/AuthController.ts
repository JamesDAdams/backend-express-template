import { JsonController, Post, Body } from 'routing-controllers';
import { LoginDto } from '../dtos/LoginDto';
import { AuthService } from '../services';

@JsonController('/auth')
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{}> {
    return this.authService.login(loginDto);
  }
}
