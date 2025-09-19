import { useEffect, useState } from "react";
import { DisplayItem } from "./DisplayItem";
import { Modal } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { baseURL } from "@shared/MyLocalServer";

interface DataItem {
    seriesTitle: string;
    gogoSeriesPageUrl: string;
    anilistID: string;
    coverImageUrl: string;
    downloadStatus: string;
    priority: string;
}

interface AnimeEpisode {
    watchPageUrl: string;
    episodeNumber: string;
    status: string;
    statusMessage: string;
    fileSize: number;
    expectedFileSize: string;
    episodeDownloadPageUrl: string;
}

interface Anime {
    seriesTitle: string;
    seriesFolderName: string;
    coverImageUrl: string;
    downloadStatus: string;
    gogoSeriesPageUrl: string;
    anilistID: string;
    episodes: AnimeEpisode[];
}

function ActualPage(props: { downloadQueue: DownloadQueue }) {
    // Get Items that are missing AniList ID
    // Return AniList lookup results
    // Add buttons below images to allow for confirmation

    // [Item] | [Result#1] [Result #2] >> [Selected Match]
    // -------|--Confirm----Confirm

    return (
        <h3>
            <ul>
                <li>AniList Mapping</li>
                {/* <AniListMappingHelper /> */}
                <li>Relation Checking</li>
                <RelationChecking downloadQueue={props.downloadQueue} />
                <li>Gaps</li>
                {/* <Gaps /> */}
            </ul>
        </h3>
    );
}

export class ServerCalls {
    confirmAniListMapping(
        seriesFolderName: string,
        anilistID: number
    ): RequestInfo | URL {
        return (
            this.baseURL +
            `/confirmAniListMapping?seriesFolderName=${seriesFolderName}&anilistID=${anilistID}`
        );
    }
    baseURL: string;

    constructor() {
        this.baseURL = baseURL + ":5555/api/animeDownload/";
        // this.baseURL = "http://localhost:5555/api/animeDownload/";
    }

    getListItems(listName: string, searchText: string, limit: number = 50) {
        return (
            this.baseURL +
            `/getListItems?listName=${listName}&searchText=${searchText}&limit=${limit}`
        );
    }

    addToPlanning(seriesFolderName: string) {
        return (
            this.baseURL + "/addToPlanning?seriesFolderName=" + seriesFolderName
        );
    }

    removeFromPlanning(seriesFolderName: string) {
        return (
            this.baseURL +
            "/removeFromPlanning?seriesFolderName=" +
            seriesFolderName
        );
    }

    sendCommand(command: string) {
        return fetch(this.baseURL + "/sendCommand?command=" + command);
    }

    getClients() {
        return this.baseURL + "/getClients";
    }

    getAnimeData(params: {
        seriesFolderName?: string;
        episodeNumber?: string;
        includeTimelineData?: boolean;
    }) {
        return fetch(
            this.baseURL +
                `/getAnimeData?seriesFolderName=${
                    params.seriesFolderName || ""
                }&episodeNumber=${params.episodeNumber || ""}
                &includeTimelineData=${params.includeTimelineData || false}`
        );
    }

    /**
     * 
     * @params.seriesFolderName,
            params.episodeNumber
     */
    getUpdatesUrl(params: {
        seriesFolderName?: string;
        episodeNumber?: string;
    }) {
        return (
            this.baseURL +
            `/getUpdates?seriesFolderName=${
                params.seriesFolderName || ""
            }&episodeNumber=${params.episodeNumber || ""}`
        );
    }

    getProgress() {
        return fetch(this.baseURL + "/getProgress");
    }

    getEpisodes(seriesFolderName: string) {
        return fetch(
            this.baseURL + "/video?seriesFolderName=" + seriesFolderName
        );
    }

    confirmAlertUrl() {
        return this.baseURL + "/confirmAlert";
    }

    updateProgress(
        seriesFolderName: string,
        episodeNumber: string,
        progress: number,
        duration: number
    ) {
        // /updateProgress?seriesFolderName=seriesFolderName&episodeNumber=episodeNumber&progress=progress
        return fetch(
            this.baseURL +
                "/updateProgress?seriesFolderName=" +
                seriesFolderName +
                "&episodeNumber=" +
                episodeNumber +
                "&progress=" +
                progress +
                "&duration=" +
                duration
        );
    }

