import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

//Nest js Inject this strategy via dependency injection. -storing the environment stuff in nest js to .env file
//create jwt strategy for validating the token
//set up the auth guard using passport
//Add @use guard to secure
//@Req(), or @User to access the current user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret_key = configService.get<string>('JWT_SECRET')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret_key || 'fallback_secret'
    });
  }
  async validate(payload: any) {
    return { email: payload.email, role: payload.role };
  }
}
