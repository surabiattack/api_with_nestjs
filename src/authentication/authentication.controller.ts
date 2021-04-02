import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './jwt.authentication.guard';
import JwtRefreshGuard from './jwt.refresh.guard';
import { LocalAuthenticationGuard } from './local.authentication.guard';
import RequestWithUser from './request.with.user.interface';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService, private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async login(@Req() request: RequestWithUser) {
        const { user } = request;
        const accessTokencookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
        const { cookie: refreshTokenCookie, token: refreshToken } = this.authenticationService.getCookieWithJwtRefreshToken(user.id);

        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

        request.res.setHeader('Set-Cookie', accessTokencookie);
        // user.password = undefined;
        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logout(@Req() request: RequestWithUser) {
        await this.usersService.removeRefreshToken(request.user.id);
        return request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogout());
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    refresh(@Req() request: RequestWithUser) {
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id);

        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return request.user;
    }
}