    getVideoUrl(seriesFolderName: string, episodeNumber: string) {
        return (
            this.baseURL +
            "/video?seriesFolderName=" +
            seriesFolderName +
            "&episodeNumber=" +
            episodeNumber
        );
    }

    getSubtitleUrl(seriesFolderName: string, episodeNumber: string) {
        return (
            this.baseURL +
            "/subtitle?seriesFolderName=" +
            seriesFolderName +
            "&episodeNumber=" +
            episodeNumber
        );
    }

    getVideo(seriesFolderName: string, episodeNumber: string) {
        return fetch(
            this.baseURL +
                "/video?seriesFolderName=" +
                seriesFolderName +
                "&episodeNumber=" +
                episodeNumber
        );
    }

    getAnimeMissingAnilistID() {
        return fetch(this.baseURL + "/getAnimeMissingAnilistID");
    }

    updateAnilistID(gogoSeriesPageUrl: string, anilistID: string) {
        return fetch(
            `${this.baseURL}/updateAnilistID?gogoSeriesPageUrl=${gogoSeriesPageUrl}&anilistID=${anilistID}`
        );
    }

    anilistObjectgetAnilistObj() {
        return fetch(this.baseURL + "/getAnilistObj");
    }

    getMissing() {
        return fetch(this.baseURL + "/getMissing");
    }

    double() {
        return fetch(this.baseURL + "/double");
    }

    getAnimeList() {
        return fetch(this.baseURL + "/getAnimeList");
    }

    Identifiers = {
        AnimeMap: "animeMap.json",
        GogoAnimeQueue: "gogoAnimeQueue.json",
    };

    setPriorityNever(item: DataItem) {
        return fetch(
            `${this.baseURL}/addToQueue?seriesTitle=${item.seriesTitle}&startingPageUrl=${item.gogoSeriesPageUrl}&priority=Never&identifier=${this.Identifiers.GogoAnimeQueue}`
        );
    }

    setPriorityHigh(item: DataItem) {
        return fetch(
            `${this.baseURL}/addToQueue?seriesTitle=${item.seriesTitle}&startingPageUrl=${item.gogoSeriesPageUrl}&priority=High&identifier=${this.Identifiers.GogoAnimeQueue}`
        );
    }

    setPriority(item: DataItem | DownloadQueueItem, priority: string) {
        return fetch(
            `${this.baseURL}/addToQueue?seriesTitle=${item.seriesTitle}&startingPageUrl=${item.gogoSeriesPageUrl}&priority=${priority}&identifier=${this.Identifiers.GogoAnimeQueue}`
        );
    }
}

