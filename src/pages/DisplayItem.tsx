import { OverlayTrigger, Popover } from "react-bootstrap";
import { DownloadQueueItem, ToastProps } from "./ControllerPage";
import { ServerCalls } from "./AnimeDownloadPage";

export function DisplayItem({
    item,
    score,
    pendingEpisodes,
    addToast,
}: {
    item: DownloadQueueItem;
    score?: number | string;
    pendingEpisodes: DownloadQueueItem["episodes"];
    addToast?: (toast: ToastProps) => void;
}) {
    // Display pending episodes count on top right of image
    const hasPendingEpisodes = pendingEpisodes.length > 0;

    const popover = (
        <Popover
            id="popover-basic"
            style={{
                maxWidth: "90vw",
            }}
        >
            <Popover.Header>
                <small>{item.seriesTitle}</small>
            </Popover.Header>
            <Popover.Body>
                <ul className="list-group">
                    {pendingEpisodes.map(episode => (
                        <li
                            key={episode.watchPageUrl}
                            className="list-group-item"
                        >
                            <small>
                                {episode.episodeNumber} [{episode.status}]{" "}
                                {episode.statusMessage
                                    ? `: ${episode.statusMessage}`
                                    : ""}
                            </small>
                        </li>
                    ))}
                </ul>
            </Popover.Body>
        </Popover>
    );
    const pendingBadge = hasPendingEpisodes ? (
        <OverlayTrigger
            placement="bottom"
            trigger={["hover", "focus"]}
            overlay={popover}
        >
            <div
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                }}
            >
                {pendingEpisodes.length}
            </div>
        </OverlayTrigger>
    ) : null;

    // Display Image with text overlay showing series title (ignore episodes data)

    // query for top 100 anime series

    return (
        <div>
            <div
                style={{
                    position: "relative",
                    width: "105px",
                    height: "150px",
                    marginRight: "10px",
                }}
                // ondragstart="return false;" ondrop="return false;"

                draggable="false"
            >
                {item.coverImageUrl ? (
                    <img
                        loading="lazy"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "5px",
                        }}
                        src={item.coverImageUrl}
                        draggable="false"
                    />
                ) : null}

                {item.anilistID ? (
                    <a
                        href={`https://anilist.co/anime/${item.anilistID}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            borderRadius: "5px",
                            padding: "3px",
                            paddingTop: "0",
                            margin: "5px",
                            zIndex: 1,
                        }}
                        draggable="false"
                    >
                        <img
                            src="https://anilist.co/img/icons/icon.svg"
                            alt="Anilist Icon"
                            style={{
                                width: "16px",
                                height: "16px",
                            }}
                            draggable="false"
                        />
                    </a>
                ) : null}

                {pendingBadge}

                {item.coverImageUrl ? (
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "5px",
                            borderRadius: "0 0 5px 5px",
                            fontSize: "12px",
                            textAlign: "center",
                        }}
                        draggable="false"
                    >
                        <a
                            href={item.gogoSeriesPageUrl}
                            target="_blank"
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                            }}
                            draggable="false"
                        >
                            <div
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={item.seriesTitle}
                                draggable="false"
                            >
                                {item.seriesTitle}
                            </div>
                            {item.expectedEpisodeCount && (
                                <OverlayTrigger
                                    placement="bottom"
                                    trigger={["hover", "focus"]}
                                    overlay={
                                        <Popover id="popover-basic">
                                            <Popover.Body>
                                                Expected:{" "}
                                                {item.expectedEpisodeCount} |
                                                Found: {item.episodes.length}
                                                {item.episodes.map(episode => (
                                                    <div
                                                        key={
                                                            episode.watchPageUrl
                                                        }
                                                    >
                                                        {episode.episodeNumber}{" "}
                                                        {episode.status}{" "}
                                                        {episode.statusMessage}
                                                    </div>
                                                ))}
                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <div
                                        style={{
                                            fontSize: "10px",
                                            color: "lightgray",
                                        }}
                                        title={`Expected: ${item.expectedEpisodeCount} | Found: ${item.episodes.length}`}
                                        draggable="false"
                                    >
                                        {item.expectedEpisodeCount} episodes
                                        {item.expectedEpisodeCount >
                                            item.episodes.length &&
                                        item.downloadStatus == "Downloaded"
                                            ? " (incomplete)"
                                            : ""}
                                        <div>{score}</div>
                                    </div>
                                </OverlayTrigger>
                            )}
                        </a>
                    </div>
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            borderRadius: "5px 5px 5px 5px",
                            fontSize: "12px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "5px",
                        }}
                    >
                        <a
                            href={item.gogoSeriesPageUrl}
                            target="_blank"
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                            }}
                            draggable="false"
                        >
                            <small>{item.seriesTitle}</small>
                        </a>
                    </div>
                )}
            </div>
            <div
                style={{
                    display: "flex",
                    marginBottom: "10px",
                    width: "105px",
                    justifyContent: "space-between",
                }}
            >
                <button
                    className="btn btn-danger"
                    style={{
                        fontSize: "10px",
                    }}
                    title={"Dobule click to set priority to Cancelled"}
                    onDoubleClick={() => {
                        const serverCalls = new ServerCalls();

                        serverCalls.setPriority(item, "Cancelled").then(() => {
                            // alert("Priority set to Cancelled");
                        });
                    }}
                >
                    x
                </button>

                <button
                    className={
                        "btn " +
                        (item.priority == "Now" ? "btn-success" : "btn-primary")
                    }
                    style={{
                        fontSize: "10px",
                    }}
                    onClick={() => {
                        const serverCalls = new ServerCalls();

                        serverCalls.setPriority(item, "Now").then(() => {
                            // alert("Priority set to Cancelled");
                        });
                    }}
                >
                    {item.priority == "Now" ? "Pending" : "Start Now"}
                </button>
            </div>
        </div>
    );
}
