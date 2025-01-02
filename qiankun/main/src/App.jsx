import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";
import RoutesCom from "@/routes";

function App() {
    return (<BrowserRouter>
        <div id="subapp-viewport"></div>
        <RoutesCom />
    </BrowserRouter>);
}

export default App;
