import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy} from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../conf/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(env: ConfigService) {
        super({
            // which the jwt is extracted
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // the password module check the expiration, this class no
            ignoreExpiration: false,
            secretOrKey: env.get('secret'),
        });
    }

    // this function is call automatically by the @UseGuards(AuthGuard('jwt'))
    async validate(payload: any) {
        return { username: payload.name, userId: payload.sub, timeStamp: new Date() };
    }
}
