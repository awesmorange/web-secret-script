import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";
import Menu from "@/components/menu";

const Layout = ({ children, menus }) => {
    return (
        <div className="main-layout">
            <div>
                <div>前端进阶秘籍</div>
            </div>
            <div style={{ width: "100%", height: "calc(100vh - 50px)" }}>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: "200px" }}>
                    <Menu menus={menus} />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: "calc(100% - 200px)" }}>
                    <Outlet />
                    {/* {children} */}
                </div>
            </div>
        </div>
    );
};

export default Layout;