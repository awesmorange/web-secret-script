import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";
import RoutesCom from "@/routes";
import Layout from "@/components/layout";

import menus from "@/routes/menu-config/index.js";

function App() {
    return (<BrowserRouter>
        <Layout menus={menus} >
            <div id="subapp-viewport"></div>
            <RoutesCom />
            <Outlet />
        </Layout>
    </BrowserRouter>);
}

export default App;
