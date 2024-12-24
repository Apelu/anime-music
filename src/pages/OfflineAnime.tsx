import { useEffect, useRef, useState } from "react";
import { ServerCalls } from "./AnimeDownloadPage";
import { useParams, useSearchParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { Card, ProgressBar } from "react-bootstrap";
import { parse } from "path";

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
                    borderRadius: "5px 5px 0 0",
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
                                    borderRadius: "5px 5px 0 0",
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
    });

    // Path /anime/:seriesFolderName/:episodeNumber
    useEffect(() => {
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
                    });
                });

            // });
            return;
        }
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
            return <SeriesView data={data} />;
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

    useEffect(() => {
        setTimeout(() => {
            setShowingMenu(false);
        }, 1500);
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
                const savedProgress = selected.progress;

                if (savedProgress) {
                    video.currentTime = savedProgress;
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

    return (
        <div>
            {showingMenu && uiMenu}
            <video
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
                        serverCalls.updateProgress(
                            params.seriesFolderName,
                            params.episodeNumber,
                            video.currentTime,
                            video.duration
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
            ></video>
        </div>
    );
}

function SeriesView(props: { data: any }) {
    const { data } = props;

    const continueWatching = data.seriesData.filter(
        (anime: Anime) =>
            anime.episodes.filter((episode: AnimeEpisode) => episode.progress)
                .length > 0
    );
    return (
        <div>
            {continueWatching.length > 0 && (
                <div>
                    <h1>Continue Watching</h1>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {continueWatching.map((anime: Anime) => (
                            <AnimeCard key={anime.anilistID} anime={anime} />
                        ))}
                    </div>
                </div>
            )}

            <span>OfflineAnime ({data.seriesData.length})</span>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {data.seriesData.map((anime: Anime) => (
                    <AnimeCard key={anime.anilistID} anime={anime} />
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
                    <img
                        src={
                            data.selectedSeriesData[0].coverImageUrl ||
                            "https://via.placeholder.com/150"
                        }
                        alt=""
                        style={{ width: "150px" }}
                    />

                    <h1
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <span>{data.selectedSeriesData[0].seriesTitle}</span>
                    </h1>
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

                        {episode.progress && (
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
                                            episode.progress
                                        )} / ${convertSecondsToHMS(
                                            episode.duration
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

function VideoView(props: { data: any }) {
    const { data } = props;

    return (
        <div>
            <span>VideoView</span>
            {JSON.stringify(data)}
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
            bottomComponent={
                <div></div>
                // <button
                //     className="btn btn-primary"
                //     onClick={() => {
                //         props.setVideoPlayerState({
                //             anime: props.anime,
                //             isPlaying: true,
                //         });
                //     }}
                // >
                //     Play
                // </button>
            }
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

/*
Anime

AnimeEpisode
*/

/*

Top - Level (Show all series)

Next Level (Show all episodes of a series)

*/

export default OfflineAnime;
