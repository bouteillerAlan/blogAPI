import {Request, Controller, Post, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Request() req): Promise<any> {
        return await this.authService.login(req.body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('validate')
    async validate(@Request() req): Promise<any> {
        return 'ok';
    }

}
