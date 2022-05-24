import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { UserMongoService } from './services/user.mongo.service';
import { ErrorResponse, SuccessResponse } from 'src/common/helpers/response';
import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe';
import { createUserSchema, ICreateUserDto } from './dto/request/user.write.dto';
import { HttpStatus } from 'src/common/constants';
import bcrypt from 'bcrypt';

@Controller('/user')
export class UserController {
    constructor(
        private readonly i18n: I18nRequestScopeService,
        private readonly configService: ConfigService,
        private readonly userService: UserMongoService,
    ) {
        //
    }

    @Get('/')
    async getUserList() {
        try {
            return new SuccessResponse({});
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    @Get('/:id')
    async getUserDetail() {
        try {
            return new SuccessResponse({});
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    @Post('/')
    async createUser(
        @Req() req,
        @Body(new JoiValidationPipe(createUserSchema)) body: ICreateUserDto,
    ) {
        try {
            const userInfo = { ...body };
            const isEmailExist = await this.userService.checkEmailExist(
                body?.email,
            );
            if (isEmailExist) {
                const message = await this.i18n.t(
                    'user.create.email.duplicate',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message);
            }
            userInfo.password = bcrypt.hashSync(
                userInfo.password,
                bcrypt.genSaltSync(10),
            );
            const createdUser = await this.userService.createUser({
                ...userInfo,
                createdBy: req?.loginUser?._id || 1, // TODO: remove 1 later
            });
            return new SuccessResponse(createdUser);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}
