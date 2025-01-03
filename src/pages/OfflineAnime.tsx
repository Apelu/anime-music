import { useEffect, useRef, useState } from "react";
import { ServerCalls } from "./AnimeDownloadPage";
import { useParams, useSearchParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { Card, ProgressBar } from "react-bootstrap";
import { parse } from "path";
import { Player } from "video-react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hotkeys";
import TextTrackSettingsFont from "./../../node_modules/video.js/dist/types/tracks/text-track-settings-font.d";

interface DisplayAnimeCardProps {
    imageSrc: string;
    imageHeight?: string;
    imageWidth?: string;
    title: string | JSX.Element;
    topLeftComponent?: JSX.Element;
    topRightComponent?: JSX.Element;
    bottomComponent?: JSX.Element;
    anime: Anime;
}

function DisplayAnimeCard(props: DisplayAnimeCardProps) {
    const {
        imageSrc,
        imageHeight,
        imageWidth,
        title,
        topLeftComponent,
        topRightComponent,
        bottomComponent,
        anime,
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
                    borderRadius: bottomComponent ? "5px 5px 0 0" : "5px",
                }}
            >
                {imageSrc ? (
                    <>
                        <a
                            href={
                                document.location.href +
                                "/" +
                                encodeURIComponent(anime.seriesFolderName)
                            }
                            target="_blank"
                        >
                            <img
                                src={imageSrc}
                                alt={typeof title == "string" ? title : ""}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: bottomComponent
                                        ? "5px 5px 0 0"
                                        : "5px",
                                }}
                            />
                        </a>
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

interface VideoPlayerState {
    anime: Anime | null;
    isPlaying: boolean;
}

function OfflineAnime(props: any) {
    const params = useParams();
    const serverCalls = new ServerCalls();

    const [data, setData] = useState<any>({
        view: null, // null | "series" | "episodes" | "video"
        seriesData: [],
        selectedSeriesData: null, // null | Anime
        progress: {},
    });

    // Path /anime/:seriesFolderName/:episodeNumber
    async function dataPulls() {
        const response = await serverCalls.getProgress();

        const progressData = await response.json();

        if (!params || !params.seriesFolderName) {
            serverCalls
                .getSeries()
                .then(response => {
                    return response.json();
                })
                .then(animeList => {
                    setData({
                        ...data,
                        view: "series",
                        seriesData: Object.values(animeList),
                        progress: progressData,
                    });
                });
            return;
        }

        if (params.seriesFolderName && !params.episodeNumber) {
            serverCalls
                .getEpisodes(params.seriesFolderName)
                .then(response => {
                    return response.json();
                })
                .then(episodeInfo => {
                    console.log({ episodeInfo });
                    setData({
                        ...data,
                        view: "episodes",
                        selectedSeriesData: Object.values(episodeInfo),
                        progress: progressData,
                    });
                });
            return;
        }

        if (params.seriesFolderName && params.episodeNumber) {
            serverCalls
                .getEpisodes(params.seriesFolderName)
                .then(response => {
                    return response.json();
                })
                .then(episodeInfo => {
                    console.log({ episodeInfo });
                    setData({
                        ...data,
                        view: "video",
                        selectedSeriesData: Object.values(episodeInfo),
                        progress: progressData,
                    });
                });

            // });
            return;
        }
    }
    useEffect(() => {
        dataPulls();
    }, []); //[params.seriesFolderName, params.episodeNumber]);

    const videoRef = useRef<HTMLVideoElement>(null);

    function handleEnded(goToNextEpisode = true) {
        // replace episodeNumber param with next episode number
        const selectedSeriesData = data.selectedSeriesData;
        const episodeIndex = selectedSeriesData.findIndex(
            (episode: AnimeEpisode) =>
                episode.episodeNumber === params.episodeNumber
        );
        const nextEpisodeIndex = episodeIndex + (goToNextEpisode ? 1 : -1);
        const nextEpisodeNumber =
            selectedSeriesData[nextEpisodeIndex]?.episodeNumber;

        if (nextEpisodeNumber) {
            window.location.href = `/anime/${
                params.seriesFolderName
            }/${encodeURIComponent(nextEpisodeNumber)}`;
        } else {
            alert(`No ${goToNextEpisode ? "next" : "previous"} episode found`);
        }
    }

    switch (data.view) {
        case "series":
            return <SeriesView data={data} setData={setData} />;
        case "episodes":
            return <EpisodesView data={data} />;
        case "video":
            if (!params.seriesFolderName || !params.episodeNumber) {
                return <span>Invalid URL</span>;
            }

            return (
                <VideoPlayerView
                    data={data}
                    videoRef={videoRef}
                    handleEnded={handleEnded}
                    params={params}
                    serverCalls={serverCalls}
                />
            );

        default:
            return <span>Loading... {JSON.stringify(data)}</span>;
    }
}

function VideoPlayerView(props: {
    data: any;
    videoRef: any;
    handleEnded: any;
    params: any;
    serverCalls: ServerCalls;
}) {
    const [showingMenu, setShowingMenu] = useState(true);
    var lastUpdate = 0;
    const { data, videoRef, handleEnded, params, serverCalls } = props;
    const [subtitle, setSubtitle] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setShowingMenu(false);
        }, 1500);

        fetch(
            serverCalls.getSubtitleUrl(
                params.seriesFolderName,
                params.episodeNumber
            )
        )
            .then(response => {
                return response.text();
            })
            .then(text => {
                setSubtitle(text);
            });
    }, []);
    console.log({ data });

    const selected = data.selectedSeriesData.find(
        (episode: AnimeEpisode) =>
            episode.episodeNumber === params.episodeNumber
    );

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.onloadedmetadata = () => {
                const savedProgress = data.progress[selected.seriesFolderName]
                    ? data.progress[selected.seriesFolderName][
                          selected.episodeNumber
                      ]
                    : null;

                if (savedProgress) {
                    video.currentTime = savedProgress.progress;
                } else {
                    video.currentTime = 0;
                }
            };
        }
    }, [videoRef]);

    const uiMenu = (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                zIndex: 999999999,
            }}
        >
            {/* Series Title and Episode Number */}

            <span
                style={{
                    color: "white",
                    fontSize: "20px",
                }}
            >
                <h1>{selected.seriesTitle}</h1>
                <h3>
                    {selected.episodeNumber} / {data.selectedSeriesData.length}
                </h3>
            </span>
        </div>
    );

    const oldVideo = (
        <video
            id="video"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                zIndex: 99999999,
            }}
            ref={videoRef}
            src={serverCalls.getVideoUrl(
                params.seriesFolderName,
                params.episodeNumber
            )}
            controls
            autoPlay
            onPlay={() => {
                videoRef.current?.focus();
            }}
            onEnded={() => {
                handleEnded();
            }}
            onTimeUpdate={() => {
                const video = videoRef.current;
                if (!video) return;

                const currentTime = parseInt(video.currentTime);

                if (currentTime % 15 === 0) {
                    if (lastUpdate === currentTime) return;
                    lastUpdate = currentTime;
                    serverCalls
                        .updateProgress(
                            params.seriesFolderName,
                            params.episodeNumber,
                            video.currentTime,
                            video.duration
                        )
                        .then(response => response.json())
                        .then(
                            (data: {
                                success: boolean;
                                needsMoreSteps: {
                                    needMoreSteps: boolean;
                                    message: string;
                                    messageType: string;
                                };
                            }) => {
                                if (data.needsMoreSteps.needMoreSteps) {
                                    video.pause();
                                    alert(data.needsMoreSteps.message);
                                }

                                console.log(data.needsMoreSteps);
                            }
                        );
                }
            }}
            onKeyDownCapture={e => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    e.preventDefault();
                }
            }}
            onKeyDown={e => {
                if (e.key === "ArrowLeft") {
                    videoRef.current!.currentTime -= 5;
                }

                if (e.key === "ArrowRight") {
                    videoRef.current!.currentTime += 5;
                }
            }}
            // muted
            onKeyUp={e => {
                console.log(e.key);
                if (e.key === "Escape") {
                    document.location.href = `/anime/${params.seriesFolderName}`;
                }

                if (e.key === "u") {
                    setShowingMenu(!showingMenu);
                }

                if (e.key == "MediaPlayPause") {
                    // Skip 85 seconds
                    videoRef.current!.currentTime += 85;
                }

                // Is digit key
                if (
                    e.key == "0" ||
                    e.key == "1" ||
                    e.key == "2" ||
                    e.key == "3" ||
                    e.key == "4" ||
                    e.key == "5" ||
                    e.key == "6" ||
                    e.key == "7" ||
                    e.key == "8" ||
                    e.key == "9"
                ) {
                    // Skip to that percentage
                    const percentage = parseInt(e.key) * 10;
                    videoRef.current!.currentTime =
                        videoRef.current!.duration * (percentage / 100);
                }

                if (e.key.toLowerCase() == "f") {
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else {
                        videoRef.current?.requestFullscreen();
                    }
                }

                if (e.key === "MediaTrackPrevious") {
                    handleEnded(false);
                }

                if (e.key === "Delete" || e.key === "MediaTrackNext") {
                    handleEnded();
                }
            }}
        >
            {subtitle && (
                <track
                    src={`/subtitles/${params.seriesFolderName}/${params.seriesFolderName} Episode ${params.episodeNumber}.vtt`}
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                    default
                />
            )}
        </video>
    );

    useEffect(() => {
        const videoElement = document.createElement(
            "video-js"
        ) as HTMLVideoElement;
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";

        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.src = serverCalls.getVideoUrl(
            params.seriesFolderName,
            params.episodeNumber
        );
        videoElement.onplay = () => {
            videoElement.focus();
        };

        videoElement.onended = () => {
            handleEnded();
        };

        const videoContainer = document.getElementById("video-container");
        if (videoContainer) {
            videoContainer.appendChild(videoElement);
        }

        const player = videojs(videoElement, {
            autoplay: true,
            controls: true,
            subtitles: {
                default: "English",
                en: [
                    {
                        src: `/subtitles/${params.seriesFolderName}/${params.seriesFolderName} Episode ${params.episodeNumber}.vtt`,
                        srclang: "en",
                        label: "English",
                    },
                ],
            },
            tracks: [
                {
                    kind: "subtitles",
                    src: `/subtitles/${params.seriesFolderName}/${params.seriesFolderName} Episode ${params.episodeNumber}.vtt`,
                    srclang: "en",
                    label: "English",
                    default: true,
                },
            ],
        });

        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, []);

    return (
        <div>
            {showingMenu && uiMenu}
            {/* <div
                id="video-container"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "black",
                    zIndex: 99999999,
                }}
            ></div> */}
            {oldVideo}
        </div>
    );
}

