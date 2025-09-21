import { UserProvider, useUserData } from "@features/contexts/UserContext";
import OfflineAnimeV2, {
    AniListRedirectPage,
} from "@features/offline-anime/OfflineAnimeV2";
import NavBar from "@ui/NavBar";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import OfflineAnime from "@pages/OfflineAnime";
import ProfilePage from "@pages/ProfilePage";
import { Outlet, createBrowserRouter } from "react-router-dom";
import "../../assets/App.css";
import { WatchControllerPage } from "../../pages/WatchControllerPage";
import ProviderParent from "../contexts/default/ProviderParent";
import { LocalAnime } from "../local-anime/LocalAnime/LocalAnime";
import { LocalAnimeHome } from "../local-anime/LocalAnimeHome/LocalAnimeHome";
import { LocalAnimeVideo } from "../local-anime/LocalAnimeVideo/LocalAnimeVideo";
import Background from "@ui/Background";

export enum Paths {
    Anime = "/anime",
    LocalAnime = "/local-anime-home",
    AnimeInfo = "/anime/:seriesFolderName",
    AnimeVideo = "/anime/:seriesFolderName/:episodeNumber",
    Login = "/login",
    Profile = "/profile",
    AnilistLoginRedirect = "/login-redirect",
    WatchController = "/watch-controller",
}

function Root() {
    const user = useUserData();

    if (user.isLoggedIn) {
        return (
            <main className="text-light ">
                <Background />
                <NavBar />

                <Outlet />
            </main>
        );
    }

    return <LoginPage />;
}

const appRouter = createBrowserRouter([
    {
        path: Paths.Login,
        element: (
            <UserProvider>
                <LoginPage />
            </UserProvider>
        ),
    },
    {
        path: Paths.WatchController,
        element: <WatchControllerPage />,
    },
    {
        path: "/",
        element: (
            <ProviderParent>
                <Root />
            </ProviderParent>
        ),
        children: [
            {
                path: Paths.AnilistLoginRedirect,
                element: <AniListRedirectPage />,
            },

            {
                path: "/local-anime-home",
                element: <LocalAnimeHome />,
            },

            {
                path: "/local-anime/:animeID",
                element: <LocalAnime />,
            },

            {
                path: "/local-anime/:animeID/:animeName",
                element: <LocalAnime />,
            },

            {
                path: "/local-anime-video/:animeID/:episodeID",
                element: <LocalAnimeVideo />,
            },

            {
                path: "/local-anime-video/:animeID/:animeName/:episodeID",
                element: <LocalAnimeVideo />,
            },

            {
                path: Paths.AnimeVideo,
                element: <OfflineAnime />,
                // <OfflineAnimeV2 />
            },

            {
                path: Paths.AnimeInfo,
                element: <OfflineAnimeV2 />,
            },

            {
                path: Paths.Anime,
                element: <OfflineAnimeV2 />,
            },

            { path: Paths.Profile, element: <ProfilePage /> },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default appRouter;
