// vue 的路由传参有四种方法，这里 react 有两种方式进行传参
import React from "react";
import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet } from "react-router-dom";
import RouterPage from "./pages/router";


const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
               <RouterPage />
            </BrowserRouter>
        </div>
    );
};

export default App;
