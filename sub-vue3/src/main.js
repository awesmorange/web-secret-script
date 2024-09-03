import { createApp } from 'vue'
import App from './App.vue'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let instance = null;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function renderVue3() {
    // 挂载应用
    instance = createApp(App)
    instance.mount(document.getElementById("vue3-app"))
}

renderWithQiankun({
    mount(props) {
        console.log('vue3-app', props);
        const { onGlobalStateChange, setGlobalState, components, enums, name } = props;
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
        renderVue3(props);
    },
    bootstrap() {
        console.log('bootstrap');
    },
    unmount(props) {
        instance.unmount();
        instance = null;
    },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    renderVue3({});
}
