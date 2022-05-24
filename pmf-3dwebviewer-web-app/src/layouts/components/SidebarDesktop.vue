<template>
    <el-menu
        :default-openeds="activeHighlightMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
    >
        <template
            :key="['d', sidebarIndex].join('-')"
            v-for="(sidebar, sidebarIndex) in sidebars"
        >
            <router-link :to="sidebar.to" v-if="!sidebar.children">
                <el-menu-item
                    :index="['d', sidebarIndex, Date.now()].join('-')"
                    :class="{
                        'active-menu': isActiveMenu(sidebar),
                        'collapsed-menu-item': isCollapse,
                    }"
                >
                    <div class="wrap-icon">
                        <component :is="sidebar.iconComponent" class="module-icon" />
                    </div>
                    <template #title>
                        <span class="menu-title">{{ $t(sidebar.name) }}</span>
                    </template>
                </el-menu-item>
            </router-link>
            <el-sub-menu
                v-if="sidebar.children"
                :index="['d', sidebarIndex].join('-')"
                :class="{
                    'active-parent-menu': isActiveParentMenu(sidebar),
                    'collapsed-menu-item': isCollapse,
                }"
            >
                <template #title>
                    <div class="wrap-icon">
                        <component :is="sidebar.iconComponent" class="module-icon" />
                    </div>
                    <span class="menu-title">{{ $t(sidebar.name) }}</span>
                </template>
                <el-menu-item-group>
                    <router-link
                        :key="itemIndex"
                        v-for="(item, itemIndex) in sidebar.children"
                        :to="item.to"
                    >
                        <el-menu-item
                            :index="['d', sidebarIndex, itemIndex].join('-')"
                            :class="isActiveSubMenu(item)"
                            class="child-menu-item"
                        >
                            <component :is="item.iconComponent" class="module-icon" />
                            <div class="dot-active">.</div>
                            <li style="list-style-type: disc">{{ $t(item.name) }}</li>
                        </el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-sub-menu>
        </template>
    </el-menu>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { sidebars as initSidebar } from '../sidebar';
import { ISidebar } from '@/common/interfaces';
import {
    ArrowLeft as ArrowLeftIcon,
    ArrowRight as ArrowRightIcon,
    User as UserIcon,
    House as HouseIcon,
    Clock as ClockIcon,
    Calendar as CalenderIcon,
    Monitor as MonitorIcon,
    Service as ServiceIcon,
    Printer as PrinterIcon,
    Key as KeyIcon,
    Setting as SettingIcon,
    QuestionFilled as QuestionIcon,
} from '@element-plus/icons-vue';
import { Prop } from 'vue-property-decorator';

@Options({
    components: {
        UserIcon,
        HouseIcon,
        ClockIcon,
        CalenderIcon,
        MonitorIcon,
        ServiceIcon,
        PrinterIcon,
        KeyIcon,
        SettingIcon,
        QuestionIcon,
        ArrowLeftIcon,
        ArrowRightIcon,
    },
})
export default class SideBarDesktop extends Vue {
    @Prop({ default: false }) isCollapse!: boolean;

    get sidebars(): ISidebar[] {
        return initSidebar;
    }

    get activeHighlightMenu(): string[] {
        const menuObj: Record<string, string[]> = {};
        this.sidebars.forEach((item: ISidebar, index: number) => {
            menuObj[index] = item.children
                ? item.children.map((child: ISidebar) => child.pageName || '')
                : [];
        });
        const path = this.$router.currentRoute?.value?.name as string;
        const mainMenu: string[] = [];

        Object.values(menuObj).forEach((itemSubMenu: string[], index: number) => {
            if (itemSubMenu?.includes(path)) mainMenu.push(`d-${index}`);
        });
        return mainMenu;
    }

    toggleSidebar(): void {
        this.isCollapse = !this.isCollapse;
        this.$emit('toggleSidebar', this.isCollapse);
    }

    isActiveMenu(value: ISidebar): boolean {
        return value.to === `/${this.$route.path.split('/')[1]}`;
    }

    isActiveSubMenu(value: ISidebar): string {
        const router = this.$router.currentRoute?.value?.name as string;
        if (value.pageName === router) return 'active-child-menu';
        else return 'inactive-child-menu';
    }

