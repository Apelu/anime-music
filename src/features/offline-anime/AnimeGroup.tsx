import { AnimeData } from "@features/contexts/AnimeContext";
import { useState, useEffect } from "react";
import { getLatestWatchedEpisode, AnimeCard } from "./OfflineAnimeV2";
import { Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
import { ServerCalls } from "@features/ServerCalls";

export function AnimeGroup(props: {
    groupName: string;
    data: AnimeData[];
    anilistOrder: number[];
    refreshData: () => void;
    setAnime: (anime: AnimeData | null) => void;
    setShowModal: (show: boolean) => void;
}) {
    const { groupName, data, refreshData, setAnime, setShowModal } = props;

    const [search, setSearch] = useState({
        isSearching: false,
        searchText: "",
    });

    const [isCollapsed, setIsCollapsed] = useState(
        // true
        // false
        groupName == "Completed" ||
            groupName == "Planning" ||
            groupName == "Missing AniList ID"
            ? true
            : false
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
        } else if (!search.isSearching && data.length > 25) {
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
                style={{
                    borderRadius: "0.25rem",
                }}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {groupName}{" "}
                <span className="badge bg-info p-1">{filteredData.length}</span>
                {data.length > 10 ? (
                    <Button
                        variant="secondary"
                        className="ms-2"
                        size="sm"
                        onClick={e => {
                            setSearch({
                                ...search,
                                isSearching: !search.isSearching,
                                searchText: "",
                            });
                            e.stopPropagation();
                        }}
                    >
                        <FontAwesomeIcon
                            icon={
                                search.isSearching
                                    ? faMagnifyingGlassMinus
                                    : faMagnifyingGlass
                            }
                        />
                    </Button>
                ) : null}
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
                                                    loading="lazy"
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
                                        // map to anilist
                                        <Button
                                            size="sm"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setAnime(anime);
                                                setShowModal(true);
                                            }}
                                        >
                                            Map to AniList
                                        </Button>
                                    )
                                }
                                topRightComponent={
                                    <>
                                        <HoverComponent
                                            normalComponent={
                                                <div>
                                                    {latestWatchedEpisode
                                                        ? `${latestWatchedEpisode} / `
                                                        : ""}
                                                    {
                                                        anime.episodes[
                                                            anime.episodes
                                                                .length - 1
                                                        ]
                                                    }{" "}
                                                    {anime.watchStatus ==
                                                    "planning"
                                                        ? " (P)"
                                                        : ""}
                                                </div>
                                            }
                                            hoverComponent={
                                                !latestWatchedEpisode ? (
                                                    anime.watchStatus ==
                                                    "planning" ? (
                                                        <Button
                                                            style={{
                                                                fontSize:
                                                                    "0.75rem",
                                                            }}
                                                            onClick={() => {
                                                                const serverCalls =
                                                                    new ServerCalls();
                                                                fetch(
                                                                    serverCalls.removeFromPlanning(
                                                                        anime.seriesFolderName
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            Remove from Planning
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            style={{
                                                                fontSize:
                                                                    "0.75rem",
                                                            }}
                                                            onClick={() => {
                                                                const serverCalls =
                                                                    new ServerCalls();
                                                                fetch(
                                                                    serverCalls.addToPlanning(
                                                                        anime.seriesFolderName
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            Add to Planning
                                                        </Button>
                                                    )
                                                ) : undefined
                                            }
                                        />
                                    </>
                                }
                            />
                        );
                    })}
                </div>
            </Collapse>
        </>
    );
}

function HoverComponent(props: {
    normalComponent: JSX.Element;
    hoverComponent: JSX.Element | undefined;
}) {
    const [isHovered, setIsHovered] = useState(false);

    if (!props.hoverComponent) {
        return props.normalComponent;
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? props.hoverComponent : props.normalComponent}
        </div>
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
