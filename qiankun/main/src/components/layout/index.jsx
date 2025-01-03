import Menu from "@/components/menu";

import { mainLayout, header, menuBar, pageBody } from "./style.module.scss";

const Layout = ({ children, menus }) => {
    return (
        <div className={mainLayout}>
            <div className={header}>
                <div>前端进阶秘籍</div>
            </div>
            <div style={{ width: "100%", height: "calc(100vh - 50px)" }}>
                <div className={menuBar}>
                    <Menu menus={menus} />
                </div>
                <div className={pageBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;