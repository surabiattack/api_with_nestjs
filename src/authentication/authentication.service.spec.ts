import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    const authenticationService = new AuthenticationService(
        new UsersService(new Repository<User>()),
        new JwtService({
            secretOrPrivateKey: 'admin',
        }),
        new ConfigService(),
    );
    describe('when creating a cookie', () => {
        it('should return a string', () => {
            const userId = 1;
            expect(typeof authenticationService.getCookieWithJwtAccessToken(userId)).toEqual('string');
        });
    });
});
