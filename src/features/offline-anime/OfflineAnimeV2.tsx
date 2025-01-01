import {
    AnimeActionType,
    AnimeData,
    useAnimeData,
    useAnimeDispatch,
} from "@features/contexts/TemplateContext";
import { ServerCalls } from "@pages/AnimeDownloadPage";
import { on } from "events";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SeriesViewPage } from "./SeriesViewPage";
import { Badge, Button, ButtonGroup, Card, ProgressBar } from "react-bootstrap";
import { removeWords } from "./AnimeGroup";
import { useNavigate } from "react-router-dom";
import { EpisodeViewPage } from "./EpisodeViewPage";

interface ExpectedParams {
    seriesFolderName: string;
    episodeNumber: string;
}

async function getAnimeData(params: {
    seriesFolderName?: string;
    episodeNumber?: string;
}) {
    const serverCalls = new ServerCalls();

    const response = await serverCalls.getAnimeData(params);

    const data = await response.json();

    return data;
}

export function getLatestWatchedEpisode(anime: AnimeData) {
    const episodeNumbers = Object.keys(anime.watchProgress);

    if (episodeNumbers.length === 0) {
        return null;
    }

    const lastWatchedEpisode = episodeNumbers.reduce(
        (lastWatchedEpisode, currentEpisode) => {
            if (
                anime.watchProgress[currentEpisode].lastUpdated >
                anime.watchProgress[lastWatchedEpisode].lastUpdated
            ) {
                return currentEpisode;
            } else {
                return lastWatchedEpisode;
            }
        },
        episodeNumbers[0]
    );

    return lastWatchedEpisode;
}

function OfflineAnimeV2() {
    const params = useParams();
    const { seriesFolderName, episodeNumber } =
        params as unknown as ExpectedParams;

    const animeData = useAnimeData();
    const dispatch = useAnimeDispatch();

    useEffect(() => {
        getAnimeData(params).then(data => {
            dispatch({ type: AnimeActionType.updateAnime, payload: data });
        });
    }, [params]);

    if (!seriesFolderName) {
        return <SeriesViewPage animeData={animeData} />;
    }

    if (seriesFolderName && !episodeNumber) {
        return (
            <EpisodeViewPage
                animeData={animeData}
                seriesFolderName={seriesFolderName}
            />
        );
    }

    return null;
}

interface AnimeCardProps {
    imageSrc?: string;
    onImageClickLink?: string;
    onImageClickFunction?: (event: any) => void;
    imageHeight?: string;
    imageWidth?: string;
    title: string | JSX.Element;
    onTitleClickLink?: string;
    topLeftComponent?: string | JSX.Element | null;
    topRightComponent?: string | JSX.Element;
    bottomComponent?: string | JSX.Element;
}

export function AnimeCard(props: AnimeCardProps) {
    const {
        imageSrc,
        imageHeight,
        imageWidth,
        onImageClickLink,
        onImageClickFunction,
        title,
        onTitleClickLink,
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
                    borderRadius: bottomComponent ? "5px 5px 0 0" : "5px",
                }}
            >
                {imageSrc ? (
                    <>
                        {/* Link */}
                        <Link to={onImageClickLink || ""}>
                            {/* <a href={onImageClickLink} > */}
                            <img
                                onClick={
                                    onImageClickFunction
                                        ? onImageClickFunction
                                        : undefined
                                }
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
                        </Link>
                        {/* </a> */}
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
                            <Link
                                to={onTitleClickLink || ""}
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >
                                {/* <a
                            <a
                                href={onTitleClickLink}
                                target="_blank"
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >*/}
                                {title}
                            </Link>
                            {/* </a> */}
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

export default OfflineAnimeV2;
