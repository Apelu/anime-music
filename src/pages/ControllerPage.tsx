import { Anime } from "@features/api/anilist/AniListAPI";
import { useEffect, useState } from "react";
import { DisplayItem } from "./DisplayItem";
import { DisplayAnimeCard } from "./AnimeDownloadPage";
import { ToastContainer, Toast } from "react-bootstrap";

interface Episode {
    watchPageUrl: string;
    episodeNumber?: string;
    status: string;
    statusMessage?: string;
    fileSize: number;
}

export interface DownloadQueueItem {
    seriesTitle: string;
    seriesFolderName: string;
    downloadStatus: string;
    coverImageUrl: string;
    gogoSeriesPageUrl: string;
    anilistResults: {
        id: number;
        title: { romaji: string; english: string };
        bannerImage: string;
        coverImage: { extraLarge: string; large: string; medium: string };
        siteUrl: string;
    };
    anilistID: string;
    startingPageUrl: string;
    expectedEpisodeCount: number;
    episodes: Episode[];
    createdDate: number;
    priority?: string;
}

interface DownloadQueue {
    isProcessingItem: boolean;
    items: DownloadQueueItem[];
}

interface AnilistObject {
    [key: string]: AnilistItem;
}
interface AnilistItem {
    id: number;
    idMal: number;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    synonyms: string[];
    coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string;
    };
    episodes: number;
    genres: string[];
    tags: { id: number; name: string }[];
    averageScore: number;
    relations: {
        edges: { relationType: string; node: { id: number; type: string } }[];
    };
}

export interface ToastProps {
    title: string;
    body: string;
    hideAfter: number;
    type: "success" | "danger" | "warning" | "info";
}

