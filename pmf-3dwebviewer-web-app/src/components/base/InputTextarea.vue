<template>
    <div class="form-group d-flex flex-column">
        <label v-if="label" class="fw-bold text-start mb-2">
            {{ label }}
            <span v-if="isRequired" class="mark-required">*</span></label
        >
        <el-input
            v-model="inputValue"
            :placeholder="placeholder"
            type="textarea"
            :autosize="{ minRows, maxRows }"
            :rows="rows"
            :maxlength="maxLength"
            :show-word-limit="showWordLimit"
        />
        <div class="invalid-feedback text-start" :class="{ 'd-block': error }">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
import {
    TEXTAREA_MAX_LENGTH,
    TEXTAREA_MAX_ROW,
    TEXTAREA_DEFAULT_ROWS,
} from '@/common/constants';
import { Model, Prop, Vue } from 'vue-property-decorator';

export default class InputTextArea extends Vue {
    @Prop({ default: 'text' }) readonly type!: string;
    @Prop({ default: '' }) readonly label!: string;
    @Prop({ default: '' }) readonly placeholder!: string;
    @Prop({ default: '' }) readonly error!: string;
    @Prop({ default: false }) readonly isRequired!: string;
    @Prop({ default: false }) readonly isReadonly!: boolean;
    @Prop({ default: false }) readonly isDisabled!: boolean;
    @Prop({ default: TEXTAREA_DEFAULT_ROWS }) readonly rows!: number;
    @Prop({ default: TEXTAREA_DEFAULT_ROWS }) readonly minRows!: number;
    @Prop({ default: TEXTAREA_MAX_ROW }) readonly maxRows!: number;
    @Prop({ default: TEXTAREA_MAX_LENGTH }) readonly maxLength!: number;
    @Prop({ default: false }) readonly showWordLimit!: boolean;

    @Model('value', { type: [String, Number] })
    readonly inputValue!: string;
}
</script>

<style lang="scss" scoped>
.form-group {
    margin-bottom: 20px;
}
:deep(.el-textarea__inner) {
    border-radius: 9px;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
    --el-input-hover-border-color: var(--el-border-color);
}
:deep(.el-textarea__inner:focus) {
    border-color: $color-primary;
    outline: 0;
    box-shadow: 0 0 0 2px $color-regular;
}
.mark-required {
    color: red;
}
</style>
