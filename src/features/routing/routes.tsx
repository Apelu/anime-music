import { db, handleSignIn } from "@assets/firebaseConfig";
import AnimeSubBar from "@features/anime/AnimeSubBar";
import Background from "@features/background/Background";
import {
    BackgroundItem,
    BackgroundKey,
    BackgroundType,
} from "@features/background/constants";
import { LiveWallPaper } from "@features/background/LiveWallPaper";

import NavBar from "@features/ui/NavBar";
import AnimePage from "@pages/AnimePage";
import ControllerPage from "@pages/ControllerPage";
import ErrorPage from "@pages/ErrorPage";
import FeaturesPage from "@pages/FeaturesPage";
import { FirebaseTest } from "@pages/FirebaseTest";
import LoginPage from "@pages/LoginPage";
import MusicPage from "@pages/MusicPage";
import ProfilePage from "@pages/ProfilePage";
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    startAfter,
    startAt,
    endAt,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

export enum Paths {
    Anime = "/anime",
    Music = "/music",
    Login = "/login",
    Controller = "/controller",
    Profile = "/profile",
    Features = "/features",
    FirebaseTest = "/firebase-test",
}

function Root() {
    const [backgroundItems, setBackgroundItems] = useState<BackgroundItem[]>(
        []
    );
    const [currentItemID, setCurrentID] = useState(
        parseInt(localStorage.getItem("currentItemID") || "0")
    );
    const [firstLastIDs, setFirstLastIDs] = useState({
        first: 1721873782968,
        last: 1721873782968,
    });

    const fetchData = async (fetchForward = true) => {
        const myLiveWallpapersRef = collection(db, "MyLiveWallpapers");

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

    function removeDuplicates(array: BackgroundItem[]) {
        return array.filter(
            (item, index) =>
                array.findIndex(
                    t => t[BackgroundKey.ID] === item[BackgroundKey.ID]
                ) == index
        );
    }
    useEffect(() => {
        handleSignIn(
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
        <main className="text-light">
            <Background
                backgroundItems={backgroundItems}
                setBackgroundItems={setBackgroundItems}
                currentItemID={currentItemID}
                setCurrentID={setCurrentID}
            />
            <NavBar />
            {/* <SubBar/> */}
            <AnimeSubBar
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
                }}
            />
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
                        <AnimePage />
                    </>
                ),
            },
            { path: Paths.Music, element: <MusicPage /> },
            { path: Paths.Login, element: <LoginPage /> },
            { path: Paths.Controller, element: <ControllerPage /> },
            { path: Paths.Profile, element: <ProfilePage /> },
            { path: Paths.Features, element: <FeaturesPage /> },
            { path: Paths.FirebaseTest, element: <FirebaseTest /> },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;
