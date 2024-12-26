import { BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useSearchParams, useParams, Outlet } from 'react-router-dom';
import QiankunPage from './pages/qiankun';

function App() {
    return (
        <>
            <BrowserRouter>
                main-app
                <ul>
                    <li>
                        <NavLink to="/qiankun">qiankun</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sub-vue2">vue2 应用</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sub-vue3">vue3 应用</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sub-react">react  应用</NavLink>
                    </li>
                </ul>
                <div id="subapp-viewport"></div>
                <Routes>
                    <Route path="/qiankun" element={<QiankunPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
