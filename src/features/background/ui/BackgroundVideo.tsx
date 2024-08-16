import { BackgroundItem, BackgroundKey } from "../constants";

export function BackgroundVideo({
    selectedBackgroundItem,
}: {
    selectedBackgroundItem: BackgroundItem;
}) {
    return (
        <video
            autoPlay
            muted
            // ={false}
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
