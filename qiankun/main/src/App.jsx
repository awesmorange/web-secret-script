import { BrowserRouter, NavLink } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                main-app
                <ul>
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
            </BrowserRouter>
        </>
    );
}

export default App;
