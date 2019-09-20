import {Request, Controller, Post, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // give the jwt
    @Post()
    async login(@Request() req): Promise<any> {
        return await this.authService.login(req.body);
    }

    // just for test, return the user
    @UseGuards(AuthGuard('jwt'))
    @Get('validate')
    async validate(@Request() req): Promise<any> {
        // req.user is predefined
        return req.user;
    }

}
