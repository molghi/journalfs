import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./initial.scss";
import { ContextProvider } from "./context/MyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
    </React.StrictMode>
);
