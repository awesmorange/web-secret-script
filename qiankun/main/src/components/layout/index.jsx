import { useEffect } from "react";

import Menu from "@/components/menu";

import { detectDevice, detectDeviceByViewport, detectDeviceByMediaQuery } from "@/utils/device";

import { mainLayout, mainBody, header, menuBar, pageBody } from "./style.module.scss";

const Layout = ({ children, menus }) => {

    useEffect(() => {
        console.log('=== 设备类型检测 ===')
        console.log('用户代理：', detectDevice())
        console.log('视口尺寸：', detectDeviceByViewport())
        console.log('CSS 媒体查询：', detectDeviceByMediaQuery())
    }, [])

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