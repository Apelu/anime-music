import { AnimeData } from "@features/contexts/AnimeContext";
import { AnimeGroup } from "./AnimeGroup";
import {
    AniListAPI,
    getLatestWatchedEpisode,
    StorageKeys,
} from "./OfflineAnimeV2";
import { useEffect, useState } from "react";
import { doc } from "firebase/firestore";
import { ServerCalls } from "@features/ServerCalls";
import { ConfirmAniListMappingModal } from "./EpisodeViewPage";

export function SeriesViewPage(props: SeriesViewPageProps) {
    const [anilistOrder, setAnilistOrder] = useState<number[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [anime, setAnime] = useState<AnimeData | null>(null);

    async function fetchMoreData() {
        const accessToken = localStorage.getItem(StorageKeys.accessToken);
        if (!accessToken) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 30000));

        try {
            AniListAPI(
                `
                    query ($page: Int) {
                        Page(page: $page, perPage: 50) {
                            pageInfo {
                                total
                                perPage
                                currentPage
                                lastPage
                                hasNextPage
                            }
                            mediaList(type: ANIME, userId: 6022064, sort: UPDATED_TIME_DESC) {
                                mediaId
                            }
                        }
                    }
                    `,
                { page: pageNumber },
                accessToken,
                function (data) {
                    setAnilistOrder([
                        ...anilistOrder,
                        ...data.data.Page.mediaList.map((m: any) => m.mediaId),
                    ]);

                    if (data.data.Page.pageInfo.hasNextPage) {
                        setPageNumber(pageNumber + 1);
                    }
                    console.log("Anilist order", data.data.Page.mediaList);
                }
            );
        } catch (e) {}
    }
    // useEffect(() => {
    //     // fetchMoreData();
    // }, [pageNumber]);

    const { animeData, refreshData } = props;

    useEffect(() => {
        const serverCalls = new ServerCalls();
        const eventSource = new EventSource(serverCalls.getUpdatesUrl({}));

        eventSource.onmessage = event => {
            const eventData = JSON.parse(event.data);
            console.log("Received update:", eventData);

            const MyEvents = {
                StepsUpdated: "StepsUpdated",
                WatchController: "WatchController",
                SeriesSecondsLeft: "SeriesSecondsLeft",
                FileUpdated: "FileUpdated",
            };

            if (eventData.eventName == MyEvents.WatchController) {
                // const watchEventData = eventData.eventPayload;
                // const command = watchEventData.command;
                // if (command.indexOf("open|") == 0) {
                //     const url = command.split("|")[1];
                //     document.location.href = url;
                // }
            } else if (eventData.eventName == MyEvents.FileUpdated) {
                // props.refreshData();
            }
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const startedAnime = animeData
        .filter(anime => getLatestWatchedEpisode(anime))
        .sort((a, b) => {
            const aLastWatchedEpisode = getLatestWatchedEpisode(a);
            const bLastWatchedEpisode = getLatestWatchedEpisode(b);

            if (!aLastWatchedEpisode || !bLastWatchedEpisode) {
                return 0;
            }

            return (
                b.watchProgress[bLastWatchedEpisode].lastUpdated -
                a.watchProgress[aLastWatchedEpisode].lastUpdated
            );
        });

    const continueWatching = startedAnime.filter(a => {
        return !(
            a.watchProgress[a.episodes[a.episodes.length - 1]] &&
            a.watchProgress[a.episodes[a.episodes.length - 1]].progress
        );
    });

    const completedAnime = startedAnime.filter(a => {
        return (
            a.watchProgress[a.episodes[a.episodes.length - 1]] &&
            a.watchProgress[a.episodes[a.episodes.length - 1]].progress
        );
    });

    console.log(completedAnime);
    const recs: Record<number, boolean> = {
        10536: true,
        104454: true,
        109492: true,
        110178: true,
        110229: true,
        116922: true,
        117074: true,
        119960: true,
        127863: true,
        131708: true,
        136829: true,
        139359: true,
        148002: true,
        159309: true,
        164702: true,
        168872: true,
        168999: true,
        169512: true,
        170019: true,
        176858: true,
        182317: true,
        185756: true,
    };

    var missingAnilistID = animeData.filter(
        a => !a.anilistID && !a.anilistIDConfirmed
    );

    const groups: {
        [groupName: string]: AnimeData[];
    } = {
        ...(missingAnilistID.length > 0 && {
            "Missing AniList ID": missingAnilistID,
        }),
        // Reccomended: animeData.filter(
        //     a => a.anilistID && recs[parseInt(a.anilistID)]
        // ),

        "Continue Watching": continueWatching,
        Completed: completedAnime,
        Planning: animeData.filter(a => a.watchStatus == "planning"),
        All: animeData,
    };

    return (
        <div
            style={{
                padding: "10px",
                minHeight: "10000vh",
            }}
        >
            {anime && (
                <ConfirmAniListMappingModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    anime={anime}
                />
            )}

            {Object.keys(groups).map(groupName => {
                const data = groups[groupName];
                return (
                    <AnimeGroup
                        key={groupName}
                        groupName={groupName}
                        data={data}
                        anilistOrder={anilistOrder}
                        refreshData={props.refreshData}
                        setAnime={setAnime}
                        setShowModal={setShowModal}
                    />
                );
            })}
        </div>
    );
}

export interface SeriesViewPageProps {
    animeData: AnimeData[];
    refreshData: () => void;
}
