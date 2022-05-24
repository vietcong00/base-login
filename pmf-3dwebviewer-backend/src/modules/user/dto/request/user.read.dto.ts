import { CommonListQuerySchema } from 'src/common/constants';
import Joi from 'src/plugins/joi';
import { UserOrderBy } from '../../user.constant';

export const userListQuerySchema = Joi.object().keys({
    ...CommonListQuerySchema,
    orderBy: Joi.string()
        .valid(...Object.values(UserOrderBy))
        .optional(),
});
