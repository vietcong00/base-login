import MainLayout from '@/layouts/MainLayout.vue';
import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../../layouts/AuthLayout.vue';
import LoginPage from './pages/LoginPage.vue';
import ProfilePage from './pages/ProfilePage.vue';

const authRouters: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: PageName.LOGIN_PAGE,
                component: LoginPage,
            },
        ],
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/profile',
                name: PageName.PROFILE_VIEW_PAGE,
                component: ProfilePage,
                meta: {
                    breadcrumb: [
                        {
                            index: 1,
                            text: 'auth.breadcrumb.viewProfile',
                            link: '',
                        },
                    ],
                },
            },
        ],
    },
];

export default authRouters;
