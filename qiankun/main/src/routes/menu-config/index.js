import main from "./main";
import subReact from "./sub-react";
import subVue2 from "./sub-vue2";
import subVue3 from "./sub-vue3";

const menus = [
    {
        name: '首页',
        path: '/',
        icon: 'el-icon-s-home',
    },
    ...main,
    ...subReact,
    ...subVue2,
    ...subVue3,
]

export default menus;