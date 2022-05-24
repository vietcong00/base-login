import { INPUT_TEXT_MAX_LENGTH, Regex } from 'src/common/constants';
import { ICommonListQuery } from 'src/common/interface';

import Joi from 'src/plugins/joi';
export type IUserQueryDto = ICommonListQuery;

export interface ICreateUserDto {
    email: string;
    password: string;
    fullName: string;
    createdBy: string;
}

export const createUserSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .max(INPUT_TEXT_MAX_LENGTH)
        .regex(Regex.EMAIL, 'auth.login.email.isEmail')
        .required(),
    password: Joi.string()
        .regex(Regex.PASSWORD)
        .max(INPUT_TEXT_MAX_LENGTH)
        .required(),
    fullName: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional(),
});

export interface IUpdateUserDto {
    fullName: string;
}

export const updateProfileSchema = Joi.object().keys({});
