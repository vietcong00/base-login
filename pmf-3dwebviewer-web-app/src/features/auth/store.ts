import { getModule, Module, VuexModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex';

@Module({ dynamic: true, namespaced: true, store, name: 'auth' })
class AuthModule extends VuexModule {}

export const authModule = getModule(AuthModule);
