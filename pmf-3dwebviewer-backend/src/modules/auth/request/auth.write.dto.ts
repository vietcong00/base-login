import { INPUT_TEXT_MAX_LENGTH, Regex } from 'src/common/constants';
import { ICommonListQuery } from 'src/common/interface';

import Joi from 'src/plugins/joi';
export type IUserQueryDto = ICommonListQuery;

export interface ILoginDto {
    email: string;
    password: string;
}

export const loginSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .regex(Regex.EMAIL, 'auth.login.email.isEmail')
        .max(INPUT_TEXT_MAX_LENGTH)
        .required(),
    password: Joi.string()
        .regex(Regex.PASSWORD)
        .max(INPUT_TEXT_MAX_LENGTH)
        .required(),
});
