<template>
    <ElConfigProvider :locale="locale">
        <router-view />
    </ElConfigProvider>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ElConfigProvider } from 'element-plus';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGE } from './common/constants';
import localStorageAuthService from './common/authStorage';

@Options({
    components: {
        ElConfigProvider,
    },
})
export default class App extends Vue {
    get locale(): SUPPORT_LANGUAGE {
        return localStorageAuthService.getLanguage() || DEFAULT_LANGUAGE;
    }
}
</script>
