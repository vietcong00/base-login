<template>
    <div class="form-group d-flex flex-column">
        <label v-if="label" class="fw-bold text-start mb-2">
            {{ label }}
            <span v-if="isRequired" class="mark-required">*</span></label
        >
        <el-input
            v-model="inputData"
            :placeholder="placeholder"
            type="text"
            :readonly="isReadonly"
            :disabled="isDisabled"
            :error="true"
            :size="size"
            :maxlength="maxLength"
        />
        <div class="invalid-feedback text-start" :class="{ 'd-block': error }">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
import { INPUT_TEXT_MAX_LENGTH } from '@/common/constants';
import { Model, Prop, Vue } from 'vue-property-decorator';
export default class InputText extends Vue {
    @Prop({ default: '' }) readonly label!: string;
    @Prop({ default: '' }) readonly name!: string;
    @Prop({ default: 'medium' }) readonly size!: string;
    @Prop({ default: '' }) readonly placeholder!: string;
    @Prop({ default: '' }) readonly error!: string;
    @Prop({ default: false }) readonly isRequired!: string;
    @Prop({ default: false }) readonly isReadonly!: boolean;
    @Prop({ default: false }) readonly isDisabled!: boolean;
    @Prop({ default: INPUT_TEXT_MAX_LENGTH }) readonly maxLength!: number;

    @Model('value', { type: [String] })
    readonly inputData!: string;
}
</script>

<style lang="scss" scoped>
/** Remove Arrows/Spinners */
/* Chrome, Safari, Edge, Opera */
:deep(.el-input__inner::-webkit-outer-spin-button),
:deep(.el-input__inner::-webkit-inner-spin-button) {
    -webkit-appearance: none;
    margin: 0;
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
.mark-required {
    color: red;
}
</style>
s
