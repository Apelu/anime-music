import NavBar from "@features/ui/NavBar";
import AnimePage from "@pages/AnimePage";
import ControllerPage from "@pages/ControllerPage";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import MusicPage from "@pages/MusicPage";
import ProfilePage from "@pages/ProfilePage";
import { Outlet, createBrowserRouter } from "react-router-dom";

export enum Paths {
    Anime = "/anime",
    Music = "/music",
    Login = "/login",
    Controller = "/controller",
    Profile = "/profile",
}

function Root() {
    return (
        <main>
            <NavBar />
            <Outlet />
        </main>
    );
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: Paths.Anime, element: <AnimePage /> },
            { path: Paths.Music, element: <MusicPage /> },
            { path: Paths.Login, element: <LoginPage /> },
            { path: Paths.Controller, element: <ControllerPage /> },
            { path: Paths.Profile, element: <ProfilePage /> },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;
