import { AnimeData } from "@features/contexts/AnimeContext";
import { ServerCalls } from "@pages/AnimeDownloadPage";
import { useEffect } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { removeWords } from "./AnimeGroup";
import { AnimeCard, getLatestWatchedEpisode } from "./OfflineAnimeV2";

export function EpisodeViewPage(props: EpisodeViewPageProps) {
    useEffect(() => {
        const currentHour = new Date().getHours();

        // if (currentHour <= 5) {
        //     alert("It's past midnight, you should get some rest");
        //     document.location.href = "/anime";
        // }

        /**
         * Steps Alerts
         */

        const serverCalls = new ServerCalls();
        const eventSource = new EventSource(serverCalls.getUpdatesUrl({}));

        eventSource.onmessage = event => {
            const eventData = JSON.parse(event.data);
            console.log("Received update:", eventData);

            const MyEvents = {
                StepsUpdated: "StepsUpdated",
                WatchController: "WatchController",
                SeriesSecondsLeft: "SeriesSecondsLeft",
                FileUpdated: "FileUpdated",
            };

            if (eventData.eventName == MyEvents.WatchController) {
                const watchEventData = eventData.eventPayload;
                const command = watchEventData.command;

                if (command.indexOf("open|") == 0) {
                    const url = command.split("|")[1];
                    document.location.href = url;
                }
            } else if (eventData.eventName == MyEvents.FileUpdated) {
                props.refreshData(true);
            }
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const navigate = useNavigate();

    const { animeData, seriesFolderName } = props;

    console.log("EpisodeViewPage", animeData);
    const anime = animeData.find(
        anime => anime.seriesFolderName === seriesFolderName
    );

    if (animeData.length === 0 || !anime) {
        return <h1>Loading...</h1>;
    }

    const seriesInfoLink = `/anime/${anime.seriesFolderName}`;
    const latestWatchedEpisode = getLatestWatchedEpisode(anime);
    function convertToDurationString(seconds: number, showDate = false) {
        if (!seconds) return "";
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const hourStr = hours.toString();
        const minStr = minutes.toString();
        const secStr = Math.floor(remainingSeconds).toString();

        const date = new Date();
        // add seconds
        date.setSeconds(date.getSeconds() + seconds);

        return `${hours > 0 ? hourStr + "h " : ""}${minStr}m ${secStr}s${
            showDate
                ? " (" +
                  date.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                  }) +
                  ")"
                : ""
        }`;
    }

    const timeLeft = latestWatchedEpisode
        ? convertToDurationString(
              Object.keys(anime.videoData || {}).reduce((acc, key) => {
                  if (parseInt(key) > parseInt(latestWatchedEpisode)) {
                      return (
                          acc +
                          anime.videoData[key].duration -
                          (anime.watchProgress[key]?.progress || 0)
                      );
                  }
                  return acc;
              }, 0),
              true
          )
        : convertToDurationString(
              Object.keys(anime.videoData || {}).reduce((acc, key) => {
                  return acc + anime.videoData[key].duration;
              }, 0),
              true
          );
    return (
        <div
            className="container"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
            }}
        >
            {/* Details */}
            <Button variant="info" size="sm" onClick={() => navigate(`/anime`)}>
                Return to Series
            </Button>
            {JSON.stringify(anime.issuesData)}

            <AnimeCard
                anime={anime}
                imageSrc={anime.coverImageUrl}
                title={anime.seriesTitle}
                onImageClickLink={`${seriesInfoLink}${
                    latestWatchedEpisode ? `/${latestWatchedEpisode}` : ""
                }`}
                onTitleClickLink={anime.gogoSeriesPageUrl}
                topLeftComponent={
                    anime.anilistID ? (
                        <span>
                            <a
                                href={`https://anilist.co/anime/${anime.anilistID}`}
                                target="_blank"
                            >
                                <img
                                    loading="lazy"
                                    src={"https://anilist.co/img/logo_al.png"}
                                    alt="?"
                                    style={{
                                        width: "20px",
                                    }}
                                />
                            </a>
                        </span>
                    ) : (
                        <a
                            href={`https://anilist.co/search/anime?search=${removeWords(
                                anime.seriesTitle
                            )}`}
                            target="_blank"
                        >
                            Missing Anilist ID
                        </a>
                    )
                }
                topRightComponent={
                    <div>
                        {latestWatchedEpisode
                            ? `${latestWatchedEpisode} / `
                            : ""}
                        {anime.episodes[anime.episodes.length - 1]} (
                        {anime.anilistData?.seasonYear})
                    </div>
                }
            />
            {anime.watchStatus == "planning" ? (
                <Button
                    variant="success"
                    onClick={() => {
                        console.log(
                            "Remove from planning",
                            anime.seriesFolderName
                        );
                        const serverCalls = new ServerCalls();
                        fetch(
                            serverCalls.removeFromPlanning(
                                anime.seriesFolderName
                            )
                        );
                    }}
                >
                    Remove from planning
                </Button>
            ) : anime.watchStatus == "" ? (
                <Button
                    variant="success"
                    onClick={() => {
                        const serverCalls = new ServerCalls();
                        fetch(
                            serverCalls.addToPlanning(anime.seriesFolderName)
                        );
                    }}
                >
                    Add to planning
                </Button>
            ) : null}

            <Card
                style={{
                    textAlign: "center",
                }}
            >
                <Card.Body>
                    <Card.Text className="d-flex justify-content-center">
                        <div className="p-3 pt-1 pb-1">
                            <div>
                                <strong>Total Time</strong>
                            </div>
                            {convertToDurationString(
                                Object.keys(anime.videoData || {}).reduce(
                                    (acc, key) => {
                                        return (
                                            acc + anime.videoData[key].duration
                                        );
                                    },
                                    0
                                )
                            )}
                        </div>
                        {timeLeft ? (
                            <div className="p-3 pt-1 pb-1">
                                <div>
                                    <strong>Time Left</strong>
                                </div>
                                {timeLeft}
                            </div>
                        ) : (
                            ""
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
            {/*  */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {anime.episodes.map(episodeNumber => {
                    return (
                        <EpisodeCard
                            key={episodeNumber}
                            anime={anime}
                            episodeNumber={episodeNumber}
                        />
                    );
                })}
            </div>
            <RelationDisplayer {...anime} />
            <TimelineDisplayer {...anime} />
        </div>
    );
}

function TimelineDisplayer(anime: AnimeData) {
    const timelineData = anime.timelineData;

    if (!timelineData || Object.keys(timelineData).length === 0) {
        return <div></div>;
    }

    return (
        <div>
            <h1 className="mt-3 p-3 bg-primary text-white text-center w-100">
                Timeline ({Object.keys(timelineData).length})
            </h1>
            <div
                style={{
                    display: "flex",
                    width: "80vw",
                    overflowX: "scroll",
                    marginBottom: "200px",
                    padding: "10px",
                    // center

                    alignItems: "center",
                }}
            >
                {Object.keys(timelineData)
                    .sort((a: string, b: string) => {
                        const startA = timelineData[a].startDate || {
                            year: timelineData[a].seasonYear || 0,
                            month: 0,
                            day: 0,
                        };
                        const startB = timelineData[b].startDate || {
                            year: timelineData[b].seasonYear || 0,
                            month: 0,
                            day: 0,
                        };

                        if (!startA.year || !startB.year) {
                            return 1;
                        }

                        if (startA.year !== startB.year) {
                            return startA.year - startB.year;
                        }

                        if (startA.month !== startB.month) {
                            return startA.month - startB.month;
                        }

                        return startA.day - startB.day;
                    })
                    .map(anilistID => {
                        const item = timelineData[anilistID];

                        const startDate = item.startDate || {
                            year: item.seasonYear || 0,
                            month: 0,
                            day: 0,
                        };

                        const startDateStr = startDate.year
                            ? new Intl.DateTimeFormat("en-US", {
                                  month: "long",
                                  day: "2-digit",
                                  year: "numeric",
                              }).format(
                                  new Date(
                                      startDate.year,
                                      startDate.month,
                                      startDate.day
                                  )
                              )
                            : "Unknown";

                        return (
                            <AnimeCard
                                key={anilistID}
                                imageSrc={item.coverImage.extraLarge}
                                title={item.title.romaji || item.title.english}
                                topLeftComponent={
                                    <span>
                                        <a
                                            href={`https://anilist.co/anime/${item.id}`}
                                            target="_blank"
                                        >
                                            <img
                                                loading="lazy"
                                                src={
                                                    "https://anilist.co/img/logo_al.png"
                                                }
                                                alt="?"
                                                style={{
                                                    width: "20px",
                                                }}
                                            />
                                        </a>
                                    </span>
                                }
                                topRightComponent={
                                    <div>
                                        {item.episodes} ({item.format})
                                    </div>
                                }
                                bottomComponent={
                                    <div
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        {startDateStr}
                                    </div>
                                }
                            />
                        );
                    })}
            </div>
        </div>
    );
}

function RelationDisplayer(anime: AnimeData) {
    const navigate = useNavigate();

    const relationsLength = anime.anilistData?.relations?.edges.length;

    if (!relationsLength) {
        return (
            <h1 className="mt-3 p-3 bg-primary text-white text-center w-100 mb-3">
                Relations ({anime.anilistData?.relations?.edges.length})
            </h1>
        );
    }
    return (
        <>
            <AnimeCard
                anime={anime}
                imageSrc={anime.coverImageUrl}
                title={anime.seriesTitle}
                topLeftComponent={
                    anime.anilistID ? (
                        <span>
                            <a
                                href={`https://anilist.co/anime/${anime.anilistID}`}
                                target="_blank"
                            >
                                <img
                                    loading="lazy"
                                    src={"https://anilist.co/img/logo_al.png"}
                                    alt="?"
                                    style={{
                                        width: "20px",
                                    }}
                                />
                            </a>
                        </span>
                    ) : (
                        <a
                            href={`https://anilist.co/search/anime?search=${removeWords(
                                anime.seriesTitle
                            )}`}
                            target="_blank"
                        >
                            Missing Anilist ID
                        </a>
                    )
                }
                topRightComponent={
                    <div>Me ({anime.anilistData?.seasonYear})</div>
                }
            />
            <h1 className="mt-3 p-3 bg-primary text-white text-center w-100">
                Relations ({anime.anilistData?.relations?.edges.length})
            </h1>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {anime.anilistData?.relations?.edges.map(relation => {
                    const matches = relation.node.matches;
                    // const seriesInfoLink = `/anime/${relation.node.seriesFolderName}`;
                    return (
                        <AnimeCard
                            imageSrc={
                                relation.node.coverImage?.extraLarge ||
                                relation.node.coverImage?.large ||
                                relation.node.coverImage?.medium ||
                                ""
                            }
                            title={
                                relation.node.title?.romaji ||
                                relation.node.title?.english
                            }
                            // onImageClickLink={matches?`${seriesInfoLink}${
                            // latestWatchedEpisode ? `/${latestWatchedEpisode}` : ""
                            // }`}
                            onImageClickFunction={() => {
                                console.log("Matches", matches);
                                if (matches && matches.length > 0) {
                                    if (matches.length > 1) {
                                        matches.forEach(match => {
                                            window.open(
                                                `/anime/${match}`,
                                                "_blank"
                                            );
                                        });
                                    } else {
                                        navigate(`/anime/${matches[0]}`);
                                    }

                                    return;
                                }

                                window.open(
                                    `https://anilist.co/anime/${relation.node.id}`,
                                    "_blank"
                                );
                            }}
                            // onTitleClickLink={seriesInfoLink}
                            topLeftComponent={
                                <span>
                                    <a
                                        href={`https://anilist.co/anime/${relation.node.id}`}
                                        target="_blank"
                                        className={
                                            !matches || matches.length === 0
                                                ? "bg-danger"
                                                : ""
                                        }
                                        style={{
                                            borderRadius: "50%",
                                            padding: "0.25rem",
                                        }}
                                    >
                                        <img
                                            loading="lazy"
                                            src={
                                                "https://anilist.co/img/logo_al.png"
                                            }
                                            alt="?"
                                            style={{
                                                width: "20px",
                                            }}
                                        />
                                    </a>
                                </span>
                            }
                            topRightComponent={
                                <div title={relation.node.status}>
                                    {relation.relationType}
                                    {relation.node.seasonYear
                                        ? `(${relation.node.seasonYear})`
                                        : " (20XX)"}
                                </div>
                            }
                        />
                    );
                })}
            </div>
        </>
    );
}
export interface EpisodeViewPageProps {
    animeData: AnimeData[];
    seriesFolderName: string;
    refreshData: (isLive: boolean) => void;
}

export function getWatchProgressString(
    anime: AnimeData,
    episodeNumber: string
) {
    if (!anime.watchProgress || !anime.watchProgress[episodeNumber]) {
        return "";
    }

    function convertSecondsToDuration(num: number) {
        const seconds = Math.floor(num);

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const hourStr = hours.toString().padStart(2, "0");
        const minStr = minutes.toString().padStart(2, "0");
        const secStr = remainingSeconds.toString().padStart(2, "0");

        return `${hours > 0 ? hourStr + ":" : ""}${minStr}:${secStr}`;
    }

    return `${convertSecondsToDuration(
        anime.watchProgress[episodeNumber].progress
    )} / ${convertSecondsToDuration(
        anime.watchProgress[episodeNumber].duration
    )}`;
}

export interface EpisodeCardProps {
    episodeNumber: string;
    anime: AnimeData;
}
export function EpisodeCard(props: EpisodeCardProps) {
    const navigate = useNavigate();
    const { episodeNumber, anime } = props;

    const progressPercent =
        anime.watchProgress[episodeNumber] &&
        anime.watchProgress[episodeNumber].progress &&
        anime.watchProgress[episodeNumber].duration
            ? (anime.watchProgress[episodeNumber].progress /
                  anime.watchProgress[episodeNumber].duration) *
              100
            : 0;

    return (
        <Card
            className="hover-trigger episode-card"
            onClick={() => {
                navigate(`/anime/${anime.seriesFolderName}/${episodeNumber}`);
            }}
        >
            <Card.Body>
                <a
                    href={`/anime/${anime.seriesFolderName}/${episodeNumber}`}
                    style={{
                        textDecoration: "inherit",
                        color: "inherit",
                    }}
                >
                    <Card.Title>Episode {episodeNumber}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {anime.seriesTitle}
                    </Card.Subtitle>
                </a>

                <div
                    style={
                        progressPercent || anime.watchProgress[episodeNumber]
                            ? {
                                  display: "flex",
                                  alignItems: "center",
                              }
                            : {
                                  opacity: "0",
                                  pointerEvents: "none",
                              }
                    }
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    <ProgressBar
                        now={progressPercent}
                        className="w-100"
                        label={
                            progressPercent > 20
                                ? `${getWatchProgressString(
                                      anime,
                                      episodeNumber
                                  )}`
                                : null
                        }
                        title={`${getWatchProgressString(
                            anime,
                            episodeNumber
                        )} (${progressPercent.toFixed(0)}%)`}
                    />
                    <Button
                        variant="danger"
                        size="sm"
                        className={
                            progressPercent ||
                            anime.watchProgress[episodeNumber]
                                ? "ms-2 hover-content"
                                : "ms-2 d-none"
                        }
                        onClick={e => {
                            const serverCalls = new ServerCalls();
                            serverCalls.updateProgress(
                                anime.seriesFolderName,
                                episodeNumber,
                                0,
                                0
                            );
                            e.stopPropagation();
                            console.log("Delete");
                        }}
                        style={{
                            fontSize: "8px",
                            padding: "0rem 0.25rem",
                        }}
                        title={
                            "Clear watch progress for episode " + episodeNumber
                        }
                    >
                        X
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
