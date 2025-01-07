import {
    AnimeActionType,
    AnimeData,
    useAnimeData,
    useAnimeDispatch,
} from "@features/contexts/AnimeContext";
import { ServerCalls } from "@pages/AnimeDownloadPage";
import { on } from "events";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { SeriesViewPage } from "./SeriesViewPage";
import { Badge, Button, ButtonGroup, Card, ProgressBar } from "react-bootstrap";
import { removeWords } from "./AnimeGroup";
import { useNavigate } from "react-router-dom";
import { EpisodeViewPage } from "./EpisodeViewPage";
import { Anime } from "@pages/OfflineAnime";

interface ExpectedParams {
    seriesFolderName: string;
    episodeNumber: string;
}

async function getAnimeData(params: {
    seriesFolderName?: string;
    episodeNumber?: string;
    includeTimelineData?: boolean;
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

export const StorageKeys = {
    accessToken: "accessToken",
};

export function getHashObj(hash: string) {
    var obj: any = {};
    hash.substring(1)
        .split("&")
        .forEach(function (pair) {
            var keyValue = pair.split("=");
            obj[keyValue[0]] = keyValue[1];
        });
    return obj;
}

export function AniListAPI(
    query = "",
    variables = {},
    accessToken = "",
    handleData = (data: any) => {},
    handleError = (e: any) => {
        console.error(e);
    }
) {
    const API_URL = "https://graphql.anilist.co";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(accessToken && {
                Authorization: "Bearer " + accessToken,
            }),
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
    };

    fetch(API_URL, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response: { json: () => Promise<any>; ok: any }) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
}

async function asyncAnilistAPI(
    query = "",
    variables = {},
    accessToken = "",
    handleData = (data: any) => {},
    handleError = (e: any) => {
        console.error(e);
    }
) {
    return new Promise((resolve, reject) => {
        AniListAPI(
            query,
            variables,
            accessToken,
            function (data) {
                resolve(data);
            },
            function (e) {
                reject(e);
            }
        );
    });
}

export async function hasAnilistAccessTokenExpired() {
    const accessToken = localStorage.getItem(StorageKeys.accessToken);
    if (!accessToken) {
        return true;
    }

    // Anilist Fetch to de

    try {
        const data = await asyncAnilistAPI(
            `
            query {
                Viewer {
                  id
                }
              }
            `,
            {},
            accessToken
        );
        console.log(data);

        if ((data as any).errors) {
            console.error(data);
            return true;
        }

        return false;
    } catch (e) {}

    return true;
}
export function AniListRedirectPage() {
    const { hash } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isOnline = window.navigator.onLine;

        // if (isOnline) {
        //     const accessToken = getHashObj(hash).access_token;

        //     if (accessToken) {
        //         localStorage.setItem(StorageKeys.accessToken, accessToken);
        //         navigate("/anime");
        //     } else if (!localStorage.getItem(StorageKeys.accessToken)) {
        //         // Redirect to AniList
        //         const result = window.confirm(
        //             "You are not logged in to AniList. Do you want to login now? [" +
        //                 localStorage.getItem(StorageKeys.accessToken)
        //         );
        //         if (!result) {
        //             return;
        //         }
        //         window.location.href = `https://anilist.co/api/v2/oauth/authorize?client_id=15485&response_type=token`;
        //         return;
        //     }
        // }
    }, []);

    return <h1>Storing Access Token</h1>;
}

function OfflineAnimeV2() {
    const params = useParams();
    const { seriesFolderName, episodeNumber } =
        params as unknown as ExpectedParams;

    const animeData = useAnimeData();
    const dispatch = useAnimeDispatch();

    useEffect(() => {}, []);

    useEffect(() => {
        getAnimeData(params).then(data => {
            dispatch({ type: AnimeActionType.updateAnime, payload: data });
        });
    }, [params]);

    useEffect(() => {
        if (
            animeData.length == 1 &&
            params.seriesFolderName &&
            !params.episodeNumber
        ) {
            // Navigated to series page after pull seriesInfo pull all other data
            getAnimeData({}).then(data => {
                dispatch({ type: AnimeActionType.updateAnime, payload: data });
            });

            // getAnimeData({ ...params, includeTimelineData: true }).then(
            //     data => {
            //         dispatch({
            //             type: AnimeActionType.updateAnime,
            //             payload: data,
            //         });
            //     }
            // );
        }
    }, [animeData]);

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
    anime?: AnimeData;
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
        anime,
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

    const imageRef = useRef<HTMLImageElement>(null);
    const offlineImage = `http://localhost:5555/api/animeDownload/image?seriesFolderName=${anime?.seriesFolderName}`;

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
                                ref={imageRef}
                                onClick={
                                    onImageClickFunction
                                        ? onImageClickFunction
                                        : undefined
                                }
                                src={
                                    window.navigator.onLine
                                        ? imageSrc
                                        : offlineImage
                                }
                                onError={() => {
                                    if (
                                        window.navigator.onLine &&
                                        anime?.seriesFolderName &&
                                        imageRef.current &&
                                        imageRef.current.src !== offlineImage
                                    ) {
                                        imageRef.current!.src = offlineImage;
                                    }
                                }}
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
