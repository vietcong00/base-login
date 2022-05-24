<template>
    <header class="header">
        <!-- toggle sidebar btn -->
        <div class="header-left">
            <div class="toggle_btn" @click="toggleSidebar">
                <img src="@/assets/icons/ic-menu-expand.svg" style="width: 30px" />
            </div>
            <!-- Breadcrumb -->
            <div class="breadcrumb">
                <Breadcrumb />
            </div>
        </div>
        <div class="header-right">
            <!-- Language Menu -->
            <div class="nav-item dropdown has-arrow flag-nav">
                <MenuLanguage />
            </div>
            <!-- Account Menu -->
            <div class="nav-item dropdown has-arrow main-drop">
                <MenuAccount />
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MenuAccount from './MenuAccount.vue';
import MenuLanguage from './MenuLanguage.vue';
import Breadcrumb from './Breadcrumb.vue';

@Options({
    components: {
        MenuAccount,
        MenuLanguage,
        Breadcrumb,
    },
})
export default class Header extends Vue {
    isCollapse = false;

    toggleSidebar(): void {
        this.isCollapse = !this.isCollapse;
        this.$emit('toggleSidebar', this.isCollapse);
    }
}
</script>
<style scoped lang="scss">
.header {
    width: 100%;
    margin-right: 24px;
    padding: 8px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-left {
        display: flex;
        align-items: center;
        .toggle_btn {
            color: #212121;
            cursor: pointer;
        }

        .breadcrumb {
            margin: 0 0 0 10px;
        }
    }
    .header-right {
        display: flex;
        align-items: center;
    }
}
</style>