    isActiveParentMenu(items: ISidebar): boolean | undefined {
        const isActive = items?.children
            ?.map((item: ISidebar) => item.to)
            .includes(this.$route.path);
        return isActive;
    }
}
</script>
<style lang="scss" scoped>
.wrap-icon {
    width: 32px;
    height: 32px;
    padding: 10px;
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0.3125rem 0.625rem 0 rgb(0 0 0 / 12%);
    .module-icon {
        height: 12px;
        width: 12px;
        background-image: linear-gradient(310deg, #e9ecef, #e9ecef);
        border-radius: 8px;
    }
}

.menu-title {
    margin-left: 12px;
}

.sidebar-inner {
    display: flex;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;
    height: calc(97vh - 98px);
    transition: all 0.2s ease-in-out 0s;
    /* width */
    &::-webkit-scrollbar {
        width: 10px;
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
    .el-menu {
        border: none;
        padding-top: 10px;
        height: 100%;
        background-color: unset;

        a {
            color: #212121;
            text-decoration: none;
            display: block;
            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }
        li {
            &:not(:last-child) {
                margin-bottom: 5px;
            }
            a {
                margin-bottom: 0;
            }
        }
        .el-sub-menu {
            text-align: left;
        }
        .el-menu-item,
        .el-sub-menu {
            color: #212121;
            padding-left: 15px !important;
            a {
                padding-left: 25px;
            }
            &.active-menu {
                color: #344767;
                background-color: #fff;
                font-weight: 600;
                box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
                border-radius: 0.5rem;
                padding: 10px 5px;
                .wrap-icon {
                    background-color: #33ccee;
                }
                &:hover {
                    background-color: #fff !important;
                }
            }
            &.active-parent-menu {
                :deep(.el-sub-menu__title) {
                    color: #344767;
                    background-color: #fff !important;
                    font-weight: 600;
                    box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
                    border-radius: 0.5rem;
                    padding: 10px 5px;
                }
                .wrap-icon {
                    background-color: #33ccee;
                }
            }
            &:hover {
                background-color: unset;
            }
        }

        .el-menu-item,
        .el-sub-menu__title {
            text-align: left;
            line-height: 40px;
            margin: 0px 16px;
            i {
                font-size: 22px;
                padding-right: 10px;
                color: #212121;
            }
        }
        &.el-menu--collapse {
            padding-top: 10px;
            display: flex;
            flex-direction: column;
            flex: 1;
            width: 100%;
            :deep(.el-menu-item) * {
                text-align: center;
            }
        }
        ul {
            .el-menu-item {
                color: #212121;
                padding-left: 15px !important;
            }
        }
        :deep(.el-sub-menu__icon-arrow) {
            transform: rotate(-90deg);
        }
        :deep(.is-opened .el-sub-menu__icon-arrow) {
            transform: rotate(0);
        }
        @media only screen and (max-width: 991.98px) {
            background-color: #fff;
            box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
        }
    }
}

.active-child-menu {
    color: #3a416f;
    font-weight: 600;
    li::marker {
        content: '';
    }
    .dot-active {
        font-size: 60px;
        margin-bottom: 40px;
        margin-left: -23px;
        margin-right: 6px;
    }
}

.el-popper {
    .el-menu {
        .el-menu-item {
            height: 40px;
            line-height: 40px;
            &.active-menu {
                color: #212121;
                background-color: #e6f6ff;
            }
            &:hover {
                color: #212121;
                background-color: #ededed;
            }
            &:not(:last-child) {
                margin-bottom: 5px;
            }
            li::marker {
                content: '';
            }
            .dot-active {
                display: none;
            }
        }
        .el-menu-item-group {
            a {
                text-decoration: unset;
            }
            :deep(.el-menu-item-group__title) {
                display: none !important;
            }
        }
    }
}

.inactive-child-menu {
    color: rgba(58, 65, 111, 0.5) !important;
    .dot-active {
        display: none;
    }
}

.child-menu-item {
    height: 35px !important;
}

.el-sub-menu {
    padding-left: 10px !important;
    :deep(.el-sub-menu__title) {
        padding-left: 15px !important;
        &:hover {
            background-color: unset !important;
        }
    }
}

:deep(.el-menu--inline) {
    background-color: unset !important;
}

:deep(.el-drawer__body) {
    margin-top: 84px;
    overflow-y: auto;
    overflow-x: hidden;
}

.collapsed-menu-item {
    align-items: center;
    :deep(.el-tooltip__trigger) {
        display: flex !important;
        align-items: center;
        justify-items: center;
        padding: 14px !important;
    }
    .module-icon {
        margin: 0 !important;
        padding: 0 !important;
    }
}
</style>
