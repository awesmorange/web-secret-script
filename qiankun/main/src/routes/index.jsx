import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";

import HomePage from "../pages/Home";
import QiankunPage from "@/pages/qiankun";
import ChromePage from "@/pages/chrome";
import BabelPage from "@/pages/babel";
import H5Page from "@/pages/h5";
import JsPage from "@/pages/js";
import NpmLockPage from "@/pages/npm-lock";
import Vue2_7Page from "@/pages/vue2_7";
import PluginPage from "@/pages/plugin";

const RoutesCom = () => {
    return (<>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/qiankun" element={<QiankunPage />} />
            <Route path="/chrome" element={<ChromePage />} />
            <Route path="/babel" element={<BabelPage />} />
            <Route path="/h5" element={<H5Page />} />
            <Route path="/js" element={<JsPage />} />
            <Route path="/npm-lock" element={<NpmLockPage />} />
            <Route path="/vue2_7" element={<Vue2_7Page />} />
            <Route path="/plugin" element={<PluginPage />} />
        </Routes>
    </>)
}

export default RoutesCom;