import "antd/dist/antd.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";
import { AuthStateProvider } from "./store/context/auth";

function App() {
    return (
        <BrowserRouter>
            <AuthStateProvider>
                <AppRouter />
            </AuthStateProvider>
        </BrowserRouter>
    );
}

export default App;
