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
import QiankunPage from "./pages/qiankun";
import ChromePage from "./pages/chrome";
import BabelPage from "./pages/babel";
import H5Page from "./pages/h5";
import JsPage from "./pages/js";
import NpmLockPage from "./pages/npm-lock";
import Vue2_7Page from "./pages/vue2_7";
import PluginPage from "./pages/plugin";

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
                        <NavLink to="/chrome">chrome</NavLink>
                    </li>
                    <li>
                        <NavLink to="/babel">babel</NavLink>
                    </li>
                    <li>
                        <NavLink to="/h5">h5</NavLink>
                    </li>
                    <li>
                        <NavLink to="/js">js</NavLink>
                    </li>
                    <li>
                        <NavLink to="/npm-lock">npm-lock</NavLink>
                    </li>
                    <li>
                        <NavLink to="/vue2_7">vue2_7</NavLink>
                    </li>
                    <li>
                        <NavLink to="/plugin">plugin</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sub-vue2">vue2 应用</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sub-vue3">vue3 应用</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sub-react">react 应用</NavLink>
                    </li>
                </ul>
                <div id="subapp-viewport"></div>
                <Routes>
                    <Route path="/qiankun" element={<QiankunPage />} />
                    <Route path="/chrome" element={<ChromePage />} />
                    <Route path="/babel" element={<BabelPage />} />
                    <Route path="/h5" element={<H5Page />} />
                    <Route path="/js" element={<JsPage />} />
                    <Route path="/npm-lock" element={<NpmLockPage />} />
                    <Route path="/vue2_7" element={<Vue2_7Page />} />
                    <Route path="/plugin" element={<PluginPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
