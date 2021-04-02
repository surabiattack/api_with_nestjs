import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';
import { SearchModule } from './search/search.module';

@Module({
    imports: [
        PostsModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                PORT: Joi.number(),
                JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
                JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
                JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
            }),
        }),
        DatabaseModule,
        UsersModule,
        AuthenticationModule,
        CategoriesModule,
        SearchModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
