import Menu from "@/components/menu";

import { mainLayout, mainBody, header, menuBar, pageBody } from "./style.module.scss";

const Layout = ({ children, menus }) => {
    return (
        <div className={mainLayout}>
            <div className={header}>
                <div>前端进阶秘籍</div>
            </div>
            <div className={mainBody}>
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