import { AnimeData } from "@features/contexts/TemplateContext";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { removeWords } from "./AnimeGroup";
import { getLatestWatchedEpisode, AnimeCard } from "./OfflineAnimeV2";
import { ServerCalls } from "@pages/AnimeDownloadPage";
import ts from "typescript";

export function EpisodeViewPage(props: EpisodeViewPageProps) {
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
            <AnimeCard
                imageSrc={anime.coverImageUrl}
                title={anime.seriesTitle}
                onImageClickLink={`${seriesInfoLink}${
                    latestWatchedEpisode ? `/${latestWatchedEpisode}` : ""
                }`}
                onTitleClickLink={seriesInfoLink}
                topLeftComponent={
                    anime.anilistID ? (
                        <span>
                            <a
                                href={`https://anilist.co/anime/${anime.anilistID}`}
                                target="_blank"
                            >
                                <img
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
                <Card.Title>Episode {episodeNumber}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {anime.seriesTitle}
                </Card.Subtitle>

                <div
                    style={
                        progressPercent
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
                            progressPercent
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
