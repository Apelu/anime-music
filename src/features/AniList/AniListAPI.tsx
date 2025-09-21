import { totalmem } from "os";
import { MediaParamType, MediaSort, MediaType } from "./constants";

class AniListAPIClass {
    basreURL = "https://graphql.anilist.co";
    accessToken: string | null = null;

    async performFetch(query: string): Promise<Response> {
        return fetch(this.basreURL, {
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
