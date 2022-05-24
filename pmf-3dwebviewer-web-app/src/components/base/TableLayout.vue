<template>
    <div class="base-table-layout">
        <el-table
            header-row-class-name="table-header"
            :data="data"
            :default-sort="sort"
            :header-cell-style="headerStyle"
            :span-method="objectSpanMethod"
            :style="style"
            :border="border"
            :stripe="stripe"
            :cell-style="cellStyle"
            :max-height="400"
            fit
        >
            <slot name="table-columns" />
        </el-table>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

export default class TableLayout extends Vue {
    @Prop({
        default: {
            fontWeight: 700,
            backgroundColor: 'rgb(131, 146, 171)',
            fontSize: '10px',
            cursor: 'pointer',
        },
    })
    readonly headerStyle!: Record<string, string>;

    @Prop({ default: null }) readonly data!: any;
    @Prop({
        default: '',
    })
    readonly style!: Record<string, string>;

    @Prop({ default: false }) readonly border!: boolean;
    @Prop({ default: false }) readonly stripe!: boolean;
    @Prop({ default: null }) readonly cellStyle!: unknown;
    @Prop({ default: null }) readonly maxHeight!: string;
    @Prop({
        default: {
            rowspan: 0,
            colspan: 0,
        },
    })
    readonly objectSpanMethod!: unknown;
    @Prop({ default: null }) readonly sort!: any;
}
</script>

<style scoped lang="scss">
.base-table-layout {
    display: flex;
    align-items: center;
    min-height: 100%;
    overflow: hidden;
    /* width */
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: rgb(180, 179, 179);
        border-radius: 10px;
    }
    .el-table__body {
        width: 100% !important;
    }
}
:deep(.table-header > th) {
    background-color: #fafafa !important;
}
:deep(.el-table__body tr.hover-row > td.el-table__cell) {
    background-color: #ffffff;
}
:deep(.hover-row > .el-table-fixed-column--left) {
    background-color: #ffffff !important;
}
:deep(.hover-row > .el-table-fixed-column--right) {
    background-color: #ffffff !important;
}
:deep(.el-table-fixed-column--left) {
    background: #fafafa !important;
}
:deep(.el-table-fixed-column--right) {
    background: #fafafa !important;
}
:deep(.el-table tr) {
    background: transparent !important;
}
:deep(.el-table .el-table__cell) {
    padding: 0 !important;
}
:deep(.el-table .cell) {
    padding: 12px 24px !important;
    line-height: 21px !important;
    color: rgb(103, 116, 142) !important;
}
:deep(.el-table) {
    background-color: transparent !important;
    --el-table-row-hover-bg-color: unset !important;
    .caret-wrapper {
        position: absolute;
        right: 0;
        height: 16px;
        margin-top: 5px;
        .sort-caret.descending,
        .sort-caret.ascending {
            height: 10px;
        }
    }
    .sort-caret {
        opacity: 0.2;
        border: solid 4px transparent;
    }
    .sort-caret.descending {
        opacity: 0.2;
        border-top-color: #000;
    }
    .sort-caret.ascending {
        opacity: 0.2;
        border-bottom-color: #000;
    }
    .ascending .sort-caret.ascending {
        opacity: 0.6;
    }
    .descending .sort-caret.descending {
        opacity: 0.6;
    }
}
</style>
