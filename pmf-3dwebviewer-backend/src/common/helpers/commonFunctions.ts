import momentTimezone from 'moment-timezone';
import { DateFormat } from '../constants';

import dotenv from 'dotenv';
import { IMongoKeywordCondition } from '../dto/types';
dotenv.config();

const DEFAULT_TIMEZONE_NAME = process.env.TIMEZONE_DEFAULT_NAME;

export function extractToken(authorization = '') {
    if (/^Bearer /.test(authorization)) {
        return authorization.substring(7, authorization.length);
    }
    return '';
}

export function convertTimeToUTC(time: string | Date) {
    return momentTimezone.tz(time, 'UTC').toDate();
}

export function isEndOfDay(
    dateTime: string | Date,
    tzName = DEFAULT_TIMEZONE_NAME,
) {
    const time = momentTimezone
        .tz(convertTimeToUTC(dateTime), tzName)
        .format(DateFormat.HH_mm_ss_COLON);
    return /23:59:59/.test(time);
}

export function isStartOfDay(
    dateTime: string | Date,
    tzName = DEFAULT_TIMEZONE_NAME,
) {
    const time = momentTimezone
        .tz(convertTimeToUTC(dateTime), tzName)
        .format(DateFormat.HH_mm_ss_COLON);
    return /00:00:00/.test(time);
}

/**
 * usecase: convert value of $select operator to value of $project operator in mongodb
 * example: ['_id', 'name'] => {
 *      _id: 1,
 *      name: 1,
 * }
 * @param attributeList attributes list select from mongo collection
 * @returns attributes list in $project operation
 */
export const parseMongoProjection = (
    attributeList: string[],
): Record<string, number> => {
    let rs = {};
    attributeList.forEach((val) => {
        rs = {
            ...rs,
            [val]: 1,
        };
    });

    return rs;
};

export function getTotalSkipItem(page: number, limit: number) {
    return page > 0 ? (page - 1) * limit : 0;
}

/**
 *
 * @param fields in db will be searched
 * @param keyword will be matched
 * @param option of regex (default i: Case insensitivity to match upper and lower cases)
 * @returns conditions by an array which used in query ($or/$and)
 */
export function getMongoKeywordConditions(
    fields: string[],
    keyword = '',
    option = 'i',
): IMongoKeywordCondition[] {
    return fields.reduce((conditions, field) => {
        const condition = { [field]: { $regex: keyword, $options: option } };
        conditions.push(condition);
        return conditions;
    }, []);
}
