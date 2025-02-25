import { baseURL } from "@pages/AnimeDownloadPage";

export class MyLocalServer {
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

    static async pullUserAnimeList(userID: string, containerID: string) {
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

    static async refreshUser() {}
}