function Gaps() {
    /*
    const queueData = [];

    downloadQueue.items.forEach(item => {
        const {
            seriesTitle,
            gogoSeriesPageUrl,
            anilistID,
            coverImageUrl,
            downloadStatus,
        } = item;

        if (!queueData.find(it => it.gogoSeriesPageUrl === gogoSeriesPageUrl)) {
            queueData.push({
                seriesTitle,
                gogoSeriesPageUrl,
                anilistID,
                coverImageUrl,
                downloadStatus,
            });
        }
    });


    */

    interface ToastProps {
        title: string;
        body: string;
        hideAfter: number;
        type: "success" | "danger" | "warning" | "info";
    }

    const [data, setData] = useState<DataItem[]>([]);
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const serverCalls = new ServerCalls();
    useEffect(() => {
        serverCalls
            .double()
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
            });
    }, []);

    function addToast(toast: ToastProps, timeoutInSeconds = 10) {
        setToasts([toast, ...toasts]);
    }

    function setItemPriority(item: DataItem, priority: string) {
        item.priority = priority;

        serverCalls
            .setPriority(item, priority)
            .then(response => {
                return response.text();
            })
            .then(data => {
                addToast({
                    title: `${item.seriesTitle} Priority Set`,
                    hideAfter: Date.now() + 5000,
                    body: data,
                    type: "success",
                });
            })
            .catch(error => {
                addToast({
                    title: "Error setting priority",
                    hideAfter: Date.now() + 5000,

                    body: error,
                    type: "danger",
                });
            });
    }

    return (
        <div>
            <div>{data.length}</div>
            {/* React Bootstrap Toast Container */}
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

            {data.map(item => {
                return (
                    <>
                        <div
                            style={{
                                backgroundColor:
                                    item.downloadStatus == "Downloaded"
                                        ? "green"
                                        : item.priority == "High" ||
                                          item.priority == "Medium" ||
                                          item.priority == "Low"
                                        ? "orange"
                                        : "yellow",
                                padding: "5px",
                                display: "flex",
                            }}
                        >
                            {/* <a href={item.gogoSeriesPageUrl} target="_blank">
                            <img
                                src={item.coverImageUrl}
                                style={{
                                    width: "100px",
                                    height: "150px",
                                }}
                            />
                        </a> */}
                            <DisplayAnimeCard
                                {...{
                                    imageSrc: item.coverImageUrl,
                                    title: item.seriesTitle,
                                    topLeftComponent: (
                                        <div>
                                            <a
                                                href={
                                                    "https://gogoanime3.cc/search.html?keyword=" +
                                                    item.seriesTitle.replace(
                                                        /[^a-zA-Z0-9\s]/g, // alphanumeric, punctuation, and single/double quotes and spaces

                                                        " "
                                                    )
                                                }
                                                target="_blank"
                                            >
                                                <img
                                                    src="https://cdn.gogocdn.net/files/gogo/img/favicon.ico"
                                                    alt="GogoAnime Icon"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                    }}
                                                    draggable="false"
                                                />
                                            </a>
                                        </div>
                                    ),
                                    topRightComponent: item.anilistID ? (
                                        <div>
                                            <a
                                                href={`https://anilist.co/anime/${item.anilistID}`}
                                                target="_blank"
                                            >
                                                <img
                                                    src="https://anilist.co/img/icons/icon.svg"
                                                    alt="Anilist Icon"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                    }}
                                                    draggable="false"
                                                />
                                            </a>
                                        </div>
                                    ) : undefined,
                                    bottomComponent: (
                                        <div style={{ display: "flex" }}>
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() => {
                                                    setItemPriority(
                                                        item,
                                                        "High"
                                                    );
                                                }}
                                            >
                                                Add to High Queue
                                            </button>
                                        </div>
                                    ),
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                }}
                            >
                                <div>{item.seriesTitle} </div>
                                <div>[{item.priority}]</div>
                                <button
                                    className="btn btn-secondary mt-3"
                                    onClick={() => {
                                        setItemPriority(item, "Medium");
                                    }}
                                >
                                    Marker as Medium
                                </button>

                                <button
                                    className="btn btn-danger mt-3"
                                    onClick={() => {
                                        setItemPriority(item, "Never");
                                    }}
                                >
                                    Marker as Never
                                </button>

                                <button
                                    className="btn btn-secondary mt-3"
                                    onClick={() => {
                                        setItemPriority(
                                            item,
                                            "Hidden - Chinese"
                                        );
                                    }}
                                >
                                    Marker as Hidden - Chinese
                                </button>

                                <button
                                    className="btn btn-secondary mt-3"
                                    onClick={() => {
                                        setItemPriority(item, "Low");
                                    }}
                                >
                                    Marker as Low
                                </button>
                            </div>
                        </div>
                        <hr></hr>
                    </>
                );
            })}
        </div>
    );
}

