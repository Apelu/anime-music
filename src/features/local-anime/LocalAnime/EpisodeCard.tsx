import { Card, ProgressBar, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AnimeData, EpisodeData } from "@shared/MyLocalServer";

export interface EpisodeCardProps {
    animeData: AnimeData;
    episode: EpisodeData;
}
function EpisodeCard(props: EpisodeCardProps) {
    const navigate = useNavigate();
    const { animeData, episode } = props;

    const progressPercent = (episode.progress / episode.duration) * 100;
    const episodeNumber = episode.episodeNumber;
    const episodeLink = `/local-anime-video/${
        animeData.id
    }/${animeData.title.replaceAll(" ", "-")}/${episode.id}`;

    return (
        <Card
            className="hover-trigger episode-card"
            onClick={() => {
                navigate(episodeLink);
            }}
        >
            <Card.Body>
                <a
                    href={episodeLink}
                    style={{
                        textDecoration: "inherit",
                        color: "inherit",
                    }}
                >
                    <Card.Title className="hover-trigger">
                        <Badge
                            style={{
                                padding: "0.25rem 0.5rem",
                            }}
                            className={
                                episode.resolution == 1080
                                    ? "hover-content"
                                    : ""
                            }
                            bg={episode.resolution < 1080 ? "info" : "primary"}
                        >
                            {episode.resolution}p
                        </Badge>{" "}
                        Episode {episodeNumber}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {animeData.title}
                    </Card.Subtitle>
                </a>

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
                            "TODO"
                            // progressPercent > 20
                            //     ? `${getWatchProgressString(
                            //           anime,
                            //           episodeNumber
                            //       )}`
                            //     : null
                        }
                        title={
                            "TODO"
                            //     `${getWatchProgressString(
                            //     anime,
                            //     episodeNumber
                            // )} (${progressPercent.toFixed(0)}%)`
                        }
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
                            // const serverCalls = new ServerCalls();
                            // serverCalls.updateProgress(
                            //     anime.seriesFolderName,
                            //     episodeNumber,
                            //     0,
                            //     0
                            // );
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
export default EpisodeCard;
