import { createContext, useReducer, useContext } from "react";

/////////// Offline Anime Content ///////////
const AnimeContext = createContext<AnimeData[] | null>(null);
const AnimeDispatchContext = createContext<React.Dispatch<AnimeAction> | null>(
    null
);

export function AnimeProvider({ children }: { children: JSX.Element }) {
    const [animeData, dispatch] = useReducer(animeReducer, initialAnimeData);

    return (
        <AnimeContext.Provider value={animeData}>
            <AnimeDispatchContext.Provider value={dispatch}>
                {children}
            </AnimeDispatchContext.Provider>
        </AnimeContext.Provider>
    );
}

export function useAnimeData() {
    const context = useContext(AnimeContext);
    if (!context) {
        throw new Error("useAnimeData must be used within an AnimeProvider");
    }
    return context;
}

export function useAnimeDispatch() {
    const context = useContext(AnimeDispatchContext);
    if (!context) {
        throw new Error(
            "useAnimeDispatch must be used within an AnimeProvider"
        );
    }
    return context;
}
function animeReducer(data: AnimeData[], action: AnimeAction) {
    console.log("animeReducer", data, action);
    switch (action.type) {
        case AnimeActionType.setAnime:
            return action.payload;
        case AnimeActionType.updateAnime:
            const newAnime = action.payload;
            const newData = [...data];

            newAnime.forEach((newAnimeData: AnimeData) => {
                const index = newData.findIndex(
                    anime =>
                        anime.seriesFolderName === newAnimeData.seriesFolderName
                );

                if (index === -1) {
                    newData.push(newAnimeData);
                } else if (
                    !newData[index].anilistData &&
                    newAnimeData.anilistData
                ) {
                    newData[index] = newAnimeData;
                } else if (
                    !newData[index].timelineData &&
                    newAnimeData.timelineData
                ) {
                    newData[index].timelineData = newAnimeData.timelineData;
                } else if (newAnimeData.watchProgress) {
                    newData[index] = {
                        ...newData[index],
                        watchProgress: {
                            ...newAnimeData.watchProgress,
                        },
                        watchStatus: newAnimeData.watchStatus,
                    };
                }
            });

            newData.sort((a, b) => {
                return a.seriesFolderName.localeCompare(b.seriesFolderName);
            });

            return newData;
        default:
            throw new Error("Unknown action type");
    }
}

export enum AnimeActionType {
    setAnime = "setAnime",
    updateAnime = "updateAnime",
}
interface AnimeAction {
    type: AnimeActionType;
    payload: AnimeData[] | any;
}

export interface AnimeData {
    sessionID: string;
    seriesTitle: string;
    seriesFolderName: string;
    anilistID: string;
    gogoSeriesPageUrl: string;
    anilistData?: {
        anilistID: string;
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
        startDate: {
            year: number;
            month: number;
            day: number;
        };
        genres: string[];
        tags: {
            id: number;
            name: string;
        }[];
        averageScore: number;
        relations: {
            edges: {
                relationType: string;
                node: {
                    matches?: string[];
                    id: number;
                    type: string;
                    anilistID: string;
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
                    startDate: {
                        year: number;
                        month: number;
                        day: number;
                    };
                    genres: string[];
                    tags: {
                        id: number;
                        name: string;
                    }[];
                    averageScore: number;
                };
            }[];
        };
    };
    timelineData?: {
        [anilistID: string]: {
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
            startDate: {
                year: number;
                month: number;
                day: number;
            };
            genres: string[];
            tags: {
                id: number;
                name: string;
            }[];
            averageScore: number;
        };
    };
    coverImageUrl: string;
    episodes: string[];
    watchProgress: {
        [episodeNumber: string]: {
            progress: number;
            duration: number;
            lastUpdated: number;
        };
    };
    watchStatus: "planning" | "watching" | "completed" | "";
    /*
const PotentialIssues = {
            MissingAniListMapping: "Missing AniList Mapping",
            DuplicateAniListMapping: "Duplicate AniList Mapping",
            UnconfirmedAniListMapping: "Unconfirmed AniList Mapping",
        };
    */
    videoData: {
        [episodeNumber: string]: {
            duration: number;
        };
    };
    issuesData: {
        "Unconfirmed AniList Mapping": boolean;
        "Missing AniList Mapping": boolean;
        "Duplicate AniList Mapping": boolean;
        "Episode Count Mismatch": {
            anilistEpisodes: number;
            localEpisodesCount: number;
            localEpisodes: number[];
        };
        "Low-Quality Episode(s)": {
            filePath: string;
        };
    };
}
const initialAnimeData: AnimeData[] = [];
