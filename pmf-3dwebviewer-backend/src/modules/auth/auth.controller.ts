import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { HttpStatus } from 'src/common/constants';
import { ErrorResponse, SuccessResponse } from 'src/common/helpers/response';
import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe';
import { ILoginDto, loginSchema } from './request/auth.write.dto';
import { AuthMongoService } from './services/auth.mongo.service';
import bcrypt from 'bcrypt';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { extractToken } from 'src/common/helpers/commonFunctions';

@Controller('/')
export class AuthController {
    constructor(
        private readonly i18n: I18nRequestScopeService,
        private readonly configService: ConfigService,
        private readonly authService: AuthMongoService,
    ) {
        //
    }

    @Get('/profile')
    async getProfile() {
        try {
            return new SuccessResponse({});
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    @Post('/login')
    async createUser(
        @Body(new JoiValidationPipe(loginSchema)) body: ILoginDto,
    ) {
        try {
            const user = await this.authService.getUserByEmail(body.email, [
                'password',
            ]);
            // check if user exists?
            if (!user) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(
                    HttpStatus.INVALID_USERNAME_OR_PASSWORD,
                    message,
                    [],
                );
            }
            // check password is correct?
            if (user.password) {
                const isCorrectPassword = await bcrypt.compare(
                    body.password,
                    user.password,
                );
                if (!isCorrectPassword) {
                    const message = await this.i18n.translate(
                        'auth.errors.user.notFound',
                    );
                    return new ErrorResponse(
                        HttpStatus.INVALID_USERNAME_OR_PASSWORD,
                        message,
                        [],
                    );
                }
            }
            const returnedUser = await this.authService.getUserByEmail(
                body?.email,
            );
            const {
                user: profile,
                accessToken,
                refreshToken,
            } = await this.authService.login(returnedUser);
            return new SuccessResponse({ profile, accessToken, refreshToken });
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    @Post('refresh-token')
    @UseGuards(AuthenticationGuard)
    async refreshToken(@Req() req) {
        try {
            const loginUser = req.loginUser;
            const isHashTokenExist = this.authService.checkHashToken(
                extractToken(req.headers.authorization),
            );
            if (!isHashTokenExist) {
                const message = await this.i18n.translate(
                    'auth.errors.auth.hashToken.notExist',
                );
                return new ErrorResponse(HttpStatus.UNAUTHORIZED, message, []);
            }
            const {
                user: profile,
                accessToken,
                refreshToken,
            } = await this.authService.refreshToken(loginUser);

            return new SuccessResponse({ profile, accessToken, refreshToken });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('logout')
    @UseGuards(AuthenticationGuard)
    async logout(@Req() req) {
        try {
            const loginUser = req.loginUser;
            const result = await this.authService.logout(loginUser);
            return new SuccessResponse(result);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
