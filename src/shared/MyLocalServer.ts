export const baseURL = "http://192.168.1.101";
class MyLocalServer {
    static serverURL = baseURL + ":2222/api";

    static async loginUser(username: string, password: string) {
        return fetch(this.serverURL + "/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
    }

    static async pullUserAnimeLists(userID: string) {
        return fetch(this.serverURL + "/user/anime-lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID,
            }),
        });
    }

    static async getUserAnimeContainer(userID: string, containerID: string) {
        return fetch(this.serverURL + "/user/anime-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID,
                containerID,
            }),
        });
    }

    static async createAnimeContainer(
        userID: string,
        updates: {
            name?: string;
            filters?: string;
        }
    ) {
        return fetch(this.serverURL + "/container/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID,
                ...updates,
            }),
        });
    }

    static async updateAnimeContainer(
        userID: string,
        containerID: string,
        updates: {
            name?: string;
            filters?: string;
        }
    ) {
        return fetch(this.serverURL + "/container/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID,
                containerID,
                ...updates,
            }),
        });
    }

    static async pullAnimeData(userID: string, animeID: string) {
        return fetch(this.serverURL + "/anime/getAnimeData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID,
                animeID,
            }),
        });
    }
}

export interface EpisodeData {
    id: string;
    animeID: string;
    episodeNumber: number;
    resolution: number;
    episodeDuration: number;
    animeEpisodeID: string;
    progress: number;
    duration: number;
    lastUpdated: number;
}

export interface AnimeData {
    id: string;
    title: string;
    folderPath: string;
    aniList: {
        id: number;
        confirmed: boolean;
    };
    watchStatus: string;
    localAnimeID: string;
    finalEpisode: number;
    watchProgress: number;
    currentEpisode: EpisodeData[];
    aniListID: number;
    aniListIDConfirmed: boolean;
    coverImage: string;
    episodes: EpisodeData[];
}

export default MyLocalServer;
