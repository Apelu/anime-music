import { FeatureStatus } from "@features/documentation/constants";
import { useEffect } from "react";
import { BackgroundItem, BackgroundKey, BackgroundType } from "./constants";

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

function Background({
    backgroundItems,
    setBackgroundItems,
    currentItemID,
    setCurrentID,
}: {
    backgroundItems: BackgroundItem[];
    setBackgroundItems: (items: BackgroundItem[]) => void;
    currentItemID: number;
    setCurrentID: (index: number) => void;
}) {
    useEffect(() => {}, [backgroundItems]);

    if (backgroundItems.length === 0) {
        return null;
    }

    const selectedBackgroundItem = backgroundItems.find(item => {
        return item[BackgroundKey.ID] === currentItemID;
    });

    console.log({ selectedBackgroundItem, currentItemID });
    if (selectedBackgroundItem === undefined) return null;

    return (
        //     <div
        //         style={{
        //             position: "fixed",
        //             left: 0,
        //             top: 0,
        //             width: "100vw",
        //             height: "100vh",
        //             zIndex: -1,
        //             objectFit: "contain",
        //             backgroundColor: "black",
        //         }}
        //         className="d-flex justify-items-center align-items-center text-light"
        //     >
        //         <h1 className="text-center bg-info w-100">
        //             {parseInt(selectedBackgroundItem[BackgroundKey.ID] + "") -
        //                 1721800000000}
        //         </h1>
        //     </div>
        // );

        selectedBackgroundItem[BackgroundKey.Type] == BackgroundType.Video ? (
            <BackgroundVideo selectedBackgroundItem={selectedBackgroundItem} />
        ) : (
            <BackgroundImage selectedBackgroundItem={selectedBackgroundItem} />
        )
    );
}

function BackgroundImage({
    selectedBackgroundItem,
}: {
    selectedBackgroundItem: BackgroundItem;
}) {
    return (
        <img
            src={selectedBackgroundItem[BackgroundKey.Url]}
            title={selectedBackgroundItem[BackgroundKey.Description]}
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                objectFit: "contain",
                backgroundColor: "black",
            }}
        />
    );
}

function BackgroundVideo({
    selectedBackgroundItem,
}: {
    selectedBackgroundItem: BackgroundItem;
}) {
    return (
        <video
            autoPlay
            muted={false}
            // controls
            loop
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                objectFit: "cover",
            }}
            src={selectedBackgroundItem[BackgroundKey.Url]}
            poster={selectedBackgroundItem[BackgroundKey.Poster]}
            title={selectedBackgroundItem[BackgroundKey.Description]}
        ></video>
    );
}

// function generateObj() {
//     var videoUrl = document.querySelector("div > div.post-inner > div.dd > div:nth-child(1) > ul > li:nth-child(1) > div > div > div > div > div.ml-3 > a").getAttribute("data-downloadurl")
//     var posterUrl = document.querySelector("div > div.post-inner > div.post-content > div:nth-child(2) > div > div.plyr__video-wrapper > video > source").src
//     var description = document.querySelector(" div > div.post-header > h1").innerText
//     return {
//         "[BackgroundKey.Type]": "BackgroundType.Video",
//         "[BackgroundKey.Url]": videoUrl,
//         "[BackgroundKey.Poster]":
//             posterUrl,
//         "[BackgroundKey.Description]": description
//     }
// }

// console.log(generateObj())

/*
{
        [BackgroundKey.Type]: BackgroundType.Video,
        [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=13040",
        [BackgroundKey.Poster]:
            "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Midoriya-Boku-no-Hero.jpg",
    }
*/

export default Background;
