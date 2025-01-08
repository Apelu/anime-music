import { useToastDispatch } from "@features/contexts/TemplateContext";
import { ServerCalls } from "@pages/AnimeDownloadPage";
import { AnimeEpisode } from "@pages/OfflineAnime";
import { useState, useEffect, useRef } from "react";
import { Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import videojs from "video.js";
import { ExpectedParams } from "./OfflineAnimeV2";
import { use } from "video.js/dist/types/tech/middleware";

export interface StepsAlertType {
    showAlert: boolean;
    alertMessage: string;
    alertType: string;

    alertsPaused: boolean;
    endOfAlertPause: string;

    currentStepCount: number;
    stepsGoal: number;
    stepsNeeded: number;

    stepsTakenInPast2Hours: string;
}

function VideoPlayerView(props: { data: any }) {
    const { data } = props;

    var lastUpdate = -1;

    const serverCalls = new ServerCalls();
    const params: ExpectedParams = useParams() as any;

    const [showingMenu, setShowingMenu] = useState(true);
    const [subtitle, setSubtitle] = useState<string | null>(null);
    const [stepsAlertData, setStepsAlertData] = useState<StepsAlertType | null>(
        null
    );
    const toastDispatch = useToastDispatch();

    const videoRef = useRef<HTMLVideoElement>(null);

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
                console.log({ text });
                if (text) {
                    setSubtitle(text);
                }
            });
    }, []);

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

    const showingMenuRef = useRef(showingMenu);
    useEffect(() => {
        showingMenuRef.current = showingMenu;
    }, [showingMenu]);

    useEffect(() => {
        const currentHour = new Date().getHours();

        // if (currentHour <= 5) {
        //     alert("It's past midnight, you should get some rest");
        //     document.location.href = "/anime";
        // }

        /**
         * Steps Alerts
         */

        const eventSource = new EventSource(serverCalls.getUpdatesUrl());

        eventSource.onmessage = event => {
            const eventData = JSON.parse(event.data);
            console.log("Received update:", eventData);

            const MyEvents = {
                StepsUpdated: "StepsUpdated",
                WatchController: "WatchController",
            };

            if (eventData.eventName == MyEvents.StepsUpdated) {
                const stepEventData = eventData.eventPayload;
                setStepsAlertData(stepEventData);
            } else if (eventData.eventName == MyEvents.WatchController) {
                const watchEventData = eventData.eventPayload;
                const command = watchEventData.command;

                if (command == "playpause") {
                    const video = videoRef.current;
                    if (video) {
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                    }
                } else if (command == "skip") {
                    // Skip 85 seconds
                    const video = videoRef.current;
                    if (video) {
                        video.currentTime += 85;
                    }
                } else if (command == "undo-skip") {
                    const video = videoRef.current;
                    if (video) {
                        video.currentTime -= 85;
                    }
                } else if (command == "next") {
                    handleEnded();
                } else if (command == "previous") {
                    handleEnded(false);
                } else if (command == "rewind") {
                    // rewind 15 seoncds
                    const video = videoRef.current;
                    if (video) {
                        video.currentTime -= 15;
                    }
                } else if (command == "menu") {
                    setShowingMenu(!showingMenuRef.current);
                } else if (command == "restart") {
                    const video = videoRef.current;
                    if (video) {
                        video.currentTime = 0;
                    }
                } else if (
                    ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                        command
                    )
                ) {
                    const video = videoRef.current;
                    if (video) {
                        const percentage = parseInt(command) * 10;
                        video.currentTime = video.duration * (percentage / 100);
                    }
                } else if (command == "forward5") {
                    const video = videoRef.current;
                    if (video) {
                        video.currentTime += 5;
                    }
                } else if (command == "rewind5") {
                    const video = videoRef.current;
                    if (video) {
                        video.currentTime -= 5;
                    }
                }
            }
        };

        return () => {
            eventSource.close();
        };
    }, [showingMenuRef]);

    // useEffect(() => {
    //     console.log(showingMenu);
    // }, [showingMenu]);

    if (!data.selectedSeriesData) {
        return <span>Loading...</span>;
    }

    return (
        <div>
            {showingMenu && (
                <VideoUIMenu
                    selected={selected}
                    data={data}
                    stepsAlertData={stepsAlertData}
                />
            )}

            {/* <NewVideo
                params={params}
                serverCalls={serverCalls}
                handleEnded={handleEnded}
                subtitle={subtitle}
            /> */}

            <OldVideo
                videoRef={videoRef}
                params={params}
                serverCalls={serverCalls}
                setStepsAlertData={setStepsAlertData}
                showingMenu={showingMenu}
                setShowingMenu={setShowingMenu}
                handleEnded={handleEnded}
                lastUpdate={lastUpdate}
            />
        </div>
    );
}

