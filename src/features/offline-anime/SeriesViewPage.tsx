import { AnimeData } from "@features/contexts/AnimeContext";
import { AnimeGroup } from "./AnimeGroup";
import {
    AniListAPI,
    getLatestWatchedEpisode,
    StorageKeys,
} from "./OfflineAnimeV2";
import { useEffect, useState } from "react";

export function SeriesViewPage(props: SeriesViewPageProps) {
    const [anilistOrder, setAnilistOrder] = useState<number[]>([]);
    const [pageNumber, setPageNumber] = useState(1);

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
    useEffect(() => {
        // fetchMoreData();
    }, [pageNumber]);

    const { animeData } = props;

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

    const groups: {
        [groupName: string]: AnimeData[];
    } = {
        "Continue Watching": continueWatching,
        Completed: completedAnime,
        All: animeData,
    };

    return (
        <div
            style={{
                padding: "10px",
            }}
        >
            {Object.keys(groups).map(groupName => {
                const data = groups[groupName];
                return (
                    <AnimeGroup
                        key={groupName}
                        groupName={groupName}
                        data={data}
                        anilistOrder={anilistOrder}
                    />
                );
            })}
        </div>
    );
}

export interface SeriesViewPageProps {
    animeData: AnimeData[];
}
