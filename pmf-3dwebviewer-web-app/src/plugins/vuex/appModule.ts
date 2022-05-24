import { SUPPORT_LANGUAGE } from './../../common/constants';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex';
import localStorageAuthService from '@/common/authStorage';

@Module({
    name: 'app',
    stateFactory: true,
    dynamic: true,
    namespaced: true,
    store,
})
class AppModule extends VuexModule {
    isShowMobileSidebar = false;
    selectedLanguage = localStorageAuthService.getLanguage();

    @Action
    toggleMobileSidebar(): void {
        this.SET_IS_SHOW_MOBILE_SIDEBAR(!this.isShowMobileSidebar);
    }

    @Action
    setLanguage(lang: SUPPORT_LANGUAGE): void {
        this.SET_LANGUAGE(lang);
    }

    @Mutation
    SET_IS_SHOW_MOBILE_SIDEBAR(value: boolean): void {
        this.isShowMobileSidebar = value;
    }

    @Mutation
    SET_LANGUAGE(lang: SUPPORT_LANGUAGE): void {
        this.selectedLanguage = lang;
    }
}

export const appModule = getModule(AppModule);
