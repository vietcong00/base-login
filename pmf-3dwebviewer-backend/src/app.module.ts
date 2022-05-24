import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from './common/services/i18n.service';
import { WinstonModule } from './common/services/winston.service';
import envSchema from './common/config/validation-schema';
import { AppController } from './app.controller';
import { HeaderMiddleware } from './common/middleware/header.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions.filter';
import { MongoModule } from './common/services/mongo.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import mongoose from 'mongoose';
import ConfigKey from './common/config/config-key';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            validationSchema: envSchema,
        }),
        WinstonModule,
        I18nModule,
        MongoModule,
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
    ],
    exports: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HeaderMiddleware).forRoutes('*');
        mongoose.set('debug', process.env[ConfigKey.MONGO_DEBUG] === 'enable');
    }
}
