import { ConflictException, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { regiterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: regiterDto) {
    const { username, email, password } = registerDto;

    const existingUser = await firstValueFrom(
      this.userClient.send({ cmd: 'find-by-email' }, email),
    );

    if (existingUser) {
      throw new ConflictException('Email Already Registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await firstValueFrom(
      this.userClient.send({ cmd: 'user-create' }, {
        username,
        email,
        password: hashedPassword,
      }),
    );

    return {
      message: 'User Created Successfully',
      user: { username: user.username, email: user.email },
    };
  }

  async login(loginDto: loginDto) {
    const { email, password } = loginDto;

    const user = await firstValueFrom(
      this.userClient.send({ cmd: 'find-by-email' }, email),
    );

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload = { email: user.email, role: user.role };

    const token = this.jwtService.sign(payload);

    return {
      message: 'User Logged In Successfully',
      user: {
        username: user.username,
        email: user.email,
        token: token,
      },
    };
  }
}
