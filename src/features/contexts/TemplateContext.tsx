import { ServerCalls } from "@pages/AnimeDownloadPage";
import { get } from "http";
import { createContext, useContext, useReducer } from "react";

const MyContext = createContext<MyData | null>(null);
const MyDispatchContext = createContext<React.Dispatch<MyAction> | null>(null);

export function MyProvider({ children }: { children: JSX.Element }) {
    const [displaySettings, dispatch] = useReducer(myReducer, intialData);

    return (
        <MyContext.Provider value={displaySettings}>
            <MyDispatchContext.Provider value={dispatch}>
                {children}
            </MyDispatchContext.Provider>
        </MyContext.Provider>
    );
}

export function useMyData() {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyData must be used within a MyProvider");
    }
    return context;
}

export function useMyDispatch() {
    const context = useContext(MyDispatchContext);
    if (!context) {
        throw new Error("useMyDispatch must be used within a MyProvider");
    }
    return context;
}

function myReducer(data: MyData, action: MyAction) {
    switch (action.type) {
        case MyActionType.Placeholder:
            return {
                ...data,
                // payload: action.payload,
            };
        default:
            throw new Error("Unknown action type");
    }
}

export enum MyActionType {
    Placeholder = "Placeholder",
}

interface MyAction {
    type: MyActionType;
    payload?: any;
}

interface MyData {}

const intialData = {};

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
                } else {
                    newData[index] = newAnimeData;
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
    seriesTitle: string;
    seriesFolderName: string;
    anilistID: string;
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
    coverImageUrl: string;
    episodes: string[];
    watchProgress: {
        [episodeNumber: string]: {
            progress: number;
            duration: number;
            lastUpdated: number;
        };
    };
}

const initialAnimeData: AnimeData[] = [];
