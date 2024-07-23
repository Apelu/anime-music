import { getRandomNumber } from "@data/constants";
import AniListAPI, { AniListQueries } from "@features/anilist/AniListAPI";
import AnimeSubBar from "@features/anime/AnimeSubBar";
import NavBar from "@features/ui/NavBar";
import AnimePage from "@pages/AnimePage";
import ControllerPage from "@pages/ControllerPage";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import MusicPage from "@pages/MusicPage";
import ProfilePage from "@pages/ProfilePage";
import { useEffect, useState } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

export enum Paths {
    Anime = "/anime",
    Music = "/music",
    Login = "/login",
    Controller = "/controller",
    Profile = "/profile",
}

function Root() {
    const [bannerImages, setBannerImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(
        getRandomNumber(0, 50)
    );

    // const url1 =
    //     "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx141391-pUVgnceYVhJE.jpg";
    // const url11 =
    //     "https://s4.anilist.co/file/anilistcdn/media/anime/banner/141391-JErChZ8G3b49.jpg";
    // const url2 =
    //     "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx12189-eBb6fcM21Zh7.jpg";

    function nextImage() {
        setCurrentImageIndex(getRandomNumber(0, bannerImages.length - 1));
    }

    function pullMoreImages(pageNumber: number) {
        AniListAPI.performFetch(
            AniListQueries.getMedia({
                page: pageNumber,
                perPage: 50,
            })
        )
            .then(response => response.json())
            .then(jsonData => {
                const media = jsonData?.data?.Page?.media;
                if (media) {
                    const images = media.map(
                        (series: { bannerImage: string }) => {
                            return series.bannerImage;
                        }
                    );

                    setBannerImages([...bannerImages, ...images]);
                    if (pageNumber < 2) {
                        pullMoreImages(pageNumber + 1);
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching image URLs:", error);
            });
    }
    useEffect(() => {
        pullMoreImages(1);
    }, []);

    useEffect(() => {
        if (bannerImages.length > 0) {
            const interval = setInterval(nextImage, 10000);
            return () => clearInterval(interval);
        }
    }, [currentImageIndex, bannerImages]);

    return (
        <main>
            <img
                src={
                    bannerImages.length > 0
                        ? bannerImages[currentImageIndex]
                        : ""
                }
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100vw",
                    height: "100%",
                    zIndex: -1,
                    objectFit: "cover",
                }}
                className="bg-dark"
            />
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
            {
                path: Paths.Anime,
                element: (
                    <>
                        <AnimeSubBar />
                        <AnimePage />
                    </>
                ),
            },
            { path: Paths.Music, element: <MusicPage /> },
            { path: Paths.Login, element: <LoginPage /> },
            { path: Paths.Controller, element: <ControllerPage /> },
            { path: Paths.Profile, element: <ProfilePage /> },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;
