<template>
    <div class="form-group flex-column">
        <label v-if="label"
            >{{ label }} <span v-if="isRequired" class="mark-required">*</span></label
        >
        <el-input
            v-model="inputData"
            :placeholder="placeholder"
            :type="isShowPassword ? 'text' : 'password'"
            :readonly="isReadonly"
            :disabled="isDisabled"
        >
            <template #suffix>
                <div
                    class="input-password-icon mr-3"
                    @click="isShowPassword = !isShowPassword"
                >
                    <i v-if="isShowPassword" class="fa fa-eye fa-2" />
                    <i v-else class="fa fa-eye-slash fa-2" />
                </div>
            </template>
        </el-input>
        <div class="invalid-feedback text-start" :class="{ 'd-block': error }">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
import { Model, Prop, Vue } from 'vue-property-decorator';

export default class InputPassword extends Vue {
    @Prop({ default: '' }) readonly label!: string;
    @Prop({ default: '' }) readonly placeholder!: string;
    @Prop({ default: '' }) readonly error!: string;
    @Prop({ default: false }) readonly isRequired!: string;
    @Prop({ default: false }) readonly isReadonly!: boolean;
    @Prop({ default: false }) readonly isDisabled!: boolean;

    isShowPassword = false;

    @Model('value', { type: [String, Number] })
    readonly inputData!: string;
}
</script>

<style lang="scss" scoped>
.form-group label {
    text-align: initial;
    width: 100%;
    font-weight: bold;
    margin-bottom: 6px;
}
.input-password-icon {
    cursor: pointer;
}
.fa {
    font-size: 16px;
}
.mark-required {
    color: red;
}
:deep(.el-input__wrapper) {
    border-radius: 9px;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
    --el-input-hover-border-color: var(--el-border-color);
}
:deep(.el-input__wrapper.is-focus) {
    border-color: $color-primary;
    outline: 0;
    box-shadow: 0 0 0 2px $color-regular;
}
</style>
