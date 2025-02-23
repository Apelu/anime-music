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

    static async pullUserAnimeList(userID: string, listName: string) {
        // TODO: Pull User Anime based on anime container settings (UserAnime + UserAnimeEpisode -> LocalAnime + LocalAnimeEpisode + LocalAnimeEpisodeSegments)
        return fetch(this.serverURL + "/user/anime-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID,
                listName,
            }),
        });
    }

    static async refreshUser() {}
}
