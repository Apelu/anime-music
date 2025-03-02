import Background from "@features/background/Background";
import { UserProvider, useUserData } from "@features/contexts/UserContext";
import OfflineAnimeV2, {
    AniListRedirectPage,
} from "@features/offline-anime/OfflineAnimeV2";
import NavBar from "@features/ui/NavBar";
import AnimeDownloadPage from "@pages/AnimeDownloadPage";
import BackgroundLibrary from "@pages/BackgroundLibrary";
import ControllerPage from "@pages/ControllerPage";
import ErrorPage from "@pages/ErrorPage";
import FeaturesPage from "@pages/FeaturesPage";
import LoginPage from "@pages/LoginPage";
import MusicPage from "@pages/MusicPage";
import OfflineAnime from "@pages/OfflineAnime";
import ProfilePage from "@pages/ProfilePage";
import { Outlet, createBrowserRouter } from "react-router-dom";
import "../../assets/App.css";
import { WatchControllerPage } from "../../pages/WatchControllerPage";
import ProviderParent from "../contexts/ProviderParent";
import { LocalAnime } from "../local-anime/LocalAnime/LocalAnime";
import { LocalAnimeHome } from "../local-anime/LocalAnimeHome/LocalAnimeHome";
import { LocalAnimeVideo } from "../local-anime/LocalAnimeVideo/LocalAnimeVideo";

export enum Paths {
    Anime = "/anime",
    LocalAnime = "/local-anime-home",
    AnimeInfo = "/anime/:seriesFolderName",
    AnimeVideo = "/anime/:seriesFolderName/:episodeNumber",
    Music = "/music",
    Login = "/login",
    AnimeDownload = "/anime-download",
    Controller = "/controller",
    Profile = "/profile",
    Features = "/features",
    BackgroundLibrary = "/background-library",
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

            // TODO
            // /local-anime-home
            // /local-anime/:animeID            ==Redirects=To==> /local-anime/:animeID/<AnimeName>
            // /local-anime-video/:animeID/:episodeID ==Redirects=To==> /local-anime/:animeID/<AnimeName>/:episodeID

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

            { path: Paths.Music, element: <MusicPage /> },
            { path: Paths.Controller, element: <ControllerPage /> },
            { path: Paths.AnimeDownload, element: <AnimeDownloadPage /> },
            { path: Paths.Profile, element: <ProfilePage /> },
            { path: Paths.Features, element: <FeaturesPage /> },
            {
                path: Paths.BackgroundLibrary,
                element: <BackgroundLibrary />,
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default appRouter;
