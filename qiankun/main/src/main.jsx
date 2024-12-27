import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import App from "./App.jsx";
import microApps from "./micro-apps";

const renderMain = () => {
    createRoot(document.getElementById("main-app")).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
renderMain()
registerMicroApps(microApps, {
    beforeLoad: [
        (app) => {
            console.log("before load", app);
        },
    ],
    beforeMount: [
        (app) => {
            console.log("before mount", app);
        },
    ],
    afterUnmount: [
        (app) => {
            console.log("before unmount", app);
        },
    ],
});

const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
    ignore: 'master',
    user: {
        name: 'master',
    },
});

/**
 * Step3 设置默认进入的子应用
 */
// setDefaultMountApp('/sub-vue2');

/**
 * Step4 启动应用
 */
start({
    // sandbox: { strictStyleIsolation: true }
});

runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
});