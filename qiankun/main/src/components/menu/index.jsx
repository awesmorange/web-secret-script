import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";

import {
    menu as menuClass,
    subMenu as subMenuClass,
    menuItem as menuItemClass,
} from './style.module.scss'

const Menu = ({ menus }) => {
    const renderMenu = (menu) => {
        return (<div className={menuClass}>
            {menu.map((menuItem) => {
                if (menuItem.children) {
                    return renderSubMenu(menuItem);
                } else {
                    return renderMenuItem(menuItem);
                }
            })}
        </div>);
    };

    const renderMenuItem = (menuItem) => {
        return (
            <div key={menuItem.path} className={menuItemClass}>
                <NavLink to={menuItem.path}>{menuItem.name}</NavLink>
            </div>
        );
    };

    const renderSubMenu = (subMenu) => {
        return (
            <div className={subMenuClass}>
                <span>{subMenu.name}</span>
                <div>
                    {subMenu?.children?.map((menuItem) => {
                        return renderMenuItem(menuItem);
                    })}
                </div>
            </div>
        );
    };
    return renderMenu(menus)
};

export default Menu;