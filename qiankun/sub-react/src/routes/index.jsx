import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";

import Home from "@/pages/Home";

const RoutesCom = () => {
    return (<>
        <Routes>
            <Route path="/sub-react" element={<Outlet />}>
                <Route index element={<Home />}></Route>
                <Route path="router">
                    <Route index element={<RouterPage />}></Route>
                </Route>
            </Route>
        </Routes>
    </>)
}

export default RoutesCom;