import { useState } from "react";
import { BackgroundItem, BackgroundKey, BackgroundType } from "./constants";
import { BackgroundImage } from "./BackgroundImage";
import { BackgroundVideo } from "./BackgroundVideo";

function Background() {
    const [backgroundItems, setBackgroundItems] = useState<BackgroundItem[]>(
        []
    );
    const [currentItemID, setCurrentID] = useState(
        parseInt(localStorage.getItem("currentItemID") || "0")
    );

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
