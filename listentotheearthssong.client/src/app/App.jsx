
import { Routes, Route } from "react-router-dom";

import MainLayout from "../shared/layouts/MainLayout";

import Home from "../pages/Home";
import Privacy from "../pages/Privacy";
import Register from "../pages/Register";
import Login from "../pages/LoginPage";

function App() {
    return (
        <Routes>

            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/*<Route path="/game" element={<Game />} />*/}
            </Route>

        </Routes>
    );
}

export default App;
