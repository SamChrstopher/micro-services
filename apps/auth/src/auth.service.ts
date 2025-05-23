import { Inject, Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { regiterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: regiterDto) {
    const { username, email, password } = registerDto;

    // Check if user exists
    const existingUser = await firstValueFrom(
      this.userClient.send({ cmd: 'find-user-by-email' }, email),
    );

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await firstValueFrom(
      this.userClient.send(
        { cmd: 'create-user' },
        { username, email, password: hashedPassword, role: 'customer' },
      ),
    );

    // Generate JWT token
    const token = this.jwtService.sign({
      email: user.email,
      role: user.role,
    });

    return {
      message: 'User registered successfully',
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    };
  }

  async login(loginDto: loginDto) {
    const { email, password } = loginDto;

    // Fetch the user by email
    const user = await firstValueFrom(
      this.userClient.send({ cmd: 'find-user-by-email' }, email),
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}