function RelationChecking({ downloadQueue }: { downloadQueue: DownloadQueue }) {
    const [anilistObj, setAnilistObj] = useState<AnilistObject | null>(null);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const serverCalls = new ServerCalls();
        serverCalls
            .anilistObjectgetAnilistObj()
            .then(response => {
                return response.json();
            })
            .then(data => {
                setAnilistObj(data);
            });

        serverCalls
            .getMissing()
            .then(response => {
                console.log({ response });
                return response.json();
            })
            .then(data => {
                console.log({ data });
                setData(data);
            });
    }, []);

    if (!anilistObj) {
        return <h1>Loading</h1>;
    }

    return (
        <div>
            {/* <h1>AniList Object ({missingRelations.length})</h1> */}
            {/* {JSON.stringify(data, null, 2)} */}
            <h1>Missing Relations ({data.length})</h1>
            {data.map((group: { sources: any; missing: any }) => {
                const { sources, missing } = group;

                return (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            overflowX: "scroll",
                        }}
                    >
                        {Object.keys(sources).map(sourceID => {
                            const anilistItem = anilistObj[sourceID];
                            return (
                                <DisplayAnimeCard
                                    {...{
                                        imageSrc:
                                            anilistItem.coverImage.extraLarge ||
                                            anilistItem.coverImage.large ||
                                            "",
                                        title:
                                            anilistItem.title.romaji ||
                                            anilistItem.title.english ||
                                            "",
                                        topLeftComponent: (
                                            <div>
                                                <a
                                                    href={`https://anilist.co/anime/${anilistItem.id}`}
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://anilist.co/img/icons/icon.svg"
                                                        alt="Anilist Icon"
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                        }}
                                                        draggable="false"
                                                    />
                                                </a>
                                            </div>
                                        ),
                                        // Search for keyword
                                        topRightComponent: (
                                            <div>
                                                <a
                                                    href={`https://gogoanime3.cc/search.html?keyword=${anilistItem.title.romaji.replace(
                                                        /[^a-zA-Z0-9\s]/g, // alphanumeric, punctuation, and single/double quotes and spaces
                                                        "+"
                                                    )}`}
                                                    target="_blank"
                                                >
                                                    <small>
                                                        <small>
                                                            <small>
                                                                <img
                                                                    src="https://cdn.gogocdn.net/files/gogo/img/favicon.ico"
                                                                    alt="GogoAnime Icon"
                                                                    style={{
                                                                        width: "32px",
                                                                        height: "32px",
                                                                    }}
                                                                    draggable="false"
                                                                />
                                                            </small>
                                                        </small>
                                                    </small>
                                                </a>
                                            </div>
                                        ),
                                    }}
                                />
                            );
                        })}

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "5px",
                            }}
                        >
                            {">>"}
                        </div>

                        {Object.keys(missing).map(missingID => {
                            const anilistItem = anilistObj[missingID];
                            return (
                                <DisplayAnimeCard
                                    {...{
                                        imageSrc:
                                            anilistItem.coverImage.extraLarge ||
                                            anilistItem.coverImage.large ||
                                            "",
                                        title:
                                            anilistItem.title.romaji ||
                                            anilistItem.title.english ||
                                            "",
                                        topLeftComponent: (
                                            <div>
                                                <a
                                                    href={`https://anilist.co/anime/${anilistItem.id}`}
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://anilist.co/img/icons/icon.svg"
                                                        alt="Anilist Icon"
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                        }}
                                                        draggable="false"
                                                    />
                                                </a>
                                            </div>
                                        ),
                                        //Search for keyword
                                        topRightComponent: (
                                            <div>
                                                <a
                                                    href={`https://gogoanime3.cc/search.html?keyword=${anilistItem.title.romaji.replace(
                                                        /[^a-zA-Z0-9\s]/g, // alphanumeric, punctuation, and single/double quotes and spaces
                                                        "+"
                                                    )}`}
                                                    target="_blank"
                                                >
                                                    <small>
                                                        <small>
                                                            <small>
                                                                <img
                                                                    src="https://cdn.gogocdn.net/files/gogo/img/favicon.ico"
                                                                    alt="GogoAnime Icon"
                                                                    style={{
                                                                        width: "32px",
                                                                        height: "32px",
                                                                    }}
                                                                    draggable="false"
                                                                />
                                                            </small>
                                                        </small>
                                                    </small>
                                                </a>
                                            </div>
                                        ),
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

interface HandleAniListLookupModalProps {
    showingLookupModal: { show: boolean; item: Anime | null };
    setShowingLookupModal: (value: {
        show: boolean;
        item: Anime | null;
    }) => void;
    reloadData: () => void;
}

interface AnilistPageData {
    pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
        perPage: number;
    };
    media: {
        id: number;
        title: { romaji: string; english: string };
        bannerImage: string;
        coverImage: { extraLarge: string; large: string; medium: string };
        siteUrl: string;
        episodes: number;
    }[];
}

function similarity(s1: string, s2: string) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (
        (longerLength - editDistance(longer, shorter)) /
        parseFloat(longerLength.toString())
    );
}

function editDistance(s1: string, s2: string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue =
                            Math.min(Math.min(newValue, lastValue), costs[j]) +
                            1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function getAnilistResultSimilarity(
    str: string,
    a: {
        id: number;
        title: { romaji: string; english: string };
        bannerImage: string;
        coverImage: { extraLarge: string; large: string; medium: string };
        siteUrl: string;
        episodes: number;
    },
    b: {
        id: number;
        title: { romaji: string; english: string };
        bannerImage: string;
        coverImage: { extraLarge: string; large: string; medium: string };
        siteUrl: string;
        episodes: number;
    }
): number {
    const aScores = [
        similarity(str || "", a.title.romaji || ""),
        similarity(str || "", a.title.english || ""),
    ];

    const bScores = [
        similarity(str || "", b.title.romaji || ""),
        similarity(str || "", b.title.english || ""),
    ];

    const aScore = Math.max(...aScores);
    const bScore = Math.max(...bScores);

    return bScore - aScore;
}
function HandleAniListLookupModal({
    showingLookupModal,
    setShowingLookupModal,
    reloadData,
}: HandleAniListLookupModalProps) {
    const [anilistResults, setAnilistResults] = useState<
        AnilistPageData["media"]
    >([]);

    const [pageData, setPageData] = useState<AnilistPageData | null>(null);
    const [search, setSearch] = useState({
        title: "",
        page: 1,
    });
    function doFetch(seriesTitle: string, page = 1) {
        const replacementMap: { [key: string]: string } = {
            ":": " ",
            "-": " ",
            Movie: "",
            Season: "",
            Episode: "",
            OVA: "",
            Specials: "",
            Special: "",
            The: "",
        };

        Object.keys(replacementMap).forEach(key => {
            seriesTitle = seriesTitle.replaceAll(key, replacementMap[key]);

            // Remove extra spaces
            seriesTitle = seriesTitle.replace(/\s+/g, " ");
        });

        var currentSeriesTitle = seriesTitle.replace(/[^a-zA-Z0-9\s!.,?]/g, "");
        setSearch({
            title: currentSeriesTitle,
            page,
        });
        fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `query ($search: String) {
                    Page(page: ${page}, perPage: 50) {
                        pageInfo {
                            total
                            currentPage
                            lastPage
                            hasNextPage
                            perPage
                        }
                        media(search: $search, type: ANIME, genre_not_in:["HENTAI"]) {
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
                            episodes
                            synonyms
                        }
                    }
                }`,
                variables: {
                    search: currentSeriesTitle, // Keep alphanumeric, punctuation, and single/double quotes and spaces
                },
            }),
        })
            .then(response => {
                return response.json();
            })
            .then(async data => {
                console.log({ data });

                if (data.errors) {
                    console.log("Error fetching AniList", data.errors);
                } else {
                    const media = data.data.Page.media;

                    setPageData(data.data.Page);

                    var scores = media
                        .map(
                            (result: {
                                title: { romaji: any; english: any };
                                synonyms: any[];
                            }) => {
                                return Math.max(
                                    similarity(
                                        showingLookupModal.item?.seriesTitle ||
                                            "",
                                        result.title.romaji || ""
                                    ),
                                    similarity(
                                        showingLookupModal.item?.seriesTitle ||
                                            "",
                                        result.title.english || ""
                                    ),
                                    ...result.synonyms.map(synonym =>
                                        similarity(
                                            showingLookupModal.item
                                                ?.seriesTitle || "",
                                            synonym
                                        )
                                    )
                                );
                            }
                        )
                        .filter((score: number) => score > 0.5);

                    console.log("Scores", scores);

                    if (
                        media.length > 0 &&
                        (scores.length > 0 ||
                            currentSeriesTitle.split(" ").length < 2)
                    ) {
                        console.log(page, currentSeriesTitle, media);
                        if (page == 1) {
                            setAnilistResults(media);
                        } else {
                            setAnilistResults([...anilistResults, ...media]);
                        }
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        // Retry with shorter name
                        const words = currentSeriesTitle.split(" ");
                        const newLength =
                            words.length > 4 ? 3 : words.length - 1;

                        if (newLength > 0) {
                            doFetch(words.slice(0, newLength).join(" "));
                        }
                    }
                }
            })
            .catch(error => {
                console.log("Error fetching AniList", error);
                alert("Error fetching AniList" + error);
            });
    }

    useEffect(() => {
        setPageData(null);
        setAnilistResults([]);
        if (showingLookupModal.item) {
            doFetch(showingLookupModal.item.seriesTitle);
        }
    }, [showingLookupModal.item]);

    return (
        <Modal
            size="xl"
            show={showingLookupModal.show}
            onHide={() => setShowingLookupModal({ show: false, item: null })}
        >
            <Modal.Header closeButton>
                <Modal.Title>Perform Lookup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DisplayAnimeCard
                    {...{
                        imageSrc: showingLookupModal.item?.coverImageUrl || "",
                        title: showingLookupModal.item?.seriesTitle || "",
                        topLeftComponent: (
                            <div>
                                <a
                                    href={
                                        showingLookupModal.item
                                            ?.gogoSeriesPageUrl
                                    }
                                    target="_blank"
                                >
                                    <img
                                        src="https://cdn.gogocdn.net/files/gogo/img/favicon.ico"
                                        alt="GogoAnime Icon"
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                        }}
                                        draggable="false"
                                    />
                                </a>
                            </div>
                        ),
                        topRightComponent: (
                            <div
                                style={{
                                    padding: "3px",
                                    paddingBottom: "0",
                                    fontSize: "18px",
                                }}
                            >
                                {showingLookupModal.item?.episodes.length}
                            </div>
                        ),
                    }}
                />

                <div className="input-group mt-3 mb-3">
                    <input
                        className="form-control"
                        type="text"
                        value={search.title}
                        onChange={e => {
                            setSearch({
                                ...search,
                                title: e.target.value,
                            });
                        }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            doFetch(search.title);
                        }}
                    >
                        Search
                    </button>
                </div>
                <h2>Lookup Results</h2>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {anilistResults
                        .sort((a, b) => {
                            return getAnilistResultSimilarity(
                                showingLookupModal.item?.seriesTitle || "",
                                a,
                                b
                            );
                        })
                        .map((result: any) => {
                            return (
                                <DisplayAnimeCard
                                    {...{
                                        imageSrc: result.coverImage.large,
                                        title: result.title.romaji,
                                        // AniList Link
                                        topLeftComponent: (
                                            <div>
                                                <a
                                                    href={result.siteUrl}
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://anilist.co/img/icons/icon.svg"
                                                        alt="Anilist Icon"
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                        }}
                                                        draggable="false"
                                                    />
                                                </a>
                                            </div>
                                        ),

                                        // Episode Count
                                        topRightComponent: (
                                            <div
                                                style={{
                                                    padding: "3px",
                                                    paddingBottom: "0",
                                                    fontSize: "18px",
                                                    backgroundColor:
                                                        result.episodes ==
                                                        showingLookupModal.item
                                                            ?.episodes.length
                                                            ? "green"
                                                            : "red",
                                                }}
                                            >
                                                {result.episodes}
                                            </div>
                                        ),
                                        bottomComponent: (
                                            <button
                                                className="btn btn-primary"
                                                style={{
                                                    width: "100%",
                                                }}
                                                onClick={() => {
                                                    console.log(
                                                        "Selected Match"
                                                    );

                                                    const serverCalls =
                                                        new ServerCalls();
                                                    serverCalls
                                                        .updateAnilistID(
                                                            showingLookupModal
                                                                .item
                                                                ?.gogoSeriesPageUrl ||
                                                                "",
                                                            result.id
                                                        )
                                                        .then(response => {
                                                            return response.json();
                                                        })
                                                        .then(data => {
                                                            setShowingLookupModal(
                                                                {
                                                                    show: false,
                                                                    item: null,
                                                                }
                                                            );

                                                            reloadData();
                                                        })
                                                        .catch(error => {
                                                            alert(
                                                                "Error updating Anilist ID"
                                                            );
                                                        });
                                                }}
                                            >
                                                Select Match{" "}
                                                {(
                                                    Math.max(
                                                        similarity(
                                                            showingLookupModal
                                                                .item
                                                                ?.seriesTitle ||
                                                                "",
                                                            result.title
                                                                .romaji || ""
                                                        ),
                                                        similarity(
                                                            showingLookupModal
                                                                .item
                                                                ?.seriesTitle ||
                                                                "",
                                                            result.title
                                                                .english || ""
                                                        )
                                                    ) * 100
                                                ).toFixed(0)}
                                                %
                                            </button>
                                        ),
                                    }}
                                />
                            );
                        })}

                    {pageData && pageData.pageInfo.hasNextPage && (
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                doFetch(
                                    search.title,
                                    pageData.pageInfo.currentPage + 1
                                );

                                console.log("Next Page");
                            }}
                        >
                            Next Page
                        </button>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-danger me-auto"
                    onClick={() => {
                        const serverCalls = new ServerCalls();
                        serverCalls
                            .updateAnilistID(
                                showingLookupModal.item?.gogoSeriesPageUrl ||
                                    "",
                                "N/A"
                            )
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                setShowingLookupModal({
                                    show: false,
                                    item: null,
                                });

                                reloadData();
                            })
                            .catch(error => {
                                alert("Error updating Anilist ID");
                            });
                    }}
                >
                    N/A
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowingLookupModal({ show: false, item: null });
                    }}
                >
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    );
}

