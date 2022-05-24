import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWinstonLogger } from 'src/common/services/winston.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../user/schema/user.schema';
import { UserToken, UserTokenDocument } from '../schema/user-token.schema.dto';
import { MODULE_NAME } from '../auth.constant';
import { JwtService } from '@nestjs/jwt';
import ConfigKey from 'src/common/config/config-key';
import { ObjectId } from 'mongodb';
const userAtributes = ['email', 'fullName'];
@Injectable()
export class AuthMongoService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(UserToken.name)
        private readonly userTokenModel: Model<UserTokenDocument>,
    ) {}
    private readonly logger = createWinstonLogger(
        MODULE_NAME,
        this.configService,
    );
    /**
     *
     * @param user
     * @return accessToken & accessTokenExpiredIn
     */
    private generateAccessToken(user: UserDocument) {
        const accessTokenExpiredIn = this.configService.get(
            ConfigKey.ACCESS_TOKEN_EXPIRED_IN,
        );
        const secretAccessTokenKey = this.configService.get(
            ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY,
        );
        const accessTokenOptions = {
            secret: secretAccessTokenKey,
            expiresIn: accessTokenExpiredIn,
        };
        const payloadAccessToken = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            expiresIn: accessTokenExpiredIn,
        };
        const accessToken = this.jwtService.sign(
            payloadAccessToken,
            accessTokenOptions,
        );
        return {
            token: accessToken,
            expiresIn: accessTokenExpiredIn,
        };
    }
    /**
     *
     * @param user
     * @param hashToken
     * @return refreshToken && refreshTokenExpiredIn
     */
    private generateRefreshToken(user: UserDocument, hashToken: string) {
        const refreshTokenExpiredIn = this.configService.get(
            ConfigKey.REFRESH_TOKEN_EXPIRED_IN,
        );
        const secretRefreshTokenKey = this.configService.get(
            ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY,
        );
        const accessTokenOptions = {
            secret: secretRefreshTokenKey,
            expiresIn: refreshTokenExpiredIn,
        };
        const payloadAccessToken = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            expiresIn: refreshTokenExpiredIn,
            hashToken,
        };
        const refreshToken = this.jwtService.sign(
            payloadAccessToken,
            accessTokenOptions,
        );
        return {
            token: refreshToken,
            expiresIn: refreshTokenExpiredIn,
        };
    }

    private generateHashToken(userId: string): string {
        return `${userId}-${Date.now()}`;
    }

    /**
     *
     * @param user User
     * @returns {user, accessToken, refreshToken}
     */

    public async login(user: UserDocument) {
        try {
            const accessToken = this.generateAccessToken(user);
            const hashToken = this.generateHashToken(user?._id);
            const refreshToken = this.generateRefreshToken(user, hashToken);
            await this.userTokenModel.create({
                userId: new ObjectId(user._id),
                token: refreshToken.token,
                hashToken,
                createdBy: new ObjectId(user._id),
            });
            return {
                user,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            this.logger.error('Error in login service', error);
            throw error;
        }
    }

    public async getUserByEmail(email: string, attributes = userAtributes) {
        try {
            const user = await this.userModel
                .findOne({
                    email: email,
                })
                .select(attributes);
            return user;
        } catch (error) {
            this.logger.error('Error in get user by email', error);
            throw error;
        }
    }

    public async checkHashToken(token: string) {
        try {
            const data = await this.jwtService.verify(token, {
                secret: this.configService.get(
                    ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY,
                ),
            });
            const isHashTokenExist =
                (await this.userTokenModel.count({
                    hashToken: data.hashToken,
                })) > 0;
            return isHashTokenExist;
        } catch (error) {
            throw error;
        }
    }

    public async refreshToken(user: UserDocument) {
        try {
            const accessToken = this.generateAccessToken(user);
            const hashToken = this.generateHashToken(user._id);
            const refreshToken = this.generateRefreshToken(user, hashToken);
            // delete old refresh token
            await this.userTokenModel.deleteMany({
                userId: new ObjectId(user._id),
            });
            // add refresh token to user_tokens table.
            await this.userTokenModel.create({
                userId: new ObjectId(user._id),
                token: refreshToken.token,
                hashToken,
                createdBy: new ObjectId(user._id),
            });
            return {
                user,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            this.logger.error('Error in refresh token service', error);
            throw error;
        }
    }

    public async logout(user: UserDocument): Promise<boolean> {
        try {
            // delete old refresh token
            await this.userTokenModel.deleteMany({
                userId: new ObjectId(user?._id),
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}
