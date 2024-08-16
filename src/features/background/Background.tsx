import { FeatureStatus } from "@features/documentation/constants";
import { BackgroundItem, BackgroundKey, BackgroundType } from "./constants";
import { BackgroundImage } from "./ui/BackgroundImage";
import { BackgroundVideo } from "./ui/BackgroundVideo";

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
