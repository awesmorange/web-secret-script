import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

import { setShareMainComponent, setMarkdownDoc } from "@/utils/share-main.js";

let instance = null;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function renderReact() {
    // 挂载应用
    instance = createRoot(document.getElementById("react-app"));
    instance.render(
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    );
}
renderWithQiankun({
    mount(props) {
        const { onGlobalStateChange, setGlobalState, shareReactComponent, reactDoc, enums, name } = props;
        console.log('>>> sub-react mount', reactDoc);

        setShareMainComponent(shareReactComponent);
        setMarkdownDoc(reactDoc);
        renderReact(props);
    },
    bootstrap() {
        console.log('>>> sub-react bootstrap');
    },
    unmount(props) {
        console.log(">>> sub-react unmounted");
        instance.unmount();
        instance = null;
    },
});

// 独立运行时，直接挂载应用
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    renderReact({});
    console.log('>>> sub-react run alone');
}
