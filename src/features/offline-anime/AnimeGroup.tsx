import { AnimeData } from "@features/contexts/TemplateContext";
import { useState, useEffect } from "react";
import { getLatestWatchedEpisode, AnimeCard } from "./OfflineAnimeV2";
import { Collapse } from "react-bootstrap";

export function AnimeGroup(props: { groupName: string; data: AnimeData[] }) {
    const { groupName, data } = props;

    const [search, setSearch] = useState({
        isSearching: false,
        searchText: "",
    });

    const [isCollapsed, setIsCollapsed] = useState(
        groupName != "Continue Watching" ? true : false
    );

    useEffect(() => {
        if (search.isSearching && data.length < 10) {
            setSearch({
                isSearching: false,
                searchText: "",
            });
        } else if (!search.isSearching && data.length > 10) {
            setSearch({
                isSearching: true,
                searchText: "",
            });
        }
    }, [data]);

    const filteredData = data.filter(
        anime =>
            !search.searchText ||
            anime.seriesTitle
                .toLowerCase()
                .includes(search.searchText.toLowerCase())
    );
    return (
        <>
            <h1
                className="mt-3 p-3 bg-primary text-white text-center"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {groupName}{" "}
                <span className="badge bg-info p-1">{filteredData.length}</span>
                {search.isSearching ? (
                    <div
                        style={{
                            position: "relative",
                        }}
                    >
                        <input
                            onClick={e => e.stopPropagation()}
                            className="form-control mt-3 text-center"
                            type="text"
                            onChange={e =>
                                setSearch({
                                    ...search,
                                    searchText: e.target.value,
                                })
                            }
                            value={search.searchText}
                        />

                        {search.searchText ? (
                            <button
                                onClick={e => {
                                    e.stopPropagation();
                                    setSearch({
                                        ...search,
                                        searchText: "",
                                    });
                                }}
                                className="btn btn-secondary btn-sm"
                                style={{
                                    position: "absolute",
                                    right: "0",
                                    top: "0",
                                    marginTop: "0.25rem",
                                    marginRight: "0.25rem",
                                }}
                            >
                                X
                            </button>
                        ) : null}
                    </div>
                ) : null}
            </h1>

            <Collapse in={!isCollapsed}>
                <div
                    // className={`collapse ${isCollapsed ? "" : "show"}`}
                    style={
                        isCollapsed
                            ? {}
                            : {
                                  display: "flex",
                                  justifyContent: "center",
                                  flexWrap: "wrap",
                              }
                    }
                >
                    {filteredData.map((anime, index) => {
                        const seriesInfoLink = `/anime/${anime.seriesFolderName}`;
                        const latestWatchedEpisode =
                            getLatestWatchedEpisode(anime);

                        return (
                            <AnimeCard
                                key={index}
                                imageSrc={anime.coverImageUrl}
                                title={anime.seriesTitle}
                                onImageClickLink={`${seriesInfoLink}${
                                    latestWatchedEpisode
                                        ? `/${latestWatchedEpisode}`
                                        : ""
                                }`}
                                onTitleClickLink={seriesInfoLink}
                                topLeftComponent={
                                    anime.anilistID ? (
                                        <span>
                                            <a
                                                href={`https://anilist.co/anime/${anime.anilistID}`}
                                                target="_blank"
                                            >
                                                <img
                                                    src={
                                                        "https://anilist.co/img/logo_al.png"
                                                    }
                                                    alt="?"
                                                    style={{
                                                        width: "20px",
                                                    }}
                                                />
                                            </a>
                                        </span>
                                    ) : (
                                        <a
                                            href={`https://anilist.co/search/anime?search=${removeWords(
                                                anime.seriesTitle
                                            )}`}
                                            target="_blank"
                                        >
                                            Missing Anilist ID
                                        </a>
                                    )
                                }
                                topRightComponent={
                                    <div>
                                        {latestWatchedEpisode
                                            ? `${latestWatchedEpisode} / `
                                            : ""}
                                        {
                                            anime.episodes[
                                                anime.episodes.length - 1
                                            ]
                                        }
                                    </div>
                                }
                            />
                        );
                    })}
                </div>
            </Collapse>
        </>
    );
}

export function removeWords(str: string) {
    const replaceAlls = {
        movie: "",
        " ova ": " ",
        " special ": " ",
        " season ": " ",
        " episode ": " ",
        " the ": " ",
        " and ": " ",
        " a ": " ",
    };

    let newStr = str.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    // Lowercase and only keep number and letters and spaces

    for (const [key, value] of Object.entries(replaceAlls)) {
        newStr = newStr.replace(new RegExp(key, "gi"), value);
    }

    return newStr;
}
