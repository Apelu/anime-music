import "@assets/custom.scss";
import React from "react";
import ReactDOM from "react-dom/client";

import router from "@features/routing/routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
