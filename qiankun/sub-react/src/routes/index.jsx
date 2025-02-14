import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";

import Home from "@/pages/Home";
import RouterPage from "@/pages/router";
import HookPage from "@/pages/page_2";

const RoutesCom = () => {
    return (<>
        <Routes>
            <Route path="/sub-react" element={<Outlet />}>
                <Route index element={<Home />}></Route>
                <Route path="router" element={<RouterPage />}></Route>
                <Route path="hook" element={<HookPage />}></Route>
            </Route>
        </Routes>
    </>)
}

export default RoutesCom;