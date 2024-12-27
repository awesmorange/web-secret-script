import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet, } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
const Menu = ({ menus }) => {
    const renderMenu = (menu) => {
        return menu.map((menuItem) => {
            if (menuItem.children) {
                return renderSubMenu(menuItem);
            } else {
                return renderMenuItem(menuItem);
            }
        });
    };

    const renderMenuItem = (menuItem) => {
        return (
            <li key={menuItem.path}>
                <NavLink to={menuItem.path}>{menuItem.name}</NavLink>
            </li>
        );
    };

    const renderSubMenu = (subMenu) => {
        return (
            <li>
                <span>{subMenu.name}</span>
                <ul>
                    {subMenu?.children?.map((menuItem) => {
                        return renderMenuItem(menuItem);
                    })}
                </ul>
            </li>
        );
    };
    return renderMenu(menus)
};

export default Menu;