import {
    BrowserRouter,
    Link,
    NavLink,
    Routes,
    Route,
    useNavigate,
    useSearchParams,
    useParams,
    Outlet,
} from "react-router-dom";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";

import {
    menu as menuClass,
    subMenu as subMenuClass,
    menuItem as menuItemClass,
    open as openClass,
    active as activeClass,
} from "./style.module.scss";

const MenuItem = ({ menuItem, customClass }) => {
    const navigate = useNavigate();

    const isActive = useMemo(() => {
        //  path 比 window.location.pathname 路径少"/"
        if (menuItem.path === '/' && window.location.pathname === '/') {
            return true;
        }
        return menuItem.path !== '/' && window.location.pathname.includes(menuItem.path);
    }, [navigate]);

    return (
        <div className={[menuItemClass, customClass, isActive ? activeClass : ""].join(" ")}>
            <NavLink to={menuItem.path}>{isActive ? "📖" : "📘"}{menuItem.name}</NavLink>
        </div>
    );
};

const SubMenu = ({ subMenu, customClass }) => {
    const [fold, setFold] = useState(true);

    const foldIcon = useMemo(() => {
        if (subMenu?.children?.length) {
            return fold ? "📁" : "📂";
        }
        return "";
    }, [subMenu, fold]);

    const navigate = useNavigate();

    useEffect(() => {
        // 没有激活子项的菜单目录折叠
        setFold(!window.location.pathname.includes(subMenu.path))
    }, [navigate]);

    return (
        <>
            {/* 当前层级 */}
            {subMenu?.children?.length && (
                <div
                    className={[menuItemClass, customClass].join(" ")}
                    onClick={() => {
                        setFold(!fold);
                    }}
                >
                    {foldIcon} {subMenu.name}
                </div>
            )}
            {!subMenu?.children?.length && <MenuItem menuItem={subMenu} />}
            {/* 下一级 */}
            {!fold &&
                subMenu?.children?.map((menuItem, index) => {
                    if (menuItem.children) {
                        return (
                            <SubMenu
                                key={`${menuItem.name}_${index}`}
                                subMenu={menuItem}
                                customClass={subMenuClass}
                            />
                        );
                    } else {
                        return (
                            <MenuItem
                                key={`${menuItem.name}_${index}`}
                                menuItem={menuItem}
                                customClass={subMenuClass}
                            />
                        );
                    }
                })}
        </>
    );
};

const Menu = ({ menus }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={openClass} onClick={() => setOpen(!open)}>
                {open ? '⏪' : '⏩'}
            </div>
            {open && (
                <div className={menuClass}>
                    {menus.map((menuItem, index) => (
                        <SubMenu
                            key={`${menuItem.name}_${index}`}
                            subMenu={menuItem}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default Menu;
