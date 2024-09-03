import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

let root = null;

// eslint-disable-next-line no-underscore-dangle,no-unused-vars
const __qiankun__ = window.__POWERED_BY_QIANKUN__;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function renderReact() {
    // 挂载应用
    root = createRoot(document.getElementById("react-app"));
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
// 独立运行时，直接挂载应用
if (!__qiankun__) {
    renderReact();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(props) {
    console.log('react-app-bootstrap', props);
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
    console.log('react-app', props);
    // const { onGlobalStateChange, setGlobalState, components, enums, name } = props;
    // if (components) {
    //     Vue.cid = name;
    //     Vue.use(components);
    // }
    // if (enums) {
    //     Vue.prototype.$enums = enums;
    // }
    // Vue.prototype.$onGlobalStateChange = onGlobalStateChange;
    // Vue.prototype.$setGlobalState = setGlobalState;
    renderReact(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
    console.log("AZZ unmounted");
    root.unmount();
    root = null;
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
    console.log('sub-react-update-props', props);
}
