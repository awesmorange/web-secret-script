import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from '@/router'; // 导入路由配置

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

import { setMarkdownDoc } from "@/utils/share-main.js";

Vue.use(ElementUI);

let instance = null;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function renderVue2() {
    // 挂载应用
    instance = new Vue({
        router, // 挂载路由
        render: (h) => h(App),
    }).$mount('#vue2-app');
}

renderWithQiankun({
    mount(props) {
        console.log('mount-vue2-app', props);
        const { onGlobalStateChange, setGlobalState, components, enums, name, vue2_7Doc } = props;
        // TODO:
        // if (components) {
        //     Vue.cid = name;
        //     Vue.use(components);
        // }
        // if (enums) {
        //     Vue.prototype.$enums = enums;
        // }
        // Vue.prototype.$onGlobalStateChange = onGlobalStateChange;
        // Vue.prototype.$setGlobalState = setGlobalState;
        setMarkdownDoc(vue2_7Doc);
        renderVue2(props);
    },
    bootstrap() {
        console.log('bootstrap');
    },
    unmount(props) {
        instance.$destroy();
        instance = null;
    },
});

// 独立运行时，直接挂载应用
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    renderVue2({});
}