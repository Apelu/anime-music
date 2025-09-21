import { BackgroundItem, BackgroundKey } from "./constants";

export function BackgroundImage({
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
