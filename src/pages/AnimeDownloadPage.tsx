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

    updateAnilistID(gogoSeriesPageUrl: string, anilistID: string) {
        return fetch(
            `${this.baseURL}/updateAnilistID?gogoSeriesPageUrl=${gogoSeriesPageUrl}&anilistID=${anilistID}`
        );
    }

    Identifiers = {
        AnimeMap: "animeMap.json",
        GogoAnimeQueue: "gogoAnimeQueue.json",
    };
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
    return null;
}

export default AnimeDownloadPage;
