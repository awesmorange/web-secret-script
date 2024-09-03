import { createApp } from 'vue'
import App from './App.vue'

let instance = null;
// eslint-disable-next-line no-underscore-dangle,no-unused-vars
const __qiankun__ = window.__POWERED_BY_QIANKUN__;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function renderVue3() {
    // 挂载应用
    instance = createApp(App)
    instance.mount(document.getElementById("vue3-app"))
}

// 独立运行时，直接挂载应用
if (!__qiankun__) {
    renderVue3();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(props) {
    console.log('vue3-app-bootstrap', props);
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
    console.log('vue3-app', props);
    const { onGlobalStateChange, setGlobalState, components, enums, name } = props;
    if (components) {
        Vue.cid = name;
        Vue.use(components);
    }
    if (enums) {
        Vue.prototype.$enums = enums;
    }
    Vue.prototype.$onGlobalStateChange = onGlobalStateChange;
    Vue.prototype.$setGlobalState = setGlobalState;
    renderVue3(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
    instance.unmount();
    instance = null;
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
    console.log('sub-vue3-update-props', props);
}

