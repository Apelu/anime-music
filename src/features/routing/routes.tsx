import SubBar from "@features/anime/AnimeSubBar";
import { Anime } from "@features/api/anilist/AniListAPI";
import {
    myLiveWallpapersRef,
    performEmailPasswordSignIn,
} from "@features/api/firebase";
import Background from "@features/background/Background";
import {
    BackgroundItem,
    BackgroundKey,
    BackgroundType,
} from "@features/background/constants";
import NavBar from "@features/ui/NavBar";
import AnimePage from "@pages/AnimePage";
import BackgroundLibrary from "@pages/BackgroundLibrary";
import ControllerPage from "@pages/ControllerPage";
import ErrorPage from "@pages/ErrorPage";
import { FactorPage } from "@pages/FactorPage";
import FeaturesPage from "@pages/FeaturesPage";
import LoginPage from "@pages/LoginPage";
import MusicPage from "@pages/MusicPage";
import ProfilePage from "@pages/ProfilePage";
import {
    query,
    orderBy,
    startAt,
    limit,
    where,
    getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ProviderParent from "./ProviderParent";
import "../../assets/App.css";

export enum Paths {
    Anime = "/anime",
    Music = "/music",
    Login = "/login",
    Controller = "/controller",
    Profile = "/profile",
    Features = "/features",
    BackgroundLibrary = "/background-library",
}

function Root() {
    const [animeData, setAnimeData] = useState<Anime[]>([]);

    const [backgroundItems, setBackgroundItems] = useState<BackgroundItem[]>([
        // {
        //     id: 1721879935266,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12371",
        //     description: "Sakura Drops Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Sakura-Drops.jpg",
        // },
        // {
        //     id: 1721879935267,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12389",
        //     description: "Reach Out-Nier Automata Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Reach-Out-Nier-Automata.jpg",
        // },
        // {
        //     id: 1721879935268,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12409",
        //     description: "Anime Girl Shooting Stars Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Anime-Girl-Shooting-Stars.jpg",
        // },
        // {
        //     id: 1721879935269,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12447",
        //     description: "Uraraka Ochako Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Uraraka-Ochako.jpg",
        // },
        // {
        //     id: 1721879935270,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12471",
        //     description: "Izumi Sagiri Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Izumi-Sagiri.jpg",
        // },
        // {
        //     id: 1721879935272,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12493",
        //     description: "Mashu Kyrielight-Fate Grand Order Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Mashu-Kyrielight-FGO.jpg",
        // },
        // {
        //     id: 1721879935273,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12497",
        //     description: "Berserker-Fate Zero Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Berserker-Fate-Zero.jpg",
        // },
        // {
        //     id: 1721879935274,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12534",
        //     description: "Spice and Wolf Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Spice-and-Wolf.jpg",
        // },
        // {
        //     id: 1721879935275,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12538",
        //     description: "Natsuki-Doki Doki Literature Club Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Natsuki-Doki-Doki-Literature-Club.jpg",
        // },
        // {
        //     id: 1721880008221,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12542",
        //     description: "My Neighbor Totoro Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-My-Neighbor-Totoro.jpg",
        // },
        // {
        //     id: 1721880008223,
        //     type: BackgroundType.Video,
        //     url: "https://mylivewallpapers.com/?ddownload=12562",
        //     description: "Ayame Ugasi Live Wallpaper",
        //     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Ayame-Ugasi.jpg",
        // },
    ]);
    const [currentItemID, setCurrentID] = useState(
        parseInt(localStorage.getItem("currentItemID") || "0")
    );
    const [firstLastIDs, setFirstLastIDs] = useState({
        first: 1721873782968,
        last: 1721873782968,
    });

    const fetchData = async (fetchForward = true) => {
        if (fetchForward) return;
        if (!fetchForward) return;
        const LOAD_COUNT = 10;
        const docsQuery = fetchForward
            ? query(
                  myLiveWallpapersRef,
                  orderBy("createdAt", "asc"),
                  startAt(currentItemID),
                  limit(LOAD_COUNT + 1)
              )
            : query(
                  myLiveWallpapersRef,
                  orderBy("createdAt", "desc"),
                  where("createdAt", "<=", currentItemID),
                  limit(LOAD_COUNT + 1)
              );
        const querySnapshot = await getDocs(docsQuery);

        const lastItemQuery = query(
            myLiveWallpapersRef,
            orderBy("createdAt", "desc"),
            limit(1)
        );
        const lastItemSnapshot = await getDocs(lastItemQuery);

        const newestItemID = {
            first: firstLastIDs.first,
            last: firstLastIDs.last,
        };

        lastItemSnapshot.forEach(doc => {
            var docData = doc.data();
            newestItemID["last"] = docData.createdAt;
        });

        var allData: BackgroundItem[] = [];
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            var docData = doc.data();
            var wallpaper: BackgroundItem = {
                [BackgroundKey.ID]: docData.createdAt,
                [BackgroundKey.Type]: BackgroundType.Video,
                [BackgroundKey.Url]: docData.url,
                [BackgroundKey.Description]: docData.description,
                [BackgroundKey.Poster]: docData.poster,
            };

            if (
                wallpaper.url &&
                wallpaper.url.includes("https://") &&
                (backgroundItems.find(item => {
                    return item[BackgroundKey.ID] === currentItemID;
                }) === undefined ||
                    wallpaper[BackgroundKey.ID] != currentItemID)
            ) {
                allData.push(wallpaper);
            }
        });
        console.log({ allData, newestItemID });

        if (fetchForward && allData.length > 0) {
            setBackgroundItems([...backgroundItems, ...allData]);

            if (allData[0][BackgroundKey.ID] !== undefined) {
                setCurrentID(allData[0][BackgroundKey.ID]);
            }
        } else {
            setBackgroundItems([...allData.reverse(), ...backgroundItems]);
            var lastID = allData[allData.length - 1][BackgroundKey.ID];
            if (lastID !== undefined) {
                setCurrentID(lastID);
            }
        }
        setFirstLastIDs(newestItemID);
    };

    useEffect(() => {
        performEmailPasswordSignIn(
            "apelu47@gmail.com",
            "kih209kjeu3409erklbgi892i0po3kwtr8h95i0mkbn34u0rkoefjbthu423k;l"
        );

        fetchData();
    }, []);

    useEffect(() => {}, []);

    function getCurrentIndex() {
        var index = backgroundItems.findIndex(
            item =>
                item[BackgroundKey.ID] &&
                item[BackgroundKey.ID] === currentItemID
        );
        return index === -1 ? 0 : index;
    }

    function nextBackgroundItem() {
        if (currentItemID == firstLastIDs.last)
            return console.log("End of List");
        console.log("Next Background Item");

        var nextIndex =
            getCurrentIndex() < backgroundItems.length - 1
                ? getCurrentIndex() + 1
                : 0;

        if (nextIndex === 0) {
            console.log("Fetching Data");
            fetchData();

            return;
        }

        var nextID = backgroundItems[nextIndex][BackgroundKey.ID];
        if (nextID === undefined) {
            console.log("Next ID is undefined", { nextIndex, nextID });
            return;
        }
        console.log({ nextID });
        setCurrentID(nextID);
        localStorage.setItem("currentItemID", nextID.toString());
    }

    function previousBackgroundItem() {
        if (currentItemID == firstLastIDs.first) {
            return console.log("Beginning of List");
        }

        var previousIndex =
            getCurrentIndex() > 0
                ? getCurrentIndex() - 1
                : backgroundItems.length - 1;

        if (previousIndex === backgroundItems.length - 1) {
            fetchData(false);
            return;
        }

        var previousID = backgroundItems[previousIndex][BackgroundKey.ID];
        if (previousID === undefined) {
            console.log("Previous ID is undefined", {
                previousIndex,
                previousID,
            });
            return;
        }
        setCurrentID(previousID);
        localStorage.setItem("currentItemID", previousID.toString());
    }

    return (
        <main
            className="text-light"
            // bg-dark"
        >
            <Background
                backgroundItems={backgroundItems}
                setBackgroundItems={setBackgroundItems}
                currentItemID={currentItemID}
                setCurrentID={setCurrentID}
            />
            <NavBar />
            {/* <SubBar/> */}
            <SubBar
                {...{
                    currentItemIndex: currentItemID,
                    nextBackgroundItem,
                    previousBackgroundItem,
                }}
            />
            <Outlet
                context={{
                    nextBackgroundItem,
                    previousBackgroundItem,
                    animeData,
                    setAnimeData,
                    backgroundItems,
                }}
            />
        </main>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProviderParent>
                <Root />
            </ProviderParent>
        ),
        children: [
            {
                path: "/",
                element: <FactorPage />,
            },
            {
                path: Paths.Anime,

                element: (
                    <>
                        <AnimePage />
                    </>
                ),
            },
            { path: Paths.Music, element: <MusicPage /> },
            { path: Paths.Login, element: <LoginPage /> },
            { path: Paths.Controller, element: <ControllerPage /> },
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

export default router;
