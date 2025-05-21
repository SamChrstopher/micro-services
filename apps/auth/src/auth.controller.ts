import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { regiterDto } from './dto/register.dto';
import {loginDto} from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() dto: regiterDto){
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto:loginDto){
        return this.authService.login(dto)
    }
}

