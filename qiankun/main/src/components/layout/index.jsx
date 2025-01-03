import Menu from "@/components/menu";

import { mainLayout, header } from "./style.module.scss";

const Layout = ({ children, menus }) => {
    return (
        <div className={mainLayout}>
            <div className={header}>
                <div>前端进阶秘籍</div>
            </div>
            <div style={{ width: "100%", height: "calc(100vh - 50px)" }}>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: "200px" }}>
                    <Menu menus={menus} />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: "calc(100% - 200px)" }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;