import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { AuthMongoService } from './services/auth.mongo.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserToken, UserTokenSchema } from './schema/user-token.schema.dto';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
            { name: UserToken.name, schema: UserTokenSchema },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthMongoService, JwtService],
})
export class AuthModule {}
