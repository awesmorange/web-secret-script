import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            首页
            {/* Search传参 */}
            <button onClick={() => navigate("/albumn?id=666")}>去相册</button>
            {/* Params传参 */}
            <button onClick={() => navigate("/drag/888")}>去拖拽</button>
        </>
    );
};

export default Home;