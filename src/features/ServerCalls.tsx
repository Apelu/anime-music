import { baseURL } from "@shared/MyLocalServer";

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

    updateWatchProgress(
        accessToken: string,
        anilistID: number,
        episodeNumber: number
    ) {
        return fetch(
            baseURL +
                `:2222/updateWatchProgress?accessToken=${accessToken}&anilistID=${anilistID}&progress=${episodeNumber}`
        );
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
