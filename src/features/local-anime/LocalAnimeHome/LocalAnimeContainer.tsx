import { SortDirection, ViewType } from "@data/constants";
import {
    ModalActionType,
    useSetShowingModalDispatch,
} from "@features/contexts/ModalContext";
import { useUserData } from "@features/contexts/UserContext";
import { AnimeContainerSettings } from "@features/subBars/AnimeContainerSettingsSubBar";
import SubBar from "@features/subBars/SubBar";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortOptions } from "@shared/constant";
import PullLocalUserAnimeContainer, {
    PullLocalUserAnimeContainerResponse,
} from "@shared/serverCalls/PullLocalUserAnimeContainer";
import UpdateLocalUserAnimeContainer from "@shared/serverCalls/UpdateLocalUserAnimeContainer";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Container, FormControl } from "react-bootstrap";
import AniListLogoLink from "../Global/AniListLogoLink";
import {
    AnimeContainerAction,
    AnimeContainerActionType,
    UserAnimeContainer,
} from "./AnimeContainer";
import { AnimeContainerCard } from "./LocalAnimeContainerCard";

// TODO: Live updates + filtering GUI
export function LocalUserAnimeContainer({
    userContainerID,
}: {
    userContainerID: string;
}) {
    const user = useUserData();
    const setShowingModal = useSetShowingModalDispatch();

    const containerRef = useRef<HTMLDivElement>(null);
    const [animeContainer, setAnimeContainer] = useState<UserAnimeContainer>({
        name: "<Loading>",

        subBarIsOpen: false,

        showingFilters: false,
        filters: [],

        isSearching: false,
        searchText: "",

        sortBy: "",
        sortByOptions: SortOptions,
        sortDirection: SortDirection.Descending,

        viewType: ViewType.Card,

        expanded: false,
        items: [],
    });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [endOfScroll, setEndOfScroll] = useState(false);
    useEffect(() => {
        pullData();
    }, []);

    if (animeContainer.name == "<Loading>") return null;

    // TODO: Create Filter GUI

    function sendUpdateToServer(
        updatedAnimeContainer: UserAnimeContainer,
        type: AnimeContainerActionType
    ) {
        const containerWithoutItems = { ...updatedAnimeContainer };
        delete containerWithoutItems.items;
        new UpdateLocalUserAnimeContainer()
            .fetch({
                userID: user.id,
                updatedContainer: {
                    ...containerWithoutItems,
                    id: userContainerID,
                    userID: user.id,
                },
            })
            .then(response => {
                if (response.ok) {
                    if (
                        [
                            AnimeContainerActionType.HandleSortBySelection,
                            AnimeContainerActionType.ToggleSortDirection,
                        ].includes(type)
                    ) {
                        pullData();
                    }
                } else {
                    alert("Failed to update container");
                }
            });
    }

    function handleAnimeContainerUpdate(action: AnimeContainerAction) {
        const updatedAnimeContainer = {
            ...animeContainer,
            ...updateAnimeContainer(),
        };
        if (
            [
                AnimeContainerActionType.ToggleExpanded,
                AnimeContainerActionType.HandleSortBySelection,
                AnimeContainerActionType.ToggleSortDirection,
                AnimeContainerActionType.HandleViewTypeChange,
                AnimeContainerActionType.HandleContainerNameUpdates,
            ].includes(action.type)
        ) {
            sendUpdateToServer(updatedAnimeContainer, action.type);
        }
        setAnimeContainer(updatedAnimeContainer);
        // setSettings(newSettings());
        function updateAnimeContainer() {
            switch (action.type) {
                case AnimeContainerActionType.HandleContainerNameUpdates:
                    return {
                        ...animeContainer,
                        name: action.payload,
                    };
                case AnimeContainerActionType.ToggleExpanded:
                    return {
                        ...animeContainer,
                        expanded: !animeContainer.expanded,
                    };
                case AnimeContainerActionType.ToggleSubBar:
                    return {
                        ...animeContainer,
                        subBarIsOpen: !animeContainer.subBarIsOpen,
                    };
                case AnimeContainerActionType.SetSortByOptions:
                    return {
                        ...animeContainer,
                        sortBy: action.payload[0],
                        sortByOptions: action.payload, // newSortByOptions
                    };
                case AnimeContainerActionType.ToggleIsFiltering:
                    return {
                        ...animeContainer,
                        showingFilters: !animeContainer.showingFilters,
                    };
                case AnimeContainerActionType.ToggleIsSearching:
                    return {
                        ...animeContainer,
                        isSearching: !animeContainer.isSearching,
                        searchText: "",
                    };
                case AnimeContainerActionType.HandleSearchTextUpdates:
                    return {
                        ...animeContainer,
                        searchText: action.payload, // newSearchText
                    };
                case AnimeContainerActionType.HandleViewTypeChange:
                    return {
                        ...animeContainer,
                        viewType: action.payload, // newValue
                    };

                case AnimeContainerActionType.ToggleSortDirection:
                    return {
                        ...animeContainer,
                        sortDirection:
                            animeContainer.sortDirection ===
                            SortDirection.Ascending
                                ? SortDirection.Descending
                                : SortDirection.Ascending,
                    };
                case AnimeContainerActionType.HandleSortBySelection:
                    return {
                        ...animeContainer,
                        sortBy: action.payload,
                    };
                default:
                    throw new Error("Unknown action type");
            }
        }
    }

    async function pullData() {
        try {
            const response = await new PullLocalUserAnimeContainer().fetch({
                userID: user.id,
                containerID: userContainerID,
            });
            const data: PullLocalUserAnimeContainerResponse =
                await response.json();

            setAnimeContainer({
                showingFilters: false,
                subBarIsOpen: false,
                isSearching: false,
                searchText: "",
                sortByOptions: SortOptions,
                ...(animeContainer.name == "<Loading>" ? {} : animeContainer),
                ...data,
            });
        } catch (e) {
            console.error(e);
            alert("Failed to retrieve user containers");
        }
    }

    function scrollToItem(type: "prev" | "next") {
        const container = containerRef.current;
        if (!container) {
            return console.error("Container not found");
        }

        const scrollAmount =
            container.clientWidth * (container.clientWidth > 600 ? 0.8 : 0.1);

        container.scrollBy({
            left: type === "prev" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    }

    const rowCount = animeContainer.viewType === ViewType.List ? 1 : 0;
    return (
        <Container
            fluid
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                margin: 0,
                padding: 0,
            }}
            className="mb-2"
        >
            <div
                style={
                    !rowCount
                        ? {
                              textAlign: "center",
                              position: "sticky",
                              top: "0",
                              zIndex: 1,
                          }
                        : {
                              textAlign: "center",
                          }
                }
            >
                <h2
                    className="bg-primary p-2 mb-0 hover-trigger"
                    onClick={() => {
                        handleAnimeContainerUpdate({
                            type: AnimeContainerActionType.ToggleExpanded,
                        });
                    }}
                >
                    <FontAwesomeIcon
                        icon={faPen}
                        size="xs"
                        className="hover-content"
                        title={"Click to update container"}
                        onClick={e => {
                            e.stopPropagation();
                            // setShowingModal({
                            //     type: ModalActionType.UpdateContainer,
                            //     payload: {
                            //         containerID: userContainerID,
                            //     },
                            // });

                            const newName = prompt(
                                "Enter new container name",
                                animeContainer.name
                            );

                            if (newName) {
                                handleAnimeContainerUpdate({
                                    type: AnimeContainerActionType.HandleContainerNameUpdates,
                                    payload: newName,
                                });
                            }
                        }}
                    />
                    {animeContainer.name}{" "}
                    <Badge bg="info" className="p-1">
                        <small>{animeContainer.items.length}</small>
                    </Badge>
                </h2>
                <div
                    className={`collapse ${
                        animeContainer.expanded ? "show" : ""
                    }`}
                    style={
                        animeContainer.expanded
                            ? {
                                  display: "flex",
                                  justifyContent: "center",
                                  //   backgroundColor: "rgba(0, 178, 33, 0.7)",
                                  margin: "0",
                                  padding: "0",
                              }
                            : {}
                    }
                >
                    <SubBar
                        id={userContainerID}
                        animeContainer={
                            animeContainer as AnimeContainerSettings
                        }
                        updateSettings={handleAnimeContainerUpdate}
                        toggleOpen={() => {
                            handleAnimeContainerUpdate({
                                type: AnimeContainerActionType.ToggleSubBar,
                            });
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    position: "relative",
                    display: animeContainer.expanded
                        ? !rowCount
                            ? "block"
                            : "flex"
                        : "none",
                    alignItems: "center",
                    ...(!rowCount
                        ? { paddingTop: "10px", paddingBottom: "10px" }
                        : { padding: "10px" }),
                }}
                className={`collapse ${animeContainer.expanded ? "show" : ""}`}
            >
                {rowCount ? (
                    <Button
                        variant="outline-secondary"
                        onClick={() => scrollToItem("prev")}
                        style={{
                            height: "fit-content",
                            position: "absolute",
                            left: "10px",
                            zIndex: 1,
                            borderRadius: "50%",
                            ...(scrollPosition == 0
                                ? { opacity: 0, pointerEvents: "none" }
                                : {}),
                        }}
                        size="lg"
                    >
                        {"<"}
                    </Button>
                ) : null}

                <div
                    ref={containerRef}
                    onScroll={() => {
                        setScrollPosition(
                            containerRef.current?.scrollLeft || 0
                        );
                        const containerWidth =
                            containerRef.current?.clientWidth || 0;
                        const scrollWidth =
                            containerRef.current?.scrollWidth || 0;

                        console.log({
                            scrollPosition,
                            containerWidth,
                            scrollWidth,

                            isEnd:
                                scrollPosition + containerWidth >= scrollWidth,
                            val: `${
                                scrollPosition + containerWidth
                            } >= ${scrollWidth}`,
                        });
                        setEndOfScroll(
                            scrollPosition + containerWidth >= scrollWidth - 10
                        );
                    }}
                    style={{
                        position: "relative",
                        display: "flex",
                        gap: "10px",
                        paddingLeft: !rowCount ? "" : "10px",
                        paddingRight: !rowCount ? "" : "10px",
                        flexWrap: !rowCount ? "wrap" : "nowrap",
                        overflowX: !rowCount ? "hidden" : "auto",
                        justifyContent: !rowCount ? "center" : "flex-start",
                        scrollSnapType: "x mandatory",

                        scrollbarWidth: "none",
                    }}
                >
                    {animeContainer.items
                        .filter(
                            (anime: any) =>
                                !animeContainer.isSearching ||
                                anime.title
                                    .toLowerCase()
                                    .includes(
                                        animeContainer.searchText.toLowerCase()
                                    )
                        )
                        .map((anime: any, index: number) => {
                            return (
                                <div
                                    key={anime.localAnimeID}
                                    style={{ scrollSnapAlign: "center" }}
                                >
                                    <AnimeContainerCard
                                        anime={anime}
                                        onImageClickLink={`/local-anime/${anime.localAnimeID}`}
                                        onTitleClickLink={`/local-anime/${anime.localAnimeID}`}
                                        topLeftComponent={
                                            <AniListLogoLink
                                                aniListID={anime.aniListID}
                                            />
                                        }
                                        topRightComponent={
                                            <div>
                                                {anime.watchProgress
                                                    ? `${anime.watchProgress} / `
                                                    : ""}
                                                {anime.finalEpisode}{" "}
                                                {anime.watchStatus == "Planning"
                                                    ? " (P)"
                                                    : ""}
                                            </div>
                                        }
                                    />
                                </div>
                            );
                        })}
                </div>

                {rowCount ? (
                    // const containerWidth = containerRef.current?.clientWidth || 0;
                    // const scrollWidth = containerRef.current?.scrollWidth || 0;
                    // console.log({
                    //     scrollPosition,
                    //     containerWidth,
                    //     scrollWidth,
                    //     isEnd: scrollPosition + containerWidth >= scrollWidth,
                    // });
                    <Button
                        variant="outline-secondary"
                        onClick={() => scrollToItem("next")}
                        style={{
                            height: "fit-content",
                            position: "absolute",
                            right: "10px",
                            zIndex: 1,
                            borderRadius: "50%",
                            ...(endOfScroll
                                ? { opacity: 0, pointerEvents: "none" }
                                : {}),
                        }}
                        size="lg"
                    >
                        {">"}
                    </Button>
                ) : null}
            </div>
        </Container>
    );
}
