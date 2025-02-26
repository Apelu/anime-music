import "@assets/custom.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ReactDOM from "react-dom/client";

import appRouter from "@features/routing/routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={appRouter} />);
