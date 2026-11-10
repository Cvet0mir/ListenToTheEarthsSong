
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Routes>

            <Route element={<MainLayout />}>
                {/* routes will be added here */}
            </Route>

        </Routes>
    );
}

export default App;
