import { common as commonEn } from '../../common/locale/en/common.en';
import { app as appEn } from '../../common/locale/en/app.en';
import { yupEn } from '../yup/locale/en';
import { fields as yupFieldsEn } from '../yup/locale/fields.en';
import { login as loginEn } from '@/features/auth/locale/en/login.en';
import { auth as authEn } from '@/features/auth/locale/en/auth.en';

import { common as commonFr } from '../../common/locale/fr/common.fr';
import { app as appFr } from '../../common/locale/fr/app.fr';
import { yupFr } from '../yup/locale/fr';
import { fields as yupFieldsFr } from '../yup/locale/fields.fr';
import { login as loginFr } from '@/features/auth/locale/fr/login.fr';
import { auth as authFr } from '@/features/auth/locale/fr/auth.fr';

const messages = {
    en: {
        app: appEn,
        common: commonEn,
        yup: yupEn,
        yupFields: yupFieldsEn,
        login: loginEn,
        auth: authEn,
    },
    fr: {
        app: appFr,
        common: commonFr,
        yup: yupFr,
        yupFields: yupFieldsFr,
        login: loginFr,
        auth: authFr,
    },
};

export default messages;
