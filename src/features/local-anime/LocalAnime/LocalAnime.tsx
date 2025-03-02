import { useUserData } from "@features/contexts/UserContext";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MyLocalServer, { AnimeData } from "@shared/MyLocalServer";
import AniListLogoLink from "../Global/AniListLogoLink";
import { AnimeContainerCard } from "../LocalAnimeHome/LocalAnimeContainerCard";
import LocalAnimeEpisodeCards from "./LocalAnimeEpisodeCards";
import TimeCard from "./TimeCard";

export function LocalAnime() {
    const user = useUserData();
    const { animeID = "" } = useParams();

    const [animeData, setAnimeData] = useState<AnimeData | null>(null);

    async function pullAnimeData() {
        MyLocalServer.pullAnimeData(user.id, animeID)
            .then(res => res.json())
            .then(data => {
                console.log({ data });
                setAnimeData(data);
            })
            .catch(e => {
                console.error(e);
                alert("Failed to retrieve anime data");
            });
    }

    function liveUpdates() {
        const currentHour = new Date().getHours();

        // if (currentHour <= 5) {
        //     alert("It's past midnight, you should get some rest");
        //     document.location.href = "/anime";
        // }

        /**
         * Steps Alerts
         */

        // const serverCalls = new ServerCalls();
        // const eventSource = new EventSource(serverCalls.getUpdatesUrl({}));

        // eventSource.onmessage = event => {
        //     const eventData = JSON.parse(event.data);
        //     console.log("Received update:", eventData);

        //     const MyEvents = {
        //         StepsUpdated: "StepsUpdated",
        //         WatchController: "WatchController",
        //         SeriesSecondsLeft: "SeriesSecondsLeft",
        //         FileUpdated: "FileUpdated",
        //     };

        //     if (eventData.eventName == MyEvents.WatchController) {
        //         const watchEventData = eventData.eventPayload;
        //         const command = watchEventData.command;

        //         if (command.indexOf("open|") == 0) {
        //             const url = command.split("|")[1];
        //             document.location.href = url;
        //         }
        //     } else if (eventData.eventName == MyEvents.FileUpdated) {
        //         props.refreshData(true);
        //     }
        // };

        // return () => {
        //     eventSource.close();
        // };
    }

    useEffect(() => {
        pullAnimeData();
        liveUpdates();
    }, []);

    const navigate = useNavigate();

    if (!animeData) {
        return <p>Loading...</p>;
    }

    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                marginBottom: "200px",
            }}
        >
            {/* Details */}
            <Button
                variant="info"
                size="sm"
                onClick={() => navigate(`/local-anime-home`)}
            >
                Return to Series
            </Button>

            <AnimeContainerCard
                anime={animeData}
                onImageClickLink={`/local-anime/${animeData.localAnimeID}`}
                onTitleClickLink={`/local-anime/${animeData.localAnimeID}`}
                topLeftComponent={
                    <AniListLogoLink aniListID={animeData.aniListID} />
                }
                topRightComponent={
                    <div>
                        {animeData.watchProgress
                            ? `${animeData.watchProgress} / `
                            : ""}
                        {animeData.finalEpisode}{" "}
                        {animeData.watchStatus == "Planning" ? " (P)" : ""}
                    </div>
                }
            />

            <TimeCard />

            <LocalAnimeEpisodeCards animeData={animeData} />
        </Container>
    );
}
