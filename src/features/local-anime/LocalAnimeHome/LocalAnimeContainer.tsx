import {
    ModalActionType,
    useSetShowingModalDispatch,
} from "@features/contexts/ModalContext";
import { useUserData } from "@features/contexts/UserContext";
import MyLocalServer from "@features/server/MyLocalServer";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import { AnimeContainerCard } from "./LocalAnimeContainerCard";

// TODO: Live updates
export function AnimeContainer({ container }: { container: any }) {
    const user = useUserData();
    const setShowingModal = useSetShowingModalDispatch();

    const [data, setData] = useState({
        container: {
            name: "",
            expanded: false,
        },
        items: [],
    });
    const [rowCount, setRowCount] = useState<number | null>(null);

    function pullData() {
        MyLocalServer.pullUserAnimeList(user.id, container.id)
            .then(res => res.json())
            .then(data => {
                console.log({ data });
                setData({
                    ...data,
                    ...{
                        container: {
                            ...data.container,
                            expanded: true,
                        },
                    },
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        pullData();
    }, []);

    // Set page title
    useEffect(() => {
        document.title = `Local Anime - ${container.name}`;
    }, [container.name]);

    const containerRef = useRef<HTMLDivElement>(null);

    function scrollToItem(type: "prev" | "next") {
        const container = containerRef.current;
        if (!container) {
            console.error("Container not found");
            return;
        }

        const scrollAmount =
            container.clientWidth * (container.clientWidth > 600 ? 0.8 : 0.1);

        console.log({ clientWidth: container.clientWidth, scrollAmount });
        container.scrollBy({
            left: type === "prev" ? -scrollAmount : scrollAmount,
            behavior: "auto",
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
                        setData({
                            ...data,
                            container: {
                                ...data.container,
                                expanded: !data.container.expanded,
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
                                    containerId: container.id,
                                },
                            });
                        }}
                    />
                    {data.container.name}{" "}
                    <Badge bg="info" className="p-1">
                        <small>{data.items.length}</small>
                    </Badge>
                </h2>
                <div
                    className={`collapse ${
                        data.container.expanded ? "show" : ""
                    }`}
                    style={
                        data.container.expanded
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
                    display: data.container.expanded ? "flex" : "none",
                    alignItems: "center",
                    ...(!rowCount
                        ? { paddingTop: "10px", paddingBottom: "10px" }
                        : { padding: "10px" }),
                }}
                className={`collapse ${data.container.expanded ? "show" : ""}`}
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
                        // marginLeft: !rowCount ? "" : "10px",
                        // marginRight: !rowCount ? "" : "10px",
                        flexWrap: !rowCount ? "wrap" : "nowrap",
                        overflowX: !rowCount ? "hidden" : "auto",
                        justifyContent: !rowCount ? "center" : "flex-start",
                        // backgroundColor: "rgba(0, 0, 0, 0.5)",
                        scrollSnapType: "x mandatory",

                        scrollbarWidth: "none",
                    }}
                >
                    {data.items.map((anime: any, index: number) => {
                        return (
                            <div style={{ scrollSnapAlign: "center" }}>
                                <AnimeContainerCard
                                    // marginTop={!rowCount ? undefined : "0px"}
                                    key={index}
                                    anime={anime}
                                    onImageClickLink={`/local-anime/${anime.localAnimeID}`}
                                    onTitleClickLink={`/local-anime/${anime.localAnimeID}`}
                                    // TODO: Make Template for topLeft is AniList Link
                                    topLeftComponent={
                                        <span>
                                            <a
                                                href={`https://anilist.co/anime/${anime.aniListID}`}
                                                target="_blank"
                                            >
                                                <img
                                                    loading="lazy"
                                                    src={
                                                        "https://anilist.co/img/logo_al.png"
                                                    }
                                                    alt="?"
                                                    style={{ width: "20px" }}
                                                />
                                            </a>
                                        </span>
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
