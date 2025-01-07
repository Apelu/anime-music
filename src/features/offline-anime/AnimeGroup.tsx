import { AnimeData } from "@features/contexts/AnimeContext";
import { useState, useEffect } from "react";
import { getLatestWatchedEpisode, AnimeCard } from "./OfflineAnimeV2";
import { Button, Collapse } from "react-bootstrap";

export function AnimeGroup(props: {
    groupName: string;
    data: AnimeData[];
    anilistOrder: number[];
}) {
    const { groupName, data } = props;

    const [search, setSearch] = useState({
        isSearching: false,
        searchText: "",
    });

    const [isCollapsed, setIsCollapsed] = useState(
        // false
        groupName == "Completed" ? true : false
    );

    const [isRandomized, setIsRandomized] = useState(false);
    const [specialOrderBy, setSpecialOrderBy] = useState<String>("anilist");

    useEffect(() => {
        setSpecialOrderBy(isRandomized ? "random" : "");
    }, [isRandomized]);

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
            (!search.searchText ||
                anime.seriesTitle
                    .toLowerCase()
                    .includes(search.searchText.toLowerCase())) &&
            (specialOrderBy != "anilist" ||
                props.anilistOrder.indexOf(parseInt(anime.anilistID)) != -1)
    );

    if (isRandomized) {
        filteredData.sort(() => Math.random() - 0.5);
    } else if (specialOrderBy == "anilist") {
        filteredData.sort((a, b) => {
            const aIndex = props.anilistOrder.indexOf(parseInt(a.anilistID));
            const bIndex = props.anilistOrder.indexOf(parseInt(b.anilistID));

            if (aIndex == -1) {
                return 1;
            }

            if (bIndex == -1) {
                return -1;
            }

            return aIndex - bIndex;
        });
    }
    return (
        <>
            <h1
                className="mt-3 p-3 bg-primary text-white text-center"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {groupName}{" "}
                <span className="badge bg-info p-1">{filteredData.length}</span>
                <div>
                    {groupName == "All" ? (
                        <>
                            <Button
                                className="ms-2"
                                variant="info"
                                onClick={e => {
                                    setIsRandomized(!isRandomized);
                                    e.stopPropagation();
                                }}
                            >
                                {isRandomized
                                    ? "Return to Original Order"
                                    : "Randomize"}
                            </Button>
                            <Button
                                className="ms-2"
                                variant="info"
                                onClick={e => {
                                    setSpecialOrderBy(
                                        specialOrderBy != "anilist"
                                            ? "anilist"
                                            : ""
                                    );
                                    e.stopPropagation();
                                }}
                            >
                                {specialOrderBy == "anilist"
                                    ? "Change to Original Order"
                                    : "AniList Order"}
                            </Button>
                        </>
                    ) : null}
                </div>
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
                                anime={anime}
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
