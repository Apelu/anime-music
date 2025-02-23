import { FeatureStatus } from "@features/documentation/constants";
import { BackgroundItem, BackgroundKey, BackgroundType } from "./constants";
import { BackgroundImage } from "./ui/BackgroundImage";
import { BackgroundVideo } from "./ui/BackgroundVideo";
import { myLiveWallpapersRef } from "@features/api/firebase";
import {
    query,
    orderBy,
    startAt,
    limit,
    where,
    getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export const BackgroundFeatures = [
    {
        title: "Background Library",
        description: "Browse and save backgrounds from the library.",
        status: FeatureStatus.Planned,
        subfeatures: [
            {
                title: "Live Wallpapers",
                description: "Browse and save live wallpapers.",
            },
            {
                title: "AniList Images",
                description: "Browse and save images from AniList.",
            },
            {
                title: "Anime Themes",
                description: "Browse and save anime themes.",
            },
            {
                title: "Custom Images",
                description: "Add custom images to the library.",
            },
        ],
    },
    {
        title: "My Backgrounds",
        description: "View and manage your saved backgrounds.",
        status: FeatureStatus.Planned,
        subfeatures: [
            {
                title: "Backgrounds SubBar Menu",
                description: "View the backgrounds subbar menu.",
                status: FeatureStatus.Planned,
            },
            {
                title: "View Backgrounds",
                description: "View the list of backgrounds.",
                status: FeatureStatus.Planned,
            },
            {
                title: "Add Background",
                description: "Add a new background to the list.",
                status: FeatureStatus.Planned,
            },
            {
                title: "Remove Background",
                description: "Remove a background from the list.",
                status: FeatureStatus.Planned,
            },
            {
                title: "Edit Background",
                description: "Edit a background in the list.",
                status: FeatureStatus.Planned,
                subfeatures: [
                    {
                        title: "Override the Background (Object-Fit)",
                        description:
                            "Change the object-fit of the background. (Cover, Contain, Fill, etc.)",
                        status: FeatureStatus.Planned,
                    },
                    {
                        title: "Update Background Details",
                        description:
                            "Update the details of the background. (Name, Description, etc.)",
                        status: FeatureStatus.Planned,
                    },
                ],
            },
        ],
    },

    {
        title: "Background Settings",
        description: "Change the settings of the background.",
        status: FeatureStatus.Planned,
        subfeatures: [
            {
                title: "Auto-Change Background",
                description: "Automatically change the background every X.",
                status: FeatureStatus.Planned,
            },
            {
                title: "Auto-Play Background Videos",
                description: "Automatically play the background videos.",
                status: FeatureStatus.Planned,
            },
            {
                title: "Background Volume",
                description: "Change the volume of the background videos.",
                status: FeatureStatus.Planned,
            },
        ],
    },
    {
        title: "Background Type",
        description: "Set the background type to an image or video.",
        status: FeatureStatus.Completed,
        subfeatures: [
            {
                title: "Image Background",
                description: "Set the background of the page to an image.",
                status: FeatureStatus.Completed,
            },
            {
                title: "Video / Live Wallpaper Background",
                description: "Set the background of the page to a video.",
                status: FeatureStatus.Completed,
            },
        ],
    },
    {
        title: "Background Toggle",
        description:
            "Make the background more visible by hiding everything else.",
    },
];

function Background() {
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
        // performEmailPasswordSignIn(
        //     "apelu47@gmail.com",
        //     "kih209kjeu3409erklbgi892i0po3kwtr8h95i0mkbn34u0rkoefjbthu423k;l"
        // );
        // fetchData();
    }, []);

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
    const selectedBackgroundItem = backgroundItems.find(item => {
        return item[BackgroundKey.ID] === currentItemID;
    }) || {
        id: 1721879935266,
        type: BackgroundType.Video,
        url: "/video/mylivewallpapers.com-Sakura-Drops.mp4",
        description: "Sakura Drops Live Wallpaper",
        poster: "",
    };
    if (selectedBackgroundItem === undefined) return null;

    return selectedBackgroundItem[BackgroundKey.Type] ==
        BackgroundType.Video ? (
        <BackgroundVideo selectedBackgroundItem={selectedBackgroundItem} />
    ) : (
        <BackgroundImage selectedBackgroundItem={selectedBackgroundItem} />
    );
}

export default Background;
