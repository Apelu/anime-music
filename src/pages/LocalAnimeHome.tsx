import { MyLocalServer } from "@features/api/server";
import { useUserData } from "@features/contexts/UserContext";
import { AnimeCard } from "@features/offline-anime/OfflineAnimeV2";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LocalAnimeHome() {
    const user = useUserData();

    const [userContainers, setUserContainers] = useState<any[]>([]);
    const [modalData, setModalData] = useState({
        isShowing: false,
        data: {
            containerName: "",
            containerFilters: JSON.stringify(
                [
                    {
                        tableName: "localUserAnime",
                        fieldName: "status",
                        operation: "matchesOneOf",
                        matchesOneOf: ["Watching"],
                    },
                ],
                null,
                2
            ),
        },
        type: "create" as "create" | "edit",
    });

    function handleShowModal(isShowing: boolean, type: "create" | "edit") {
        setModalData({
            ...modalData,
            isShowing,
            type,
        });
    }

    useEffect(() => {
        MyLocalServer.pullUserAnimeLists(user.id)
            .then(res => res.json())
            .then(data => {
                console.log({ data });
                setUserContainers(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function handleModalSubmit() {
        const { containerName, containerFilters } = modalData.data;

        if (modalData.type === "create") {
            MyLocalServer.createAnimeContainer(user.id, {
                name: containerName,
                filters: containerFilters,
            })
                .then(res => res.json())
                .then(data => {
                    console.log({ data });
                    // setUserContainers([...userContainers, data]);
                    // reload
                    window.location.reload();
                })
                .catch(err => {
                    alert("err");
                    console.error(err);
                });
        }
    }

    // TODO: GET User Lists (Continue Watching, ...)

    // TODO: Pull Data For Each List
    return (
        <Container>
            {userContainers.map((container, index) => {
                return (
                    <AnimeContainer container={container} key={container.id} />
                );
            })}
            <Button onClick={() => handleShowModal(true, "create")}>
                Create new Container
            </Button>

            <CreateContainerModal
                modalData={modalData}
                setModalData={setModalData}
                handleModalSubmit={handleModalSubmit}
            />
        </Container>
    );
}

function CreateContainerModal({
    modalData,
    setModalData,
    handleModalSubmit,
}: {
    modalData: any;
    setModalData: any;
    handleModalSubmit: any;
}) {
    const { isShowing, type } = modalData;

    function handleDataChange(event: any) {
        const { name, value } = event.target;
        setModalData({
            ...modalData,
            data: {
                ...modalData.data,
                [name]: value,
            },
        });
    }

    return (
        <Modal
            show={isShowing}
            onHide={() => setModalData({ ...modalData, isShowing: false })}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {type === "create" ? "Create New" : "Edit"} Container
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="containerName">
                        <Form.Label>Container Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="containerName"
                            placeholder="Enter container name"
                            onChange={handleDataChange}
                            value={modalData.data.containerName}
                        />
                    </Form.Group>
                    <Form.Group controlId="containerFilters">
                        <Form.Label>Filters (JSON)</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="containerFilters"
                            placeholder='{"key": "value"}'
                            rows={6}
                            onChange={handleDataChange}
                            value={modalData.data.containerFilters}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() =>
                        setModalData({ ...modalData, isShowing: false })
                    }
                >
                    Close
                </Button>
                <Button variant="primary" onClick={handleModalSubmit}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function AnimeContainer({ container }: { container: any }) {
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

                        /**
                         * onImageClickLink={`${seriesInfoLink}${
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
                         */
                    })}
                </div>
            </div>
        </Container>
    );
}

interface AnimeContainerItemData {
    localAnimeID: string;
    aniListID: number;
    title: string;
    coverImage: string;
    folderPath: string;
    finalEpisode: number;
    watchProgress: number | null;
}

interface AnimeContainerCardProps {
    anime: AnimeContainerItemData;
    imageSrc?: string;
    onImageClickLink?: string;
    onImageClickFunction?: (event: any) => void;
    imageHeight?: string;
    imageWidth?: string;
    onTitleClickLink?: string;
    topLeftComponent?: string | JSX.Element | null;
    topRightComponent?: string | JSX.Element;
    bottomComponent?: string | JSX.Element;
}

function AnimeContainerCard(props: AnimeContainerCardProps) {
    const {
        anime,
        imageHeight,
        imageWidth,
        onImageClickLink,
        onImageClickFunction,
        onTitleClickLink,
        topLeftComponent,
        topRightComponent,
        bottomComponent,
    } = props;

    return (
        <div>
            <div
                style={{
                    position: "relative",
                    display: "inline-block",
                    width: imageWidth || "200px",
                    height: imageHeight || "300px",
                    border: "1px solid black",
                    marginTop: "10px",
                    marginRight: "10px",
                    borderRadius: bottomComponent ? "5px 5px 0 0" : "5px",
                }}
            >
                <>
                    {/* Link */}
                    <Link to={onImageClickLink || ""}>
                        {/* <a href={onImageClickLink} > */}
                        <img
                            loading="lazy"
                            onClick={
                                onImageClickFunction
                                    ? onImageClickFunction
                                    : undefined
                            }
                            src={anime.coverImage}
                            alt={
                                "If this image is not loading, this anime is on a disconnected source"
                            }
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: bottomComponent
                                    ? "5px 5px 0 0"
                                    : "5px",
                            }}
                        />
                    </Link>
                    {/* </a> */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            borderRadius: "5px",
                            padding: "3px",
                            paddingTop: "0",
                            margin: "5px",
                            textAlign: "center",
                            fontSize: "12px",
                        }}
                    >
                        <Link
                            to={onTitleClickLink || ""}
                            style={{
                                color: "inherit",
                                textDecoration: "inherit",
                            }}
                        >
                            {/* <a
                            <a
                                href={onTitleClickLink}
                                target="_blank"
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >*/}
                            {anime.title}
                        </Link>
                        {/* </a> */}
                    </div>
                </>

                {topLeftComponent && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            borderRadius: "5px",
                            padding: "3px",
                            paddingTop: "0",
                            margin: "5px",
                        }}
                    >
                        {topLeftComponent}
                    </div>
                )}

                {topRightComponent && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            borderRadius: "5px",
                            padding: "3px",
                            paddingTop: "0",
                            margin: "5px",
                        }}
                    >
                        {topRightComponent}
                    </div>
                )}
            </div>
            {/* Bottom Commonet under imag */}
            {bottomComponent && (
                <div
                    style={{
                        width: "200px",
                        textAlign: "center",
                        // background: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {bottomComponent}
                </div>
            )}
        </div>
    );
}