function getLatestEpisodeProgress(
    progress: {
        [seriesFolderName: string]: {
            [episodeNumber: string]: {
                progress: number;
                duration: number;
                lastUpdated: number;
            };
        };
    },
    seriesFolderName: string
) {
    const progressData = progress[seriesFolderName];

    if (!progressData) return null;

    var latest: {
        progress: number;
        duration: number;
        lastUpdated: number;
    } | null = null;

    for (const episodeNumber in progressData) {
        if (latest === null) {
            latest = progressData[episodeNumber];
            continue;
        }

        if (progressData[episodeNumber].lastUpdated > latest.lastUpdated) {
            latest = progressData[episodeNumber];
        }
    }

    return latest;

    // return latestProgress;
}

function SeriesView(props: { data: any; setData: any }) {
    const { data, setData } = props;
    const [searchText, setSearchText] = useState("");

    console.log({ data });
    const continueWatching = data.seriesData
        .filter((anime: Anime) =>
            getLatestEpisodeProgress(data.progress, anime.seriesFolderName)
        )
        .sort((a: Anime, b: Anime) => {
            const aProgress = getLatestEpisodeProgress(
                data.progress,
                a.seriesFolderName
            );

            const bProgress = getLatestEpisodeProgress(
                data.progress,
                b.seriesFolderName
            );

            if (!aProgress || !bProgress) return 0;

            return aProgress.lastUpdated < bProgress.lastUpdated ? 1 : -1;
        });

    return (
        <div>
            {continueWatching.length > 0 && (
                <div>
                    <h1 className="mt-3 p-3 bg-primary text-white text-center">
                        Continue Watching
                    </h1>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {continueWatching.map((anime: Anime) => (
                            <>
                                <AnimeCard
                                    key={anime.seriesFolderName}
                                    anime={anime}
                                />
                            </>
                        ))}
                    </div>
                </div>
            )}

            <h1 className="mt-3 p-3 bg-primary text-white text-center">
                OfflineAnime (
                {
                    data.seriesData.filter(
                        (anime: Anime) =>
                            !searchText ||
                            anime.seriesTitle
                                .toLowerCase()
                                .includes(searchText.toLowerCase()) ||
                            anime.seriesFolderName
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                    ).length
                }
                )
                <button
                    className="btn btn-info btn-sm ms-3"
                    onClick={() => {
                        data.seriesData.sort(() => Math.random() - 0.5);
                        setData({ ...data });
                    }}
                >
                    Randomize
                </button>
                <input
                    type="text"
                    className="form-control mt-3 text-center"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search Anime"
                />
            </h1>

            {/* Search Bar */}

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {data.seriesData
                    .filter(
                        (anime: Anime) =>
                            !searchText ||
                            anime.seriesTitle
                                .toLowerCase()
                                .includes(searchText.toLowerCase()) ||
                            anime.seriesFolderName
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                    )
                    .map((anime: Anime) => (
                        <AnimeCard key={anime.seriesFolderName} anime={anime} />
                    ))}
            </div>
        </div>
    );
}

