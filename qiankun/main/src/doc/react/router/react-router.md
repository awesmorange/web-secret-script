# react-router
``` javascript
// vue 的路由传参有四种方法，这里 react 有两种方式进行传参
import React from 'react';
import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet } from 'react-router-dom';

const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <Link to='/'>首页 | </Link>
                <Link to='/albumn?id=link'>相册 | </Link>
                <Link to='/drag/link'>拖拽 | </Link>
                <Link to='/layout/echarts'>echarts | </Link>
                <Link to='/layout/hooks'>hooks | </Link>

                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/albumn' element={<Albumn />}></Route>
                    <Route path='/drag/:id' element={<Drag />}></Route>

                    {/* 二级路由 */}
                    {/* 
                        写法和 vue 有异曲同工之妙，二级路由无需打斜杠 / ，同样的在 layout 中再写一个 Route
                        二级路由需要引入一个入口 Outlet，Route 中的页面才会在这里面展示
                        当然，我们也可以来到 layout 默认展示一个二级页面，实现方法有两种，这里以默认展示 echarts 页面为例:
                    */}
                    <Route path='/layout' element={<Layout />}>
                        {/* 1、直接将 article 的 path 去掉，换成 index */}
                        <Route index element={<Echarts />}></Route>
                        {/* 2、Navigate */}
                        {/*
                            <Route path='' element={<Navigate to='/layout/echarts'/>}></Route>
                            <Route path='echarts' element={<Echarts />}></Route>
                        */}
                        <Route path='hooks' element={<Hooks />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

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
const Albumn = () => {
    // navigate('/albumn?id=123') 用 useSearchParams() 接受参数
    const [params] = useSearchParams();
    return (<> 相册 {params.get('id')}</>)
}
const Drag = () => {
    // navigate('/drag/123') 用 useParams() 接受参数
    const params = useParams();
    return (<> 拖拽 {params.id}</>)
}
const Echarts = () => (<> echarts </>)
const Hooks = () => (<> 各种hooks </>)

const Layout = () => {
    return (<>
        <h1>******二级路由*******</h1>
        <Outlet />
    </>)
}

export default App
```

[笔记参考](https://juejin.cn/post/7405152755775832073)