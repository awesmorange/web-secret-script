// vue 的路由传参有四种方法，这里 react 有两种方式进行传参
import React from 'react';
import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet } from 'react-router-dom';
import RouterPage from './pages/router';

const Home = () => {
    const navigate = useNavigate();
    return (<>
        首页
        {/* Search传参 */}
        <button onClick={() => navigate('/albumn?id=666')}>去相册</button>
        {/* Params传参 */}
        <button onClick={() => navigate('/drag/888')}>去拖拽</button>
    </>)
}
const Layout = () => {
    return (<>
        <Outlet />
    </>)
}

const App = () => {

    return (
        <div className='app'>
            <BrowserRouter>
                <Link to='/'>首页 | </Link>
                <Link to='/router'>路由 | </Link>
                <Link to='/promise'>promise | </Link>

                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/router' element={<Layout />}>
                        <Route index element={<RouterPage />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