function AniListMappingHelper() {
    const [animeMissingAnilistID, setAnimeMissingAnilistID] = useState<
        Anime[] | []
    >([]);

    const [showingLookupModal, setShowingLookupModal] = useState({
        show: false,
        item: null as Anime | null,
    });

    function loadData() {
        const serverCalls = new ServerCalls();
        serverCalls
            .getAnimeMissingAnilistID()
            .then(response => {
                return response.json();
            })
            .then(data => {
                setAnimeMissingAnilistID(data);
            });
    }

    useEffect(() => {
        loadData();
    }, []);

    if (!animeMissingAnilistID || animeMissingAnilistID.length === 0) {
        return <h1>No items missing AniList ID</h1>;
    }

    return (
        <div>
            <HandleAniListLookupModal
                showingLookupModal={showingLookupModal}
                setShowingLookupModal={setShowingLookupModal}
                reloadData={loadData}
            />

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {animeMissingAnilistID
                    .filter(it => !it.anilistID && it.episodes.length > 0)
                    .map(anime => {
                        return (
                            <DisplayAnimeCard
                                {...{
                                    imageSrc: anime.coverImageUrl,
                                    title: anime.seriesTitle,
                                    topLeftComponent: <div>L</div>,
                                    topRightComponent: <div>R</div>,
                                    bottomComponent: (
                                        <div>
                                            <button
                                                className="btn btn-primary"
                                                style={{
                                                    width: "100%",
                                                }}
                                                onClick={() => {
                                                    console.log(
                                                        "Perform Lookup"
                                                    );
                                                    setShowingLookupModal({
                                                        show: true,
                                                        item: anime,
                                                    });
                                                }}
                                            >
                                                Perform Lookup
                                            </button>
                                        </div>
                                    ),
                                }}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

/**
 * Takes an image, title, top left badge, top right badge, bottom menu
 */
export interface DisplayAnimeCardProps {
    imageSrc: string;
    imageHeight?: string;
    imageWidth?: string;
    title: string | JSX.Element;
    topLeftComponent?: JSX.Element;
    topRightComponent?: JSX.Element;
    bottomComponent?: JSX.Element;
}
export function DisplayAnimeCard(props: DisplayAnimeCardProps) {
    const {
        imageSrc,
        imageHeight,
        imageWidth,
        title,
        topLeftComponent,
        topRightComponent,
        bottomComponent,
    } = props;

    return (
        <div>
            <div
                style={{
                    position: "relative",
                    display: "inline-block",
                    width: imageWidth || "200px",
                    height: imageHeight || "300px",
                    border: "1px solid black",
                    marginTop: "10px",
                    marginRight: "10px",
                    borderRadius: "5px 5px 0 0",
                }}
            >
                {imageSrc ? (
                    <>
                        <img
                            src={imageSrc}
                            alt={typeof title == "string" ? title : ""}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "5px 5px 0 0",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                borderRadius: "5px",
                                padding: "3px",
                                paddingTop: "0",
                                margin: "5px",
                                textAlign: "center",
                                fontSize: "12px",
                            }}
                        >
                            {title}
                        </div>
                    </>
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "lightgray",
                            borderRadius: "5px",
                            justifyItems: "center",
                            textAlign: "center",
                        }}
                    >
                        {title}
                    </div>
                )}

                {topLeftComponent && (
                    <div
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
                        }}
                    >
                        {topLeftComponent}
                    </div>
                )}

                {topRightComponent && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            borderRadius: "5px",
                            padding: "3px",
                            paddingTop: "0",
                            margin: "5px",
                        }}
                    >
                        {topRightComponent}
                    </div>
                )}
            </div>
            {/* Bottom Commonet under imag */}
            {bottomComponent && (
                <div
                    style={{
                        width: "200px",
                        textAlign: "center",
                        // background: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {bottomComponent}
                </div>
            )}
        </div>
    );
}

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
}