function NewVideo({
    params,
    serverCalls,
    handleEnded,
    subtitle,
}: {
    params: ExpectedParams;
    serverCalls: ServerCalls;
    handleEnded: () => void;
    subtitle: string | null;
}) {
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
            subtitles: subtitle
                ? {
                      default: "English",
                      en: [
                          {
                              src: `/subtitles/${params.seriesFolderName}/${params.seriesFolderName} Episode ${params.episodeNumber}.vtt`,
                              srclang: "en",
                              label: "English",
                          },
                      ],
                  }
                : undefined,
            tracks: subtitle
                ? [
                      {
                          kind: "subtitles",
                          src: `/subtitles/${params.seriesFolderName}/${params.seriesFolderName} Episode ${params.episodeNumber}.vtt`,
                          srclang: "en",
                          label: "English",
                          default: true,
                      },
                  ]
                : undefined,
        });

        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, []);

    return (
        <div
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
        ></div>
    );
}

function OldVideo({
    videoRef,
    params,
    serverCalls,
    setStepsAlertData,
    showingMenu,
    setShowingMenu,
    handleEnded,
    lastUpdate,
}: {
    videoRef: React.RefObject<HTMLVideoElement>;
    params: ExpectedParams;
    serverCalls: ServerCalls;
    setStepsAlertData: React.Dispatch<
        React.SetStateAction<StepsAlertType | null>
    >;
    showingMenu: boolean;
    setShowingMenu: React.Dispatch<React.SetStateAction<boolean>>;
    handleEnded: (goToNextEpisode?: boolean) => void;
    lastUpdate: number;
}) {
    return (
        <video
            id="video"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                zIndex: 1300,
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
            onTimeUpdate={async () => {
                const video = videoRef.current;
                if (!video) return;

                const currentTime = parseInt(video.currentTime.toString());

                const decimal = video.currentTime - currentTime;

                if (decimal > 0.25) {
                    return; // Skip if not close to whole number (so that it only runs once per second)
                }

                if (lastUpdate == currentTime) return;

                lastUpdate = currentTime;

                if (currentTime % 15 === 0) {
                    try {
                        console.log("Updating progress for ", currentTime);

                        const response = await serverCalls.updateProgress(
                            params.seriesFolderName,
                            params.episodeNumber,
                            video.currentTime,
                            video.duration
                        );

                        const data: StepsAlertType = await response.json();
                        setStepsAlertData(data);
                        if (data.showAlert) {
                            video.pause();
                            try {
                                const result = window.confirm(
                                    data.alertMessage
                                );
                                if (result) {
                                    video.play();
                                    try {
                                        fetch(serverCalls.confirmAlertUrl());
                                        // .catch(e => {
                                        //     // console.error(e);
                                        // });
                                    } catch (e) {
                                        // console.error(e);
                                    }
                                }
                            } catch (e) {
                                video.play();
                            }
                        } else if (data.alertType == "Success") {
                            // toastDispatch(
                            //     addToastDispatchParam({
                            //         id: Date.now() + "",
                            //         title:
                            //             "Step Count: " +
                            //             data.currentStepCount,
                            //         body: data.alertMessage + "",
                            //         hideAfterTimestamp: Date.now() + 3000,
                            //     })
                            // );
                        }
                        // console.log(data);

                        // .catch(e => {
                        //     // console.error(e);
                        // });
                    } catch (e) {
                        // console.error(e);
                    }
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
            {/* {subtitle && (
                <track
                    src={`/subtitles/${params.seriesFolderName}/${params.seriesFolderName} Episode ${params.episodeNumber}.vtt`}
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                    default
                />
            )} */}
        </video>
    );
}

function VideoUIMenu({
    selected,
    data,
    stepsAlertData,
}: {
    selected: AnimeEpisode;
    data: any;
    stepsAlertData: StepsAlertType | null;
}) {
    const [time, setTime] = useState(getCurrentTime());
    useEffect(() => {
        // refreshTime every second

        const interval = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function getCurrentTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px",
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 999999999999999999,
            }}
        >
            {/* New UI:
            Title                               | 1234 / 5500 (remaining: 4266 or 77.56%)
            Episode Number / Total Episodes     | 290 (4pm: 140, 5pm: 150)
                                            

             */}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <h1>{selected.seriesTitle}</h1>

                <h3>
                    {selected.episodeNumber} / {data.selectedSeriesData.length}
                </h3>

                <h4>
                    <small>{time}</small>
                </h4>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {stepsAlertData && (
                    <span
                        style={{
                            fontSize: "20px",
                        }}
                    >
                        <Badge>
                            {stepsAlertData?.currentStepCount} /{" "}
                            {stepsAlertData?.stepsGoal}
                        </Badge>

                        <Badge className="ms-2">
                            {stepsAlertData?.stepsNeeded >= 0
                                ? `remaining: ${stepsAlertData?.stepsNeeded}`
                                : `${(
                                      (stepsAlertData?.currentStepCount /
                                          stepsAlertData?.stepsGoal) *
                                      100
                                  ).toFixed(0)}%`}
                        </Badge>

                        <Badge className="ms-2">
                            {stepsAlertData?.stepsTakenInPast2Hours
                                .replace("(1:", "(1am:")
                                .replace("(2:", "(2am:")
                                .replace("(3:", "(3am:")
                                .replace("(4:", "(4am:")
                                .replace("(5:", "(5am:")
                                .replace("(6:", "(6am:")
                                .replace("(7:", "(7am:")
                                .replace("(8:", "(8am:")
                                .replace("(9:", "(9am:")
                                .replace("(10:", "(10am:")
                                .replace("(11:", "(11am:")
                                .replace("(12:", "(12pm:")
                                .replace("(13:", "(1pm:")
                                .replace("(14:", "(2pm:")
                                .replace("(15:", "(3pm:")
                                .replace("(16:", "(4pm:")
                                .replace("(17:", "(5pm:")
                                .replace("(18:", "(6pm:")
                                .replace("(19:", "(7pm:")
                                .replace("(20:", "(8pm:")
                                .replace("(21:", "(9pm:")
                                .replace("(22:", "(10pm:")
                                .replace("(23:", "(11pm:")
                                .replace("(24:", "(12am:")
                                .replace(", 1:", ", 1am:")
                                .replace(", 2:", ", 2am:")
                                .replace(", 3:", ", 3am:")
                                .replace(", 4:", ", 4am:")
                                .replace(", 5:", ", 5am:")
                                .replace(", 6:", ", 6am:")
                                .replace(", 7:", ", 7am:")
                                .replace(", 8:", ", 8am:")
                                .replace(", 9:", ", 9am:")
                                .replace(", 10:", ", 10am:")
                                .replace(", 11:", ", 11am:")
                                .replace(", 12:", ", 12pm:")
                                .replace(", 13:", ", 1pm:")
                                .replace(", 14:", ", 2pm:")
                                .replace(", 15:", ", 3pm:")
                                .replace(", 16:", ", 4pm:")
                                .replace(", 17:", ", 5pm:")
                                .replace(", 18:", ", 6pm:")
                                .replace(", 19:", ", 7pm:")
                                .replace(", 20:", ", 8pm:")
                                .replace(", 21:", ", 9pm:")
                                .replace(", 22:", ", 10pm:")
                                .replace(", 23:", ", 11pm:")
                                .replace(", 24:", ", 12am:")
                                .replace(", ", " + ")}
                        </Badge>
                        <Badge>{stepsAlertData?.alertMessage}</Badge>
                    </span>
                )}
            </div>
        </div>
    );
}

export default VideoPlayerView;
