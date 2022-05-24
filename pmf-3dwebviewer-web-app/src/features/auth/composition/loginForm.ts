import { PASSWORD_MIN_LENGTH } from './../../../common/constants';
import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';

import { ElLoading } from 'element-plus';
import { PageName } from '@/common/constants';
import router from '@/plugins/vue-router';
import { INPUT_TEXT_MAX_LENGTH, FORM_VALIDATION } from '@/common/constants';
import yup from '@/plugins/yup';
import { authService } from '../services/api.services';
import localStorageAuthService from '@/common/authStorage';
import { showErrorNotificationFunction } from '@/common/helpers';

const validateLoginFormSchema = yup.object({
    email: yup
        .string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .matches(FORM_VALIDATION.email)
        .required()
        .label('email'),
    password: yup
        .string()
        .trim()
        .required()
        .min(PASSWORD_MIN_LENGTH)
        .max(INPUT_TEXT_MAX_LENGTH)
        .label('password'),
});

export function initData() {
    const { t } = useI18n();
    const initValues = {
        email: '',
        password: '',
    };
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateLoginFormSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const loading = ElLoading.service({
            target: '.login-form',
        });
        const response = await authService.login(values);
        loading.close();
        if (response.success) {
            localStorageAuthService.setUser(response.data?.profile);
            localStorageAuthService.setAccessToken(response.data?.accessToken.token);
            localStorageAuthService.setRefreshToken(response.data?.refreshToken.token);
            localStorageAuthService.setAccessTokenExpiredAt(
                response.data?.accessToken.expiresIn,
            );
            localStorageAuthService.setRefreshTokenExpiredAt(
                response.data?.refreshToken.expiresIn,
            );

            router.push({
                name: PageName.PROFILE_VIEW_PAGE,
            });
        } else {
            showErrorNotificationFunction(response.message as string);
        }
    });
    const { value: email } = useField('email');
    const { value: password } = useField('password');

    return {
        errors,
        email,
        password,
        validate,
        onSubmit,
        resetForm,
    };
}