function convertSecondsToHMS(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);

    // Only double digit only show if > 0

    const hoursString = hours > 0 ? hours + ":" : "";
    const minutesString = minutes > 0 ? minutes + ":" : "00";
    const secString = sec > 0 ? sec + "" : "00";

    return hoursString + minutesString + secString;
}

function EpisodesView(props: { data: any }) {
    const { data } = props;

    const params = useParams();
    const serverCalls = new ServerCalls();

    return (
        <div style={{ textAlign: "center" }}>
            <div>
                <button
                    className="btn btn-info btn-sm mt-3 mb-3"
                    onClick={() => {
                        document.location.href = "/anime";
                    }}
                >
                    Return to Series
                </button>
            </div>

            {data.selectedSeriesData && data.selectedSeriesData.length > 0 && (
                <div>
                    {/* <img
                        src={
                            data.selectedSeriesData[0].coverImageUrl ||
                            "https://via.placeholder.com/150"
                        }
                        alt=""
                        style={{ width: "150px" }}
                    /> */}

                    <AnimeCard anime={data.selectedSeriesData[0]} />

                    {/* <h1
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <span>{data.selectedSeriesData[0].seriesTitle}</span>
                    </h1> */}
                </div>
            )}

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {data.selectedSeriesData.map((episode: AnimeEpisode) => (
                    <Card
                        style={{
                            width: "200px",
                            margin: "10px",
                            borderRadius: "5px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            overflow: "hidden",
                        }}
                    >
                        <a
                            href={
                                document.location.href +
                                "/" +
                                encodeURIComponent(episode.episodeNumber)
                            }
                            style={{
                                textDecoration: "inherit",
                                color: "inherit",
                            }}
                        >
                            <Card.Body>
                                {/* Progress Bar */}

                                <Card.Title>
                                    {episode.episodeVideoName.replace(
                                        ".mp4",
                                        ""
                                    )}
                                </Card.Title>
                            </Card.Body>
                        </a>

                        {data.progress[episode.seriesFolderName] &&
                            data.progress[episode.seriesFolderName][
                                episode.episodeNumber
                            ] && (
                                <Card.Footer>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <ProgressBar
                                            style={{ flex: 1 }}
                                            now={100}
                                            label={`${convertSecondsToHMS(
                                                data.progress[
                                                    episode.seriesFolderName
                                                ][episode.episodeNumber]
                                                    .progress
                                            )} / ${convertSecondsToHMS(
                                                data.progress[
                                                    episode.seriesFolderName
                                                ][episode.episodeNumber]
                                                    .duration
                                            )}`}
                                        />

                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{
                                                padding: "0px 5px",
                                                margin: "0",
                                            }}
                                            onClick={event => {
                                                serverCalls.updateProgress(
                                                    params.seriesFolderName!,
                                                    episode.episodeNumber,
                                                    0,
                                                    0
                                                );

                                                // prevent bubble

                                                event?.stopPropagation();
                                            }}
                                        >
                                            X
                                        </button>
                                    </div>
                                </Card.Footer>
                            )}
                    </Card>
                    // <div key={episode.episodeVideoName}>
                    //     <a
                    //         href={
                    //             document.location.href +
                    //             "/" +
                    //             encodeURIComponent(episode.episodeNumber)
                    //         }
                    //     >
                    //         <button className="btn btn-primary">
                    //             Play {episode.episodeVideoName}
                    //         </button>
                    //     </a>
                    // </div>
                ))}
            </div>
        </div>
    );
}

