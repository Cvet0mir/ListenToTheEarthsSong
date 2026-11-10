
import { Routes, Route } from "react-router-dom";

import MainLayout from "../shared/layouts/MainLayout";

import Home from "../pages/Home";

function App() {
    return (
        <Routes>

            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
            </Route>

        </Routes>
    );
}

export default App;
