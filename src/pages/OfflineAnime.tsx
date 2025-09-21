import VideoPlayerView from "@features/offline-anime/VideoViewPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "video.js/dist/video-js.css";
import "videojs-hotkeys";
import { ServerCalls } from "../features/ServerCalls";

function OfflineAnime(props: any) {
    const params = useParams();
    const serverCalls = new ServerCalls();

    const [data, setData] = useState<any>({
        view: null, //
        seriesData: [],
        selectedSeriesData: null, // null | Anime
        progress: {},
    });

    // Path /anime/:seriesFolderName/:episodeNumber
    async function dataPulls() {
        const response = await serverCalls.getProgress();

        const progressData = await response.json();

        if (params.seriesFolderName && params.episodeNumber) {
            serverCalls
                .getEpisodes(params.seriesFolderName)
                .then(response => {
                    return response.json();
                })
                .then(episodeInfo => {
                    setData({
                        ...data,
                        view: "video",
                        selectedSeriesData: Object.values(episodeInfo),
                        progress: progressData,
                    });
                });

            // });
            return;
        }
    }
    useEffect(() => {
        dataPulls();
    }, []); //[params.seriesFolderName, params.episodeNumber]);

    switch (data.view) {
        case "video":
            if (!params.seriesFolderName || !params.episodeNumber) {
                return <span>Invalid URL</span>;
            }

            return <VideoPlayerView data={data} />;

        default:
            return <span>Loading... {JSON.stringify(data)}</span>;
    }
}

export interface AnimeEpisode {
    watchPageUrl: string;
    episodeNumber: string;
    status: string;
    fileSize: number;
    expectedFileSize: string;
    episodeDownloadPageUrl: string;
    episodeVideoName: string;

    coverImageUrl: string;
    seriesTitle: string;
    seriesFolderName: string;
    anilistID: number;
    startingPageUrl: string;
    expectedEpisodeCount: number;
    priority: string;
    progress: number;
    duration: number;
}

export default OfflineAnime;
