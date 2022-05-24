<template>
    <!-- <sidebar> -->
    <div class="sidebar" :class="isCollapse ? 'mini-sidebar' : ''">
        <div class="sidebar-inner">
            <!--Logo-->
            <router-link to="/" class="logo">
                <img
                    src="@/assets/images/logo/logo-square.png"
                    height="40"
                    alt=""
                    v-if="isCollapse"
                />
                <img
                    src="@/assets/images/logo/logo-horizontal.png"
                    height="40"
                    alt=""
                    v-else
                />
            </router-link>
            <hr class="horizontal-line" />
            <SidebarDesktop :isCollapse="isCollapse" />
        </div>
    </div>
    <!-- </sidebar> -->
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
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
import SidebarDesktop from './SidebarDesktop.vue';
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
        SidebarDesktop,
    },
})
export default class SideBar extends Vue {
    @Prop({ default: false }) readonly isCollapse!: boolean;
}
</script>
<style lang="scss" scoped>
.sidebar {
    height: 100%;
    background-color: unset;
    overflow: hidden;
    border-radius: 16px;
    height: auto;
    @media only screen and (max-width: 991.98px) {
        background-color: #fff;
        box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
    }
}

.logo {
    display: flex;
    padding: 20px;
    margin-left: 8px;
    align-items: center;
}

.horizontal-line {
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0)
    );
    background-color: transparent;
    margin: 0px !important;
}

@media only screen and (min-width: 991px) {
    .mini-sidebar {
        width: 92px;
    }
}
</style>
