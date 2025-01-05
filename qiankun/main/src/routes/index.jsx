import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import QiankunPage from "@/pages/qiankun";
import ChromePage from "@/pages/chrome";
import BabelPage from "@/pages/babel";
import H5Page from "@/pages/h5";
import JsPage from "@/pages/js";
import AlgorithmPage from "@/pages/algorithm";
import NpmLockPage from "@/pages/npm-lock";
import PluginPage from "@/pages/plugin";

const RoutesCom = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/qiankun" element={<QiankunPage />} />
                <Route path="/chrome" element={<ChromePage />} />
                <Route path="/babel/:type" element={<BabelPage />} />
                <Route path="/h5" element={<H5Page />} />
                <Route path="/js/:type" element={<JsPage />} />
                <Route path="/algorithm/:type" element={<AlgorithmPage />} />
                <Route path="/npm-lock" element={<NpmLockPage />} />
                <Route path="/plugin" element={<PluginPage />} />
            </Routes>
        </>
    );
};

export default RoutesCom;
