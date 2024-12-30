import { AnimeData } from "@features/contexts/TemplateContext";
import { AnimeGroup } from "./AnimeGroup";
import { getLatestWatchedEpisode } from "./OfflineAnimeV2";

export function SeriesViewPage(props: SeriesViewPageProps) {
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
        <div>
            {Object.keys(groups).map(groupName => {
                const data = groups[groupName];
                return (
                    <AnimeGroup
                        key={groupName}
                        groupName={groupName}
                        data={data}
                    />
                );
            })}
        </div>
    );
}

export interface SeriesViewPageProps {
    animeData: AnimeData[];
}
