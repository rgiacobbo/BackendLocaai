import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<string>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(name: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.usersService.findByUserName(name);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, name: foundUser.name };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
