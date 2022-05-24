<template>
    <el-card class="login-form">
        <h5 class="title">{{ $t('login.loginForm.title') }}</h5>
        <img class="logo" src="@/assets/images/logo/logo-vertical.png" alt="" />
        <BaseInputText
            v-model:value="form.email"
            :error="translateYupError(form.errors.email)"
            :placeholder="$t('login.loginForm.email')"
        />
        <BaseInputPassword
            v-model:value="form.password"
            :error="translateYupError(form.errors.password)"
            :placeholder="$t('login.loginForm.password')"
        />
        <div class="text-center">
            <el-button
                class="btn btn-action bg-sign-in w-100 my-4 mb-2"
                @click="onClickLoginButton"
            >
                {{ $t('login.loginForm.signIn') }}
            </el-button>
        </div>
        <div class="mb-2 text-center">
            <p
                class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3"
            >
                {{ $t('login.loginForm.or') }}
            </p>
        </div>
        <div class="text-center">
            <el-button class="btn btn-action bg-sign-up w-100 mt-2 mb-4" @click="signUp">
                {{ $t('login.loginForm.signUp') }}
            </el-button>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Options, setup, mixins } from 'vue-class-component';
import { initData } from '../composition/loginForm';
import { UtilMixins } from '@/mixins/utilMixins';

@Options({
    components: {},
})
export default class LoginForm extends mixins(UtilMixins) {
    form = setup(() => initData());

    async onClickLoginButton(): Promise<void> {
        await this.form.onSubmit();
    }

    signUp() {
        // TODO: handle sign up
    }
}
</script>
<style lang="scss" scoped>
.login-form {
    max-width: 350px;
    width: 80%;
    border-radius: 12px;
    margin: 50px auto;
}
.btn-action {
    border-radius: 10px;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    height: 40px;
    transition: all 0.15s ease-in;
    &:hover {
        color: #fff !important;
        transform: scale(1.02);
    }
}

:deep(.el-input) {
    height: 40px;
}
:deep(.form-group) {
    margin: 20px 0;
}
.title {
    font-weight: 600;
    margin-bottom: 20px;
}
.logo {
    width: 100px;
}
.bg-sign-in {
    background-image: linear-gradient(310deg, #2152ff 0%, #21d4fd 100%);
}
.bg-sign-up {
    background-image: linear-gradient(310deg, #141727 0%, #3a416f 100%);
}

.text-border:after,
.text-border:before {
    content: '';
    display: inline-block;
    width: 30%;
    height: 1px;
    position: relative;
    vertical-align: middle;
}

.text-border:after {
    background: linear-gradient(
        90deg,
        rgba(117, 117, 117, 0.4),
        rgba(117, 117, 117, 0.4),
        transparent
    );
}

.text-border:before {
    background: linear-gradient(
        90deg,
        transparent,
        rgba(117, 117, 117, 0.4),
        rgba(117, 117, 117, 0.4)
    );
}

.text-border:before {
    right: 0.5em;
    margin-left: -50%;
}

.text-border:after {
    left: 0.5em;
    margin-right: -50%;
}
</style>
