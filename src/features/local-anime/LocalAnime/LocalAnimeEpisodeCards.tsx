import { AnimeData } from "@shared/MyLocalServer";
import EpisodeCard from "./EpisodeCard";

function LocalAnimeEpisodeCards({ animeData }: { animeData: AnimeData }) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {animeData.episodes.map(episode => {
                return (
                    <EpisodeCard
                        key={episode.id}
                        animeData={animeData}
                        episode={episode}
                    />
                );
            })}
        </div>
    );
}

export default LocalAnimeEpisodeCards;
