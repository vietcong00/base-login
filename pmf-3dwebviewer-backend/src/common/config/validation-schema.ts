import Joi from 'joi';
import ConfigKey from './config-key';

export default Joi.object({
    [ConfigKey.PORT]: Joi.number().default(3000),
    [ConfigKey.VERSION]: Joi.string().required(),
    [ConfigKey.BASE_PATH]: Joi.string().required(),
    [ConfigKey.CORS_WHITELIST]: Joi.string().required(),
    [ConfigKey.LOG_LEVEL]: Joi.string()
        .valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
        .required(),
    [ConfigKey.MONGO_DATABSE_CONNECTION_STRING]: Joi.string().required(),
    [ConfigKey.MONGO_DEBUG]: Joi.string().valid('enable', 'disable'),
});