function AnimeCard(props: { anime: Anime }) {
    return (
        <DisplayAnimeCard
            anime={props.anime}
            imageSrc={props.anime.coverImageUrl}
            title={props.anime.seriesTitle}
            topLeftComponent={
                <span>
                    {/* Anilist image link */}
                    <a
                        href={
                            props.anime.anilistID
                                ? `https://anilist.co/anime/${props.anime.anilistID}`
                                : "https://anilist.co/search/anime"
                        }
                        target="_blank"
                    >
                        <img
                            src={
                                props.anime.anilistID
                                    ? "https://anilist.co/img/logo_al.png"
                                    : // Search icon
                                      ""
                            }
                            alt="?"
                            style={{ width: "20px" }}
                        />
                    </a>
                </span>
            }
            topRightComponent={<span>{props.anime.expectedEpisodeCount}</span>}
        />
    );
}

function VideoPlayer(props: { videoPlayerState: VideoPlayerState }) {
    // Play local video "D:\AnimeVault\2 x 2 Shinobuden\2 x 2 Shinobuden Episode 1.mp4"
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                zIndex: 999999999999999999,
            }}
        ></div>
    );
}

export interface Anime {
    seriesTitle: string;
    seriesFolderName: string;
    downloadStatus: string;
    gogoSeriesPageUrl: string;
    anilistID: number;
    coverImageUrl: string;
    startingPageUrl: string;
    expectedEpisodeCount: number;
    episodes: AnimeEpisode[];
    priority: string;
}

export interface AnimeEpisode {
    watchPageUrl: string;
    episodeNumber: string;
    status: string;
    fileSize: number;
    expectedFileSize: string;
    episodeDownloadPageUrl: string;
    episodeVideoName: string;

    coverImageUrl: string;
    seriesTitle: string;
    seriesFolderName: string;
    anilistID: number;
    startingPageUrl: string;
    expectedEpisodeCount: number;
    priority: string;
    progress: number;
    duration: number;
}

export default OfflineAnime;
