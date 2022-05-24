<template>
    <div class="main-wrapper">
        <el-container>
            <el-aside :width="isCollapse ? '110px' : '280px'"
                ><Sidebar :isCollapse="isCollapse"
            /></el-aside>
            <el-container>
                <el-header><Header @toggleSidebar="toggleSidebar" /></el-header>
                <el-main
                    ><!-- Page Wrapper -->
                    <div class="page-wrapper">
                        <!-- Page Content -->
                        <router-view v-slot="{ Component }">
                            <component :is="Component" />
                        </router-view>
                        <!-- /Page Content -->
                    </div>
                    <!-- /Page Wrapper --></el-main
                >
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

@Options({
    components: { Header, Sidebar },
})
export default class MainLayout extends Vue {
    isCollapse = false;

    toggleSidebar(isCollapse: boolean): void {
        this.isCollapse = isCollapse;
    }
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100%;
    .el-header {
        height: 80px;
        padding: 0px;
        display: flex;
        align-items: center;
    }
    .el-main {
        padding: 0px;
    }
}

.main-wrapper {
    height: 100vh;
    background-color: #f8f9fa;
}
.page-wrapper {
    left: 0;
    position: relative;
    transition: all 0.2s ease-in-out;
    height: fit-content;
    @media only screen and (max-width: 991.98px) {
        margin-left: 0;
    }
}
</style>
