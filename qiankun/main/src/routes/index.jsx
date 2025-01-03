import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";

import HomePage from "../pages/Home";
import QiankunPage from "@/pages/qiankun";
import ChromePage from "@/pages/chrome";
import BabelPage from "@/pages/babel";
import H5Page from "@/pages/h5";
import JsPage from "@/pages/js";
import NpmLockPage from "@/pages/npm-lock";
import PluginPage from "@/pages/plugin";

const RoutesCom = () => {
    return (<>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/qiankun" element={<QiankunPage />} />
            <Route path="/chrome" element={<ChromePage />} />
            <Route path="/babel" element={<BabelPage />} />
            <Route path="/h5" element={<H5Page />} />
            <Route path="/js" >
                <Route path=":type" element={<JsPage />} />
            </Route>
            <Route path="/npm-lock" element={<NpmLockPage />} />
            <Route path="/plugin" element={<PluginPage />} />
        </Routes>
    </>)
}

export default RoutesCom;