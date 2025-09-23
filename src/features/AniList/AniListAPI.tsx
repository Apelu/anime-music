import { totalmem } from "os";
import { MediaParamType, MediaSort, MediaType } from "./constants";

class AniListAPIClass {
    baseURL = "https://graphql.anilist.co";
    accessToken: string | null = null;
    userId: number | null = null;

    // constructor() {
    //     const animeUserRaw = localStorage.getItem("animeUser");
    //     let userData: any = null;
    //     if (animeUserRaw) {
    //         userData = JSON.parse(animeUserRaw);
    //         this.accessToken = userData.aniList.access_token;
    //     }
    //     this.authorizeUser();
    // }

    // async ensureAuthorized(): Promise<void> {
    //     var animeUser: {
    //         aniList?: { access_token?: string };
    //     } = {}
    //     try {
    //         animeUser = JSON.parse(localStorage.getItem("animeUser") || "{}");
    //     } catch (error) {
    //         console.error("Error parsing animeUser:", error);
    //     }

    //     if(animeUser?.aniList?.access_token) {

    // async authorizeUser(): Promise<void> {
    //     if (!this.accessToken) {
    //         // Redirect to login or show login prompt
    //         console.log("User not authorized");
    //     } else {
    //         // Fetch user information using the access token
    //         const response = await this.performFetch(`
    //             query {
    //                 Viewer {
    //                     id
    //                     name
    //                 }
    //             }
    //         `);
    //         const data = await response.json();

    //         console.log("Authorized user:", data);
    //         this.userId = data.data.Viewer.id;
    //     }
    // }

    async performFetch(query: string): Promise<Response> {
        return fetch(this.baseURL, {
            method: "POST",
            headers: {
                ...{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                ...(this.accessToken
                    ? { Authorization: `Bearer ${this.accessToken}` }
                    : {}),
            },
            body: JSON.stringify({
                query: query,
            }),
        });
    }
}

function formatAsGraphQL(text: string) {
    return text
        .split("\n")
        .map(line => line.trim())
        .join("\n");
}

export function updateAniListEpisodeProgress(
    aniListID: number,
    episodeNumber: number,
    isEpisodeEnd = true
) {
    console.log("Updating AniList Episode Progress", {
        aniListID,
        episodeNumber,
        isEpisodeEnd,
    });
}

interface MediaFieldList {
    id?: boolean;
    title?: { romaji?: boolean; english?: boolean };
    bannerImage?: boolean;
    coverImage?: { extraLarge?: boolean; large?: boolean; medium?: boolean };
    siteUrl?: boolean;
}

export interface Anime {
    id?: number;
    title?: { romaji?: string; english?: string };
    bannerImage?: string;
    coverImage?: { extraLarge?: string; large?: string; medium?: string };
    siteUrl?: string;
}

export class AniListQueries {
    static getMedia({
        page = 1,
        perPage = 50,
        mediaParams = {
            sort: MediaSort.SCORE_DESC,
            type: MediaType.ANIME,
            isAdult: false,
        },
        fields = {
            id: false,
            title: { romaji: false, english: false },
            bannerImage: false,
            coverImage: { extraLarge: false, large: false, medium: false },
            siteUrl: false,
        },
    }: {
        page?: number;
        perPage?: number;
        mediaParams?: MediaParamType;
        fields?: MediaFieldList;
    }) {
        const convertedFields = Object.keys(fields).map(function (fieldName) {
            const fieldChild = (fields as any)[fieldName];
            if (typeof fieldChild === "boolean") {
                return !fieldChild ? fieldName : "";
            } else {
                var fieldChildKeys = Object.keys(fieldChild)
                    .map(subFieldName => {
                        const subFieldChild = (fieldChild as any)[subFieldName];
                        return !subFieldChild ? subFieldName : "";
                    })
                    .join("\n");
                return `${fieldName}\n{\n${fieldChildKeys}\n}`;
            }
        });

        return `query {
            Page(page: ${page}, perPage: ${perPage}) {
                media(${Object.keys(mediaParams).map(
                    key => `${key}: ${(mediaParams as any)[key]}`
                )}) {
                    ${convertedFields.join("\n")}
                }
            }
        }`;
    }
}
export const AniListAPI = new AniListAPIClass();

export default AniListAPI;
