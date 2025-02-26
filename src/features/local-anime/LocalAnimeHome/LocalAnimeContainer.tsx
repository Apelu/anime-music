import { useUserData } from "@features/contexts/UserContext";
import MyLocalServer from "@features/server/MyLocalServer";
import { useEffect, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import { AnimeContainerCard } from "./LocalAnimeContainerCard";
import { ShowUpdateModalContainerButton } from "./Modal/UpdateModalContainerModal";

export function AnimeContainer({
    container,
    showingModal,
    setShowingModal,
}: {
    container: any;
    showingModal: any;
    setShowingModal: any;
}) {
    const user = useUserData();

    const [data, setData] = useState({
        container: {
            name: "",
            expanded: false,
        },
        items: [],
    });
    function pullData() {
        MyLocalServer.pullUserAnimeList(user.id, container.id)
            .then(res => res.json())
            .then(data => {
                console.log({ data });
                setData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        pullData();
    }, []);
    // Pull Data based on container settings

    return (
        <Container
            fluid
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                margin: 0,
                padding: 0,
            }}
        >
            <h2
                className="bg-primary p-2"
                style={{ textAlign: "center" }}
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
                {data.container.name}{" "}
                <Badge bg="info">{data.items.length}</Badge>
            </h2>

            <div
                onClick={e => {
                    e.stopPropagation();
                }}
                className={`collapse ${data.container.expanded ? "show" : ""}`}
            >
                <ShowUpdateModalContainerButton
                    showingModal={showingModal}
                    setShowingModal={setShowingModal}
                    container={container}
                />

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "10px",
                        margin: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {data.items.map((anime: any, index: number) => {
                        return (
                            <AnimeContainerCard
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
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}