function ControllerPage() {
    const ViewModes = {
        Normal: "Normal",
        FixIssues: "Fix Issues",
    };

    const [toasts, setToasts] = useState<ToastProps[]>([]);

    function addToast(toast: ToastProps, timeoutInSeconds = 10) {
        setToasts([toast, ...toasts]);
        /**
         *  addToast({
                    title: `${item.seriesTitle} Priority Set`,
                    hideAfter: Date.now() + 5000,
                    body: data,
                    type: "success",
                });
         */
    }
    const [viewMode, setViewMode] = useState(ViewModes.Normal);
    const [downloadQueue, setDownloadQueue] = useState<DownloadQueue>({
        isProcessingItem: false,
        items: [],
    });

    const [anilistObj, setAnilistObj] = useState<AnilistObject | null>(null);

    const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);

    const [serverStatus, setServerStatus] = useState("Down");

    function refreshQueue() {
        fetch(`http://192.168.1.228:5555/api/animeDownload/downloadQueue`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log("Queue refreshed", data);
                setDownloadQueue(data);
                setServerStatus("Up");

                if (!anilistObj) {
                    getAnilistObj();
                }
            })
            .catch(error => {
                setServerStatus("Down");
                console.log("Error refreshing queue", error);
            });
    }

    function getAnilistObj() {
        fetch(`http://192.168.1.228:5555/api/animeDownload/anilistObject`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setAnilistObj(data);
            })
            .catch(error => {
                setAnilistObj({});
            });
    }

    useEffect(() => {
        refreshQueue();
    }, []);

    useEffect(() => {
        if (isAutoRefreshEnabled) {
            const interval = setInterval(() => {
                refreshQueue();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [isAutoRefreshEnabled]);

    if (!downloadQueue.items || downloadQueue.items.length === 0) {
        return (
            <div>
                <h1>No items in queue</h1>
            </div>
        );
    }

    const itemsGroupedByStatus = downloadQueue.items.reduce((acc, item) => {
        if (!acc[item.downloadStatus]) {
            acc[item.downloadStatus] = [];
        }

        acc[item.downloadStatus].push(item);
        return acc;
    }, {} as { [key: string]: DownloadQueueItem[] });

    return (
        <div
            style={{
                margin: "20px",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: serverStatus == "Up" ? "#f0f0f0" : "yellow",
                color: "#333",
            }}
        >
            {/* Select View Mode */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    zIndex: 9999,
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    padding: "5px",
                    overflow: "hidden",
                    maxHeight: "100vh",
                    overflowY: "auto",
                    borderRadius: "5px",
                }}
            >
                <ToastContainer className="position-static">
                    {toasts.map(toast => {
                        return (
                            <Toast show={toast.hideAfter > Date.now()}>
                                <Toast.Header>
                                    {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                                    <strong className="me-auto">
                                        {toast.title}
                                    </strong>
                                    {/* <small className="text-muted">{
                new Date().toLocaleTimeString()
                
            }</small> */}
                                </Toast.Header>
                                <Toast.Body>{toast.body}</Toast.Body>
                            </Toast>
                            // <div
                            //     className={`alert alert-${toast.type}`}
                            //     role="alert"
                            //     key={toast.title}
                            // >
                            //     <h4 className="alert-heading">{toast.title}</h4>
                            //     <p>{toast.body}</p>
                            // </div>
                        );
                    })}
                </ToastContainer>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <label
                    style={{
                        marginRight: "10px",
                    }}
                >
                    View Mode:
                </label>
                <select
                    value={viewMode}
                    onChange={e => {
                        setViewMode(e.target.value);
                    }}
                >
                    {Object.values(ViewModes).map(mode => {
                        return (
                            <option key={mode} value={mode}>
                                {mode}
                            </option>
                        );
                    })}
                </select>
            </div>

            {viewMode === ViewModes.Normal && (
                <NormalViewMode
                    downloadQueue={downloadQueue}
                    refreshQueue={refreshQueue}
                    serverStatus={serverStatus}
                    isAutoRefreshEnabled={isAutoRefreshEnabled}
                    setIsAutoRefreshEnabled={setIsAutoRefreshEnabled}
                    itemsGroupedByStatus={itemsGroupedByStatus}
                    anilistObj={anilistObj}
                    addToast={addToast}
                />
            )}

            {viewMode === ViewModes.FixIssues && (
                <FixIssues
                    downloadQueue={downloadQueue}
                    refreshQueue={refreshQueue}
                    serverStatus={serverStatus}
                    isAutoRefreshEnabled={isAutoRefreshEnabled}
                    setIsAutoRefreshEnabled={setIsAutoRefreshEnabled}
                    itemsGroupedByStatus={itemsGroupedByStatus}
                    anilistObj={anilistObj}
                    addToast={addToast}
                />
            )}
        </div>
    );
}

function NormalViewMode(props: {
    downloadQueue: DownloadQueue;
    refreshQueue: () => void;
    serverStatus: string;
    isAutoRefreshEnabled: boolean;
    setIsAutoRefreshEnabled: (value: boolean) => void;
    itemsGroupedByStatus: { [key: string]: DownloadQueueItem[] };
    anilistObj: AnilistObject | null;
    addToast: (toast: ToastProps) => void;
}) {
    const {
        downloadQueue,
        refreshQueue,
        serverStatus,
        isAutoRefreshEnabled,
        setIsAutoRefreshEnabled,
        itemsGroupedByStatus,
        anilistObj = {},
        addToast,
    } = props;
    return (
        <>
            {downloadQueue.items.filter(item => !item.anilistID).length}
            <h1>Queue Status: {serverStatus}</h1>
            <button
                className="btn btn-primary"
                onClick={() => {
                    refreshQueue();
                }}
            >
                Refresh Queue
            </button>

            {/* Auto refresh checkmark */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >
                <input
                    type="checkbox"
                    id="autoRefresh"
                    name="autoRefresh"
                    checked={isAutoRefreshEnabled}
                    style={{
                        marginRight: "10px",
                    }}
                    onChange={e => {
                        setIsAutoRefreshEnabled(e.target.checked);
                    }}
                />
                <label htmlFor="autoRefresh">Auto Refresh</label>
            </div>

            <div className="collapse show">
                <br></br>
                {Object.keys(itemsGroupedByStatus)
                    // .sort((statusA, statusB) => {
                    //     const statusValue: {
                    //         [key: string]: number;
                    //     } = {
                    //         Error: 0,
                    //         Downloading: 1,
                    //         "Not Yet Started": 2,
                    //         Downloaded: 3,
                    //         Cancelled: 3.5,
                    //         Upcoming: 4,
                    //     };

                    //     return statusValue[statusA] - statusValue[statusB];
                    // })
                    .map(status => {
                        var countInStatus = itemsGroupedByStatus[status].length;
                        var pendingEpisodes = itemsGroupedByStatus[
                            status
                        ].reduce((acc, item) => {
                            return (
                                acc +
                                item.episodes.filter(
                                    episode => episode.status !== "Downloaded"
                                ).length
                            );
                        }, 0);

                        var expectedEpisodes = itemsGroupedByStatus[
                            status
                        ].reduce((acc, item) => {
                            return acc + (item.expectedEpisodeCount || 0);
                        }, 0);

                        var total = itemsGroupedByStatus[status].reduce(
                            (acc, item) => {
                                return acc + item.episodes.length;
                            },
                            0
                        );

                        var showPendingEpisodes = pendingEpisodes > 0;

                        var key = status.replace(/[^a-zA-Z0-9]/g, "");
                        return (
                            <div key={key}>
                                <h2
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse-${key}`}
                                    aria-expanded="true"
                                    aria-controls={`collapse-${key}`}
                                    style={{ cursor: "pointer" }}
                                >
                                    {status} (count: {countInStatus}
                                    {showPendingEpisodes
                                        ? ` | pendingEpisodes: ${pendingEpisodes}`
                                        : expectedEpisodes &&
                                          status == "Not Yet Started"
                                        ? " | expectedEpisodes: " +
                                          expectedEpisodes
                                        : status == "Downloaded" && total
                                        ? ` | total: ${total}`
                                        : ""}{" "}
                                    )
                                </h2>
                                <div
                                    id={`collapse-${key}`}
                                    className={`collapse  ${
                                        status == "Downloaded" ||
                                        status != "Error"
                                            ? "show"
                                            : ""
                                    }`}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {itemsGroupedByStatus[status]
                                            // .sort((a, b) => {
                                            //     const aValue =
                                            //         a.episodes.filter(
                                            //             episode =>
                                            //                 episode.status !==
                                            //                 "Downloaded"
                                            //         ).length;

                                            //     const bValue =
                                            //         b.episodes.filter(
                                            //             episode =>
                                            //                 episode.status !==
                                            //                 "Downloaded"
                                            //         ).length;

                                            //     if (aValue < bValue) return 1;

                                            //     if (aValue > bValue) return -1;

                                            //     if (status == "Not Yet Started")
                                            //         return a.seriesTitle.localeCompare(
                                            //             b.seriesTitle
                                            //         );

                                            //     return 0;
                                            // })
                                            // .sort((a, b) => {
                                            //     // anilistObj
                                            //     //                     ? anilistObj[
                                            //     //                           item
                                            //     //                               .anilistID
                                            //     //                       ]
                                            //     //                           ?.averageScore
                                            //     //                     : 0

                                            //     if (!anilistObj) return 0;
                                            //     const scoreA =
                                            //         anilistObj[a.anilistID]
                                            //             ?.averageScore || 0;
                                            //     const scoreB =
                                            //         anilistObj[b.anilistID]
                                            //             ?.averageScore || 0;

                                            //     if (scoreA < scoreB) return -1;

                                            //     if (scoreA > scoreB) return 1;

                                            //     return 0;
                                            // })
                                            // .sort((a, b) => {
                                            //     // title

                                            //     return a.seriesTitle.localeCompare(
                                            //         b.seriesTitle
                                            //     );
                                            // })
                                            .map(item => {
                                                const pendingEpisodes =
                                                    item.episodes.filter(
                                                        episode =>
                                                            episode.status !==
                                                            "Downloaded"
                                                    );
                                                // if (
                                                //     status == "Downloaded" ||
                                                //     status == "Cancelled" ||
                                                //     status == "Upcoming"
                                                // )
                                                //     return null;

                                                return (
                                                    <div key={item.createdDate}>
                                                        {/* <h3>
                                                    {item.seriesTitle}
                                                    {status != "Downloaded" ||
                                                    true
                                                        ? pendingEpisodes.length
                                                            ? ` (${pendingEpisodes.length})`
                                                            : ""
                                                        : ""}
                                                </h3> */}
                                                        <DisplayItem
                                                            item={item}
                                                            score={
                                                                anilistObj
                                                                    ? anilistObj[
                                                                          item
                                                                              .anilistID
                                                                      ]
                                                                          ?.averageScore
                                                                    : ""
                                                            }
                                                            pendingEpisodes={
                                                                pendingEpisodes
                                                            }
                                                            addToast={addToast}
                                                        />
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                                <br></br>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

function MapToAniList() {
    const [downloadQueue, setDownloadQueue] = useState<DownloadQueue>({
        isProcessingItem: false,
        items: [],
    });

    function refreshQueue() {
        fetch(`http://192.168.1.228:5555/api/animeDownload/downloadQueue`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log("Queue refreshed", data);
                setDownloadQueue(data);

                fetchNext(data);
            })
            .catch(error => {
                console.log("Error refreshing queue", error);
            });
    }

    useEffect(() => {
        refreshQueue();

        // return () => clearInterval(lookupInterval);
    }, []);

    useEffect(() => {}, [downloadQueue]);

    async function fetchNext(downloadQueue: DownloadQueue) {
        const itemsPendingAnilistID = downloadQueue.items.filter(
            item =>
                !item.anilistID &&
                !item.anilistResults &&
                item.gogoSeriesPageUrl &&
                item.coverImageUrl &&
                item.seriesTitle
        );
        if (itemsPendingAnilistID && itemsPendingAnilistID.length > 0) {
            for (const nextItem of itemsPendingAnilistID) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log("Fetching next | ", nextItem.seriesTitle);

                try {
                    var response = await fetch("https://graphql.anilist.co", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            query: `query ($search: String) {
                                            Media(search: $search, type: ANIME) {
                                                id
                                                title {
                                                    romaji
                                                    english
                                                }
                                                bannerImage
                                                coverImage {
                                                    extraLarge
                                                    large
                                                    medium
                                                }
                                                siteUrl
                                            }
                                        }`,
                            variables: {
                                search: nextItem.seriesTitle,
                            },
                        }),
                    });
                    const data = await response.json();
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    console.log({ data });

                    if (data.data.Media) {
                        nextItem.anilistResults = data.data.Media;
                    }
                } catch (err) {
                    console.log("Error fetching next", err);
                }
                //

                if (!nextItem.anilistResults) {
                    nextItem.anilistResults = {
                        id: -1,
                        title: {
                            romaji: "Not Found",
                            english: "Not Found",
                        },
                        bannerImage: "",
                        coverImage: {
                            extraLarge: "",
                            large: "",
                            medium: "",
                        },
                        siteUrl: "",
                    };
                }

                downloadQueue = {
                    ...downloadQueue,
                    items: downloadQueue.items.map(item => {
                        if (
                            item.gogoSeriesPageUrl ===
                            nextItem.gogoSeriesPageUrl
                        ) {
                            item = nextItem;
                        }
                        return item;
                    }),
                };
                console.log("Next Item", nextItem);
                if (nextItem.anilistResults.id != -1) {
                }
            }
        } else {
            console.log(
                "No items pending lookup",
                itemsPendingAnilistID,
                downloadQueue.items
            );
        }
    }

    if (!downloadQueue.items || downloadQueue.items.length === 0) {
        return null;
    }

    function matchesIgnoreCase(a: string, b: string) {
        return a.toLowerCase() === b.toLowerCase();
    }

    return (
        <div>
            {/* [Item] | [Perform Lookup] */}
            {/* [Item] | [AniList#1] [AniList #2] >> */}
            {/* [Item] | [Selected Match] */}

            {downloadQueue.items
                .filter(
                    item => item.anilistResults && item.anilistResults.id != -1
                )
                .map(item => {
                    const isExactMatch = !item.anilistResults
                        ? false
                        : matchesIgnoreCase(
                              item.seriesTitle,
                              item.anilistResults.title.romaji
                          ) ||
                          matchesIgnoreCase(
                              item.seriesTitle,
                              item.anilistResults.title.english
                          );

                    var handledAuto = false;
                    if (isExactMatch) {
                        fetch(
                            `http://192.168.1.228:5555/api/animeDownload/updateAnilistID?gogoSeriesPageUrl=${item.gogoSeriesPageUrl}&anilistID=${item.anilistResults.id}`
                        )
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                if (data.succuess) {
                                    handledAuto = true;
                                }
                            })
                            .catch(error => {
                                alert(JSON.stringify(error, null, 2));
                            });
                    }
                    return handledAuto ? null : (
                        <div
                            key={item.createdDate}
                            style={{
                                backgroundColor: !item.anilistResults
                                    ? "white"
                                    : isExactMatch
                                    ? "lightgreen"
                                    : "lightcoral",
                            }}
                        >
                            <h3>{item.seriesTitle}</h3>

                            {/* Horizontal */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {/* Image */}
                                <img
                                    src={item.coverImageUrl}
                                    alt={item.seriesTitle}
                                    style={{
                                        width: "100px",
                                        height: "150px",
                                        marginRight: "10px",
                                    }}
                                />
                                {/* Verticle Divider */}
                                <div
                                    style={{
                                        borderLeft: "2px solid black",
                                        height: "150px",
                                        marginRight: "10px",
                                    }}
                                ></div>

                                {/* Anilist results */}

                                <div
                                    style={{
                                        display: "flex",
                                        overflow: "scroll",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                        }}
                                    >
                                        <img
                                            src={
                                                item.anilistResults &&
                                                item.anilistResults.coverImage
                                                    .large
                                            }
                                            alt={
                                                item.anilistResults &&
                                                item.anilistResults.title.romaji
                                            }
                                            style={{
                                                width: "200px",
                                                height: "300px",
                                                marginRight: "10px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "0",
                                                background:
                                                    "rgba(0, 0, 0, 0.5)",
                                                color: "#fff",
                                                width: "100%",
                                                textAlign: "center",
                                                padding: "5px",
                                            }}
                                        >
                                            <p>
                                                {(item.anilistResults &&
                                                    item.anilistResults.title
                                                        .romaji) ||
                                                    (item.anilistResults &&
                                                        item.anilistResults
                                                            .title.english)}
                                            </p>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    console.log(
                                                        "Selected Match"
                                                    );

                                                    fetch(
                                                        `http://192.168.1.228:5555/api/animeDownload/updateAnilistID?gogoSeriesPageUrl=${item.gogoSeriesPageUrl}&anilistID=${item.anilistResults.id}`
                                                    )
                                                        .then(response => {
                                                            return response.json();
                                                        })
                                                        .then(data => {
                                                            if (data.succuess) {
                                                                refreshQueue();
                                                            }
                                                        })
                                                        .catch(error => {
                                                            alert(
                                                                JSON.stringify(
                                                                    error,
                                                                    null,
                                                                    2
                                                                )
                                                            );
                                                        });
                                                }}
                                            >
                                                Select Match{" "}
                                                {item.anilistResults.id}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            <button
                className="btn btn-primary"
                onClick={() => {
                    // fetchNext();
                }}
            >
                Fetch Next
            </button>
        </div>
    );
}

function FixIssues(props: {
    downloadQueue: DownloadQueue;
    refreshQueue: () => void;
    serverStatus: string;
    isAutoRefreshEnabled: boolean;
    setIsAutoRefreshEnabled: (value: boolean) => void;
    itemsGroupedByStatus: { [key: string]: DownloadQueueItem[] };
    anilistObj: AnilistObject | null;
    addToast: (toast: ToastProps) => void;
}) {
    const {
        downloadQueue,
        refreshQueue,
        serverStatus,
        isAutoRefreshEnabled,
        setIsAutoRefreshEnabled,
        itemsGroupedByStatus,
        anilistObj = {},
        addToast,
    } = props;

    const hasAnilistRelations = downloadQueue.items.filter(
        item =>
            anilistObj &&
            item.anilistID &&
            anilistObj[item.anilistID] &&
            anilistObj[item.anilistID].relations &&
            anilistObj[item.anilistID].relations.edges &&
            anilistObj[item.anilistID].relations.edges.length > 0
    );

    function normalizeTitle(seriesTitle: string) {
        if (!seriesTitle) return "";

        seriesTitle = seriesTitle.replace(/[-:\/,.;?]/g, "").toLowerCase();

        var replacements: { [key: string]: string } = {
            " (uncensored) ": "",
            " (uncensored)": "",
            "(uncensored)": "",
            " season ": "",
            " ova ": " special ",
            " specials ": " special ",
        };

        Object.keys(replacements).forEach(key => {
            seriesTitle = seriesTitle.replace(key, replacements[key] as string);
        });

        return seriesTitle;
    }

    function isSameIgnoreCase(str1 = "", str2 = "") {
        if (!str1 || !str2) return false;

        str1 = normalizeTitle(str1);
        str2 = normalizeTitle(str2);

        return str1.toLowerCase() === str2.toLowerCase();
    }

    async function getPotentialAnilistMatch(item: DownloadQueueItem) {
        /*
router.get("/potentialMatches", async (req, res) => {
    const { seriesTitle } = req.query;
        */

        try {
            const response = await fetch(
                `http://192.168.1.228:5555/api/animeDownload/potentialMatches?seriesTitle=${item.seriesTitle}`
            );

            const data = await response.json();

            return data;
        } catch (error) {
            console.log("Error fetching potential matches", error);
            return [];
        }

        // const seriesTitle = normalizeTitle(item.seriesTitle);

        // if (!anilistObj) return [];

        // var potentialMatches = [];
        // for (const key in anilistObj) {
        //     const { title = {}, synonyms = [] } = anilistObj[key];

        //     const { romaji = "", english = "" } = title as {
        //         romaji: string;
        //         english: string;
        //     };

        //     const anilistTitles = [romaji, english, ...synonyms].map(title =>
        //         normalizeTitle(title)
        //     );

        //     if (
        //         anilistTitles.some(anilistTitle =>
        //             isSameIgnoreCase(seriesTitle, anilistTitle)
        //         )
        //     ) {
        //         potentialMatches.push(anilistObj[key]);
        //     }
        // }

        // return potentialMatches;
    }

    if (!anilistObj) {
        return null;
    }
    return (
        <div>
            <h1>Fix Issues View Mode</h1>

            {/* Fixing AniList ID */}

            {hasAnilistRelations.slice(0, 10).map(item => {
                const edges = anilistObj[item.anilistID].relations.edges;

                if (edges.length == 0) return null;

                const missing = edges.filter(edge => {
                    const { relationType, node } = edge;

                    const id = node.id;
                    const anilistItem = anilistObj[id];
                    const existingItem = downloadQueue.items.filter(
                        item => item.anilistID == `${id}`
                    );
                    if (existingItem.length > 0) return false;

                    if (!anilistItem) return false;
                    return true;
                });

                if (missing.length == 0) return null;

                return (
                    <div>
                        <DisplayItem
                            item={item}
                            pendingEpisodes={item.episodes}
                            addToast={addToast}
                        />

                        {/* Vertical Line */}

                        <h3>Potentially Missing </h3>
                        {item.anilistID && anilistObj[item.anilistID] ? (
                            <div>
                                {/* {anilistObj[
                                        item.anilistID
                                    ].relations.edges.map(edge => {
                                        const { relationType, node } = edge;

                                        const id = node.id;
                                        const anilistItem = anilistObj[id];
                                        const existingItem =
                                            downloadQueue.items.filter(
                                                item =>
                                                    item.anilistID == `${id}`
                                            );
                                        if (existingItem.length > 0)
                                            return null;

                                        if (!anilistItem) return null;

                                        const { title, coverImage } =
                                            anilistItem;
                                        const { romaji = "", english = "" } =
                                            title || {};
                                        const { extraLarge = "", large = "" } =
                                            coverImage || {};

                                        const psuedoItem: DownloadQueueItem = {
                                            seriesTitle: romaji || english,
                                            seriesFolderName: "",
                                            downloadStatus: "",
                                            coverImageUrl: large || extraLarge,
                                            gogoSeriesPageUrl: "",
                                            anilistResults: {
                                                id: id,
                                                title: {
                                                    romaji: romaji || "",
                                                    english: english || "",
                                                },
                                                bannerImage: "",
                                                coverImage: {
                                                    extraLarge: large || "",
                                                    large: extraLarge || "",
                                                    medium: "",
                                                },
                                                siteUrl: "",
                                            },
                                            anilistID: `${id}`,
                                            startingPageUrl: "",
                                            expectedEpisodeCount: 0,
                                            episodes: [],
                                            createdDate: Date.now(),
                                        };
                                        return (
                                            <DisplayItem
                                                item={psuedoItem}
                                                pendingEpisodes={[]}
                                            />
                                        );
                                    })} */}
                            </div>
                        ) : (
                            <div>Nope</div>
                        )}

                        <hr></hr>
                        {/* Potential Matches */}
                        {/* <div>{getPotentialAnilistMatch(item).length}</div> */}
                    </div>
                );
            })}

            {/* Fixing Episode Count Mismatch */}

            {/* Removing Extra Items */}

            {/* View Missing Relations */}

            {/* Fixing Missing Image? No */}
        </div>
    );
}

export default ControllerPage;
