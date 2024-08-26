import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
<<<<<<< HEAD
  signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): AuthResponseDto {
    return this.authService.signIn(username, password);
=======
  async signIn(
    @Body('name') name: string,
    @Body('password') password: string,
  ): Promise<AuthResponseDto> {
    return this.authService.signIn(name, password);
>>>>>>> 3c705c6 (CRUD realty)
  }
}
