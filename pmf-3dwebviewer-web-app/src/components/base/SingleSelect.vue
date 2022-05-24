<template>
    <div class="form-group d-flex flex-column">
        <label v-if="label && label !== 'team'" class="fw-bold text-start mb-2"
            >{{ label }} <span v-if="isRequired" class="mark-required">*</span>
        </label>
        <el-select
            v-model="selectedValue"
            :placeholder="selectedValue ? '' : placeholder"
            :filterable="filterable"
            popper-class="select-options"
            :size="size"
            :disabled="isDisabled"
            ref="singleSelect"
        >
            <template v-for="option in options" :key="option.value">
                <el-option
                    :label="option.label"
                    :value="option.value"
                    :id="`option_${option.value}`"
                    :style="optionStyle"
                >
                    <span>{{ option.label }}</span>
                    <span class="text-right-options"
                        >{{ $t('app.dropdown.pressToSelect') }}
                    </span>
                </el-option>
            </template>
        </el-select>
        <div class="invalid-feedback text-start" :class="{ 'd-block': error }">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
import { Model, Prop, Vue } from 'vue-property-decorator';

export default class SingleSelect extends Vue {
    @Prop({ default: false }) readonly isDisabled!: boolean;
    @Prop({ default: '' }) readonly label!: string;
    @Prop({ default: '' }) readonly size!: string;
    @Prop({ default: '' }) readonly placeholder!: string;
    @Prop({ default: '' }) readonly error!: string;
    @Prop({ default: false }) readonly isRequired!: string;
    @Prop({ default: () => [] }) readonly options!: Record<string, unknown>[];
    @Prop({ default: false }) readonly filterable!: boolean;

    @Model('value', { type: [String, Number] })
    readonly selectedValue!: string;

    optionStyle: Record<string, string> = {
        whiteSpace: 'normal',
        overflow: 'visible',
        textOverflow: 'unset',
        height: 'auto',
    };
}
</script>

<style lang="scss" scoped>
.el-select {
    width: 100% !important;
}
.text-right-options {
    float: right;
    color: var(--el-text-color-secondary);
    font-size: 13px;
    opacity: 0.5;
    display: none;
}
:deep(.select-options) {
    margin: 0 2px;
    text-align: left;
    left: 0px !important;
}
:deep(.el-input) {
    margin: 0 2px;
    .el-icon-arrow-up:before {
        content: '\e78f';
    }
}
:deep(.el-select .el-input__wrapper.is-focus, .el-select
        .el-input.is-focus
        .el-input__wrapper) {
    border-color: $color-primary !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px $color-regular !important;
}

:deep(.el-input__wrapper) {
    border-radius: 9px;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
    --el-input-hover-border-color: var(--el-border-color);
}

.mark-required {
    color: red;
}
</style>
