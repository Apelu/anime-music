// Import Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Import custom styles
import "@assets/custom.scss";
// Import React
import React from "react";

import ReactDOM from "react-dom/client";

import router from "@features/routing/routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
