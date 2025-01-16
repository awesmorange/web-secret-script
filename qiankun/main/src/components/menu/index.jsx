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
} from "./style.module.scss";

const MenuItem = ({ menuItem, customClass }) => {
    return (
        <div className={[menuItemClass, customClass].join(" ")}>
            <NavLink to={menuItem.path}>{menuItem.name}</NavLink>
        </div>
    );
};

const SubMenu = ({ subMenu, customClass }) => {
    const [fold, setFold] = useState(true);

    const foldIcon = useMemo(() => {
        if (subMenu?.children?.length) {
            return fold ? "+" : "-";
        }
        return "";
    }, [subMenu, fold]);

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
    const [open, setOpen] = useState(true);
    return (
        <>
            <div className={openClass} onClick={() => setOpen(!open)}>
                { open ? '<<' : '>>'}
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
