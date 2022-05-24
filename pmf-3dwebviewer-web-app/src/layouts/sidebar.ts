import { ISidebar } from '@/common/interfaces';
import {
    User as UserIcon,
    Notebook as NotebookIcon,
    QuestionFilled as QuestionFilledIcon,
    Briefcase as BriefcaseIcon,
} from '@element-plus/icons-vue';

const user: ISidebar = {
    iconComponent: UserIcon,
    name: 'app.sidebar.user.title',
    active: false,
    to: '/',
};

const logs: ISidebar = {
    iconComponent: NotebookIcon,
    name: 'app.sidebar.logs.title',
    active: false,
    to: '/',
};

const help: ISidebar = {
    iconComponent: QuestionFilledIcon,
    name: 'app.sidebar.help.title',
    active: false,
    to: '/',
};

const projectMenu: ISidebar = {
    iconComponent: BriefcaseIcon,
    name: 'app.sidebar.project.title',
    active: false,
    children: [
        {
            name: 'app.sidebar.project.device',
            to: '/',
            active: false,
        },
        {
            name: 'app.sidebar.project.diagram',
            to: '/',
            active: false,
        },
        {
            name: 'app.sidebar.project.group',
            to: '/',
            active: false,
        },
    ],
};
export const sidebars = [user, logs, help, projectMenu];