interface DownloadQueue {
    isProcessingItem: boolean;
    items: DownloadQueueItem[];
}

interface AnilistObject {
    [key: string]: AnilistItem;
}

const AnilistItemFormat = {
    TV: "TV",
    TV_SHORT: "TV_SHORT",
    MOVIE: "MOVIE",
    SPECIAL: "SPECIAL",
    OVA: "OVA",
    ONA: "ONA",
    MUSIC: "MUSIC",
    MANGA: "MANGA",
    NOVEL: "NOVEL",
    ONE_SHOT: "ONE_SHOT",
};

const AnilistItemStatus = {
    FINISHED: "FINISHED",
    RELEASING: "RELEASING",
    NOT_YET_RELEASED: "NOT_YET_RELEASED",
    CANCELLED: "CANCELLED",
    HIATUS: "HIATUS",
};

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
    format: string;
    status: string;
    episodes: number;
    seasonYear: number;
    genres: string[];
    tags: { id: number; name: string }[];
    averageScore: number;
    relations: {
        edges: { relationType: string; node: AnilistItem }[];
    };
}

function AnimeDownloadPage() {
    const ViewModes = {
        Normal: "Normal",
        FixIssues: "Fix Issues",
    };
    const [viewMode, setViewMode] = useState(ViewModes.Normal);
    const [downloadQueue, setDownloadQueue] = useState<DownloadQueue>({
        isProcessingItem: false,
        items: [],
    });

    const [anilistObj, setAnilistObj] = useState<AnilistObject | null>(null);

    const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);

    const [serverStatus, setServerStatus] = useState("Down");

    function refreshQueue() {
        // fetch(`http://192.168.1.228:5555/api/animeDownload/downloadQueue`)
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => {
        //         // console.log("Queue refreshed", data);
        //         setDownloadQueue(data);
        //         setServerStatus("Up");
        //         if (!anilistObj) {
        //             getAnilistObj();
        //         }
        //     })
        //     .catch(error => {
        //         setServerStatus("Down");
        //         console.log("Error refreshing queue", error);
        //     });
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
                // refreshQueue();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [isAutoRefreshEnabled]);

    // if (!downloadQueue.items || downloadQueue.items.length === 0) {
    //     return (
    //         <div>
    //             <h1>No items in queue</h1>
    //         </div>
    //     );
    // }

    // const itemsGroupedByStatus = downloadQueue.items.reduce((acc, item) => {
    //     if (!acc[item.downloadStatus]) {
    //         acc[item.downloadStatus] = [];
    //     }

    //     acc[item.downloadStatus].push(item);
    //     return acc;
    // }, {} as { [key: string]: DownloadQueueItem[] });

    return (
        <div
            style={{
                margin: "20px",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#f0f0f0", //: //"yellow",,
                color: "#333",
            }}
        >
            <ActualPage downloadQueue={downloadQueue} />
            {/* Select View Mode */}
            {/* <div
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
                />
            )} */}
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
}) {
    const {
        downloadQueue,
        refreshQueue,
        serverStatus,
        isAutoRefreshEnabled,
        setIsAutoRefreshEnabled,
        itemsGroupedByStatus,
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
                    .sort((statusA, statusB) => {
                        const statusValue: {
                            [key: string]: number;
                        } = {
                            Error: 0,
                            Downloading: 1,
                            "Not Yet Started": 2,
                            Downloaded: 3,
                            Upcoming: 4,
                        };

                        return statusValue[statusA] - statusValue[statusB];
                    })
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
                                            .map(item => {
                                                const pendingEpisodes =
                                                    item.episodes.filter(
                                                        episode =>
                                                            episode.status !==
                                                            "Downloaded"
                                                    );
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
                                                            pendingEpisodes={
                                                                pendingEpisodes
                                                            }
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
}) {
    const {
        downloadQueue,
        refreshQueue,
        serverStatus,
        isAutoRefreshEnabled,
        setIsAutoRefreshEnabled,
        itemsGroupedByStatus,
        anilistObj = {},
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
                        />

                        {/* Vertical Line */}

                        <div
                            style={{
                                borderLeft: "2px solid black",
                                height: "100%",
                                marginRight: "10px",
                                marginLeft: "10px",
                            }}
                        ></div>

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

export default AnimeDownloadPage;
