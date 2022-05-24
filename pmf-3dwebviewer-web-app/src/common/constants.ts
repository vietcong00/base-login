export const INPUT_TEXT_MAX_LENGTH = 255;
export const PASSWORD_MIN_LENGTH = 10;

export enum PageName {
    LOGIN_PAGE = 'LoginPage',
    PROFILE_VIEW_PAGE = 'ProfileViewPage',
}

export enum SUPPORT_LANGUAGE {
    FR = 'fr',
    EN = 'en',
}

export const DEFAULT_LANGUAGE = SUPPORT_LANGUAGE.EN;

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    GROUP_HAS_CHILDREN = 410,
    GROUP_MAX_LEVEL = 411,
    GROUP_MAX_QUANTITY = 412,
    AWS_ERROR = 413,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_INVALID = 446,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum DATE_TIME_FORMAT {
    YYYY_MM_DD_HYPHEN = 'YYYY_MM_DD',
    DD_MM_YYYY_DASH = 'DD/MM/YYYY',
    hh_mm_L_COLON = 'h:mm L',
    DD_MM_YY_DASH = 'DD/MM/YYYY',
    hh_mm = 'hh:mm',
    DD = 'DD',
    DAY_NAME_MONTH_STRING = 'dddd (DD-MM)',
    YYYY = 'YYYY',
    YYYY_MM_HYPHEN = 'YYYY-MM',
    HH_MM_SS_COLON = 'HH:mm:ss',
    HH_MM_COLON = 'HH:mm',
    YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON = 'YYYY-MM-DD HH:mm:ss',
    YYYY_MM_DD_HYPHEN_HH_MM_COLON = 'YYYY-MM-DD HH:mm',
    DD_MM_YYYY_SLASH = 'DD/MM/YYYY',
}

export const FORM_VALIDATION = {
    textMaxLength: 255,
    textAreaMaxLength: 2000,
    passwordMinLength: 6,
    phoneRegExp:
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    nameRegExp: /^([^!@`~#$:%^*&()<>?\\/\\+|=]+?)$/,
    specialCharacters: /[~`!@#$%^&*()+={}[\];:'"<>.,/\\?-_]/g,
    email: /^(([a-zA-Z0-9]+)([.]{1})?)*[a-zA-Z0-9]@([a-zA-Z0-9]+[.])+[a-zA-Z0-9]+$/,
};

export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export const INTEGER_ALLOW_CODES = [
    // Character 0-9  in Numpad
    'Numpad0',
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Numpad6',
    'Numpad7',
    'Numpad8',
    'Numpad9',

    // Character 0-9
    'Digit0',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',

    // Character control
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
];

export const DECIMAL_ALLOW_CODES = [
    // Character 0-9  in Numpad
    'Numpad0',
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Numpad6',
    'Numpad7',
    'Numpad8',
    'Numpad9',

    // Character 0-9
    'Digit0',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',

    // Character decimal
    'NumpadDecimal',
    'Period',

    // Character control
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
];

// textarea
export const TEXTAREA_DEFAULT_ROWS = 3;
export const TEXTAREA_MAX_ROW = 10;
export const TEXTAREA_MAX_LENGTH = 2000;
