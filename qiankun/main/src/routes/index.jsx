import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/Home";
import DocPage from "@/pages/doc";

const RoutesCom = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/doc/:subject/:type" element={<DocPage />} />
            </Routes>
        </>
    );
};

export default RoutesCom;
