import {
    ModalActionType,
    useSetShowingModalDispatch,
} from "@features/contexts/ModalContext";
import { useUserData } from "@features/contexts/UserContext";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import MyLocalServer from "@shared/MyLocalServer";
import { UserContainer } from "@shared/serverCalls/PullLocalUserAnimeContainers";
import AniListLogoLink from "../Global/AniListLogoLink";
import { AnimeContainerCard } from "./LocalAnimeContainerCard";
import CreateNewLocalUserAnimeContainer from "@shared/serverCalls/CreateNewLocalUserAnimeContainer";
import UpdateLocalUserAnimeContainer from "@shared/serverCalls/UpdateLocalUserAnimeContainer";

// TODO: Live updates / Sorting / Refactoring
export function LocalUserAnimeContainer({
    userContainer,
}: {
    userContainer: UserContainer;
}) {
    const user = useUserData();
    const setShowingModal = useSetShowingModalDispatch();

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerContent, setContainerContent] = useState({
        container: {
            name: "",
            expanded: false,
        },
        items: [],
    });

    const [rowCount, setRowCount] = useState<number | null>(null);

    function pullData() {
        MyLocalServer.getUserAnimeContainer(user.id, userContainer.id)
            .then(res => res.json())
            .then(data => {
                console.log({ data });
                setContainerContent({
                    ...data,
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        pullData();
    }, []);

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
                style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "0",
                    zIndex: 1,
                }}
            >
                <h2
                    className="bg-primary p-2 mb-0 hover-trigger"
                    onClick={() => {
                        new UpdateLocalUserAnimeContainer().fetch({
                            userID: user.id,
                            updatedContainer: {
                                id: userContainer.id,
                                userID: user.id,
                                name: userContainer.name,
                                filters: userContainer.filters,
                                expanded: !containerContent.container.expanded,
                                sortBy: "",
                                sortOrder: "desc",
                            },
                        });

                        setContainerContent({
                            ...containerContent,
                            container: {
                                ...containerContent.container,
                                expanded: !containerContent.container.expanded,
                            },
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
                            setShowingModal({
                                type: ModalActionType.UpdateContainer,
                                payload: {
                                    containerID: userContainer.id,
                                },
                            });
                        }}
                    />
                    {containerContent.container.name}{" "}
                    <Badge bg="info" className="p-1">
                        <small>{containerContent.items.length}</small>
                    </Badge>
                </h2>
                <div
                    className={`collapse ${
                        containerContent.container.expanded ? "show" : ""
                    }`}
                    style={
                        containerContent.container.expanded
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
                    {/* <SubBar
                        currentItemIndex={0}
                        nextBackgroundItem={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        previousBackgroundItem={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                    /> */}
                    {/* TODO: Add Anime Container Settings (Sort, Filter, View Type, Keyword Search) */}
                    [Sort By] + [Sort Order] | [
                    <span onClick={() => setRowCount(null)}>
                        Infinite Rows |
                    </span>
                    <span onClick={() => setRowCount(1)}>| 1 Row]</span>
                </div>
            </div>
            <div
                style={{
                    position: "relative",
                    display: containerContent.container.expanded
                        ? "flex"
                        : "none",
                    alignItems: "center",
                    ...(!rowCount
                        ? { paddingTop: "10px", paddingBottom: "10px" }
                        : { padding: "10px" }),
                }}
                className={`collapse ${
                    containerContent.container.expanded ? "show" : ""
                }`}
            >
                {rowCount && (
                    <Button
                        variant="outline-secondary"
                        onClick={() => scrollToItem("prev")}
                        style={{
                            height: "fit-content",
                            position: "absolute",
                            left: "10px",
                            zIndex: 1,
                            borderRadius: "50%",
                        }}
                        size="lg"
                    >
                        {"<"}
                    </Button>
                )}

                <div
                    ref={containerRef}
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
                    {containerContent.items.map((anime: any, index: number) => {
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

                {rowCount && (
                    <Button
                        variant="outline-secondary"
                        onClick={() => scrollToItem("next")}
                        style={{
                            height: "fit-content",
                            position: "absolute",
                            right: "10px",
                            zIndex: 1,
                            borderRadius: "50%",
                        }}
                        size="lg"
                    >
                        {">"}
                    </Button>
                )}
            </div>
        </Container>
    );
}
