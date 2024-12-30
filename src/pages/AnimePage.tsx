/**
 * Anime Page:
 * -Retrieves Anime Data from API
 * -Displays Anime Data in Grid or List View
 */

import { AniListSortOptions } from "@data/constants";
import { linkedSeriesRef } from "@features/api/firebase";
import {
    DisplaySettingsActionType,
    DisplaySettingsContext,
    DisplaySettingsDispatchContext,
} from "@features/contexts/DisplaySettingsContext";
import TheUltimateDropdown from "@features/ui/TheUltimateDropdown";
import { faEllipsisH, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Container,
    Dropdown,
    ListGroup,
    ListGroupItem,
    ToggleButton,
} from "react-bootstrap";

interface SeriesLink {
    createdAt: number;
    updatedAt: number;
    baseSiteUrl?: string;
    seriesTitle: string;
    seriesInfoPage: string;
    watchPage: string;
    episode: string;
    seriesCoverImage: string;
    availableEpisodes: string;
    latestAvailableEpisodeSubtitle: string;
    lastCheckForNewEpisodes: number;
    seriesStatus: string;
    watchStatus: string;
    currentTime: {
        [episode: string]: number;
    };
}

interface LinkedSeriesObj {
    [siteBaseURL: string]: {
        seriesLinks: SeriesLink[];
    };
}
function AnimePage() {
    const [animeData, setAnimeData] = useState<SeriesLink[]>([]);
    const displaySettings = useContext(DisplaySettingsContext);
    const dispatchDisplaySettings = useContext(DisplaySettingsDispatchContext);

    useEffect(() => {
        // AniListAPI.performFetch(
        //     AniListQueries.getMedia({
        //         page: 1,
        //         perPage: 50,
        //     })
        // )
        //     .then(response => response.json())
        //     .then(jsonData => {
        //         setAnimeData(jsonData.data.Page.media);
        //     });
        // getDoc(linkedSeriesRef).then(doc => {
        //     if (doc.exists()) {
        //         var data = doc.data() as LinkedSeriesObj;
        //         var items: SeriesLink[] = Object.keys(data).reduce(
        //             (arr: SeriesLink[], key: string) => {
        //                 var seriesLinks: SeriesLink[] = data[key].seriesLinks;
        //                 return arr.concat(seriesLinks);
        //             },
        //             []
        //         );

        //         items.sort((a, b) => {
        //             const hasEpisodesA = a.availableEpisodes;
        //             const hasEpisodesB = b.availableEpisodes;

        //             if (hasEpisodesA && !hasEpisodesB) {
        //                 return -1;
        //             } else if (!hasEpisodesA && hasEpisodesB) {
        //                 return 1;
        //             }
        //             return (
        //                 (b.updatedAt || b.createdAt) -
        //                 (a.updatedAt || a.createdAt)
        //             );
        //         });

        //         setAnimeData(items);
        //     }
        // });

        if (dispatchDisplaySettings) {
            dispatchDisplaySettings({
                type: DisplaySettingsActionType.SetSortByOptions,
                payload: Object.keys(AniListSortOptions),
            });
        }
    }, []);

    useEffect(() => {
        console.log("Display Settings Changed");
    }, [displaySettings]);
    if (!displaySettings || !dispatchDisplaySettings) return null;
    if (
        !displaySettings.groupByOptions ||
        displaySettings.groupByOptions.length === 0
    ) {
        // dispatchDisplaySettings({
        //     type: DisplaySettingsActionType.,
        //     payload: ["None", "Season", "Year"],
        // });
    }

    // const statuses: string[] = Object.keys(
    //     animeData.reduce((acc: { [key: string]: boolean }, it: SeriesLink) => {
    //         if (it.seriesStatus) {
    //             acc[it.seriesStatus] = true;
    //         }
    //         return acc;
    //     }, {})
    // );

    const seriesStatusMapping: { [key: string]: { badgeColor: string } } = {
        Ongoing: {
            badgeColor: "primary",
        },
        Completed: {
            badgeColor: "success",
        },
    };
    const watchStatusesMapping: { [key: string]: { badgeColor: string } } = {
        Watching: {
            badgeColor: "primary",
        },
        Paused: {
            badgeColor: "secondary",
        },
        Stacking: {
            badgeColor: "info",
        },
        "Haitus / On Hold": {
            badgeColor: "warning",
        },
        Later: {
            badgeColor: "info",
        },
        Dropped: {
            badgeColor: "danger",
        },
        Completed: {
            badgeColor: "success",
        },
    };
    const watchStatuses = Object.keys(watchStatusesMapping);
    const animeInStatus = animeData.reduce(
        (acc: { [key: string]: SeriesLink[] }, it: SeriesLink) => {
            if (!it.watchStatus) {
                if (!acc["Watching"]) {
                    acc["Watching"] = [];
                }
                acc["Watching"].push(it);
            } else {
                if (!acc[it.watchStatus]) {
                    acc[it.watchStatus] = [];
                }
                acc[it.watchStatus].push(it);
            }
            return acc;
        },
        {}
    );
    const statuses = Object.keys(animeInStatus);
    statuses.sort((a, b) => {
        return watchStatuses.indexOf(a) - watchStatuses.indexOf(b);
    });

    // console.log(statuses);
    return (
        <Container className="pt-4 pb-3">
            {statuses.map((status, index) => {
                const animeDataInStatus = animeInStatus[status];

                return (
                    <>
                        {status != "Watching" && (
                            <h1>
                                {status} {animeDataInStatus.length}
                            </h1>
                        )}
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                            {animeDataInStatus.map((anime, index) => (
                                <div className="col" key={index + ""}>
                                    <div className="card h-100 border-0">
                                        <a
                                            href={
                                                (anime.baseSiteUrl || "") +
                                                anime.watchPage
                                            }
                                        >
                                            <img
                                                src={anime.seriesCoverImage}
                                                className="card-img-top"
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </a>
                                        <div className="card-body pt-1 pb-1 ps-2 pe-2">
                                            <small>
                                                <small>
                                                    <small>
                                                        <ListGroup className="h-100">
                                                            <ListGroupItem
                                                                className="border-top-0 border-start-0 border-end-0 d-flex pt-1 pb-1"
                                                                title={
                                                                    anime.seriesTitle
                                                                }
                                                            >
                                                                {anime.currentTime &&
                                                                    anime
                                                                        .currentTime[
                                                                        anime
                                                                            .episode
                                                                    ] && (
                                                                        <Badge
                                                                            className={`pb-1 pt-1 me-1`}
                                                                            bg={
                                                                                seriesStatusMapping[
                                                                                    anime
                                                                                        .seriesStatus
                                                                                ]
                                                                                    ? seriesStatusMapping[
                                                                                          anime
                                                                                              .seriesStatus
                                                                                      ]
                                                                                          .badgeColor
                                                                                    : "primary"
                                                                            }
                                                                        >
                                                                            {
                                                                                anime
                                                                                    .currentTime[
                                                                                    anime
                                                                                        .episode
                                                                                ]
                                                                            }
                                                                        </Badge>
                                                                    )}
                                                                <span className="me-auto">
                                                                    Episode{" "}
                                                                    {
                                                                        anime.episode
                                                                    }{" "}
                                                                </span>

                                                                <Badge
                                                                    className={`pb-1 pt-1`}
                                                                    bg={
                                                                        seriesStatusMapping[
                                                                            anime
                                                                                .seriesStatus
                                                                        ]
                                                                            ? seriesStatusMapping[
                                                                                  anime
                                                                                      .seriesStatus
                                                                              ]
                                                                                  .badgeColor
                                                                            : "primary"
                                                                    }
                                                                    title={
                                                                        anime.latestAvailableEpisodeSubtitle +
                                                                        " " +
                                                                        anime.seriesStatus
                                                                    }
                                                                >
                                                                    {
                                                                        anime.availableEpisodes
                                                                    }
                                                                </Badge>
                                                            </ListGroupItem>
                                                            <ListGroupItem
                                                                style={{
                                                                    flex: 1,
                                                                }}
                                                                className="border-start-0 border-end-0 border-bottom-0 d-flex align-items-center pt-1 pb-0"
                                                            >
                                                                <a
                                                                    href={
                                                                        (anime.baseSiteUrl ||
                                                                            "") +
                                                                        anime.seriesInfoPage
                                                                    }
                                                                    target="_blank"
                                                                    style={{
                                                                        // flexGrow: 1,
                                                                        color: "inherit",
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    {
                                                                        anime.seriesTitle
                                                                    }
                                                                </a>

                                                                <Dropdown
                                                                    className="ms-auto"
                                                                    title={new Date(
                                                                        anime.lastCheckForNewEpisodes ||
                                                                            0
                                                                    ).toLocaleDateString(
                                                                        "en-us",
                                                                        {
                                                                            weekday:
                                                                                "long",
                                                                            year: "numeric",
                                                                            month: "short",
                                                                            day: "numeric",
                                                                        }
                                                                    )}
                                                                >
                                                                    <Dropdown.Toggle bsPrefix="p-1 m-1"></Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item>
                                                                            Check
                                                                            for
                                                                            new
                                                                            Episodes
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Divider />
                                                                        <Dropdown.Item>
                                                                            Set
                                                                            Watch
                                                                            Status
                                                                            <div>
                                                                                <ButtonGroup
                                                                                    className="me-2"
                                                                                    aria-label="First group"
                                                                                >
                                                                                    {watchStatuses.map(
                                                                                        (
                                                                                            status,
                                                                                            index
                                                                                        ) => (
                                                                                            <Button
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                title={
                                                                                                    status
                                                                                                }
                                                                                                onClick={() => {
                                                                                                    fetch(
                                                                                                        "http://localhost:5555/api/animeTrack/updateSeries",
                                                                                                        {
                                                                                                            method: "POST",
                                                                                                            headers:
                                                                                                                {
                                                                                                                    "Content-Type":
                                                                                                                        "application/json",
                                                                                                                },
                                                                                                            body: JSON.stringify(
                                                                                                                {
                                                                                                                    seriesInfo:
                                                                                                                        {
                                                                                                                            seriesOrigin:
                                                                                                                                anime.baseSiteUrl,
                                                                                                                            seriesInfoPage:
                                                                                                                                anime.seriesInfoPage,
                                                                                                                        },
                                                                                                                    updatedSeries:
                                                                                                                        {
                                                                                                                            watchStatus:
                                                                                                                                status,
                                                                                                                        },
                                                                                                                    options:
                                                                                                                        {
                                                                                                                            allowNonConsecutiveUpdate:
                                                                                                                                true,
                                                                                                                        },
                                                                                                                }
                                                                                                            ),
                                                                                                        }
                                                                                                    )
                                                                                                        .then(
                                                                                                            response =>
                                                                                                                response.json()
                                                                                                        )
                                                                                                        .then(
                                                                                                            async data => {
                                                                                                                const copy =
                                                                                                                    [
                                                                                                                        ...animeData,
                                                                                                                    ];
                                                                                                                const index =
                                                                                                                    copy.findIndex(
                                                                                                                        it =>
                                                                                                                            it.seriesInfoPage ===
                                                                                                                            anime.seriesInfoPage
                                                                                                                    );
                                                                                                                copy[
                                                                                                                    index
                                                                                                                ].watchStatus =
                                                                                                                    status;
                                                                                                                setAnimeData(
                                                                                                                    copy
                                                                                                                );
                                                                                                                console.log(
                                                                                                                    data
                                                                                                                );
                                                                                                            }
                                                                                                        );
                                                                                                }}
                                                                                            >
                                                                                                {status.slice(
                                                                                                    0,
                                                                                                    1
                                                                                                )}
                                                                                            </Button>
                                                                                        )
                                                                                    )}
                                                                                </ButtonGroup>
                                                                            </div>
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Divider />
                                                                        <Dropdown.Item
                                                                            onClick={() => {
                                                                                console.log(
                                                                                    {
                                                                                        seriesOrigin:
                                                                                            anime.baseSiteUrl,
                                                                                        seriesInfoPage:
                                                                                            anime.seriesInfoPage,
                                                                                    }
                                                                                );
                                                                                const isOK =
                                                                                    window.confirm(
                                                                                        "Are you sure you want to delete this item?"
                                                                                    );
                                                                                if (
                                                                                    isOK
                                                                                ) {
                                                                                    fetch(
                                                                                        "http://localhost:5555/api/animeTrack/deleteSeries",
                                                                                        {
                                                                                            method: "POST",
                                                                                            headers:
                                                                                                {
                                                                                                    "Content-Type":
                                                                                                        "application/json",
                                                                                                },
                                                                                            body: JSON.stringify(
                                                                                                {
                                                                                                    seriesInfo:
                                                                                                        {
                                                                                                            seriesOrigin:
                                                                                                                anime.baseSiteUrl,
                                                                                                            seriesInfoPage:
                                                                                                                anime.seriesInfoPage,
                                                                                                        },
                                                                                                }
                                                                                            ),
                                                                                        }
                                                                                    )
                                                                                        .then(
                                                                                            response =>
                                                                                                response.json()
                                                                                        )
                                                                                        .then(
                                                                                            async data => {
                                                                                                console.log(
                                                                                                    data
                                                                                                );
                                                                                            }
                                                                                        );
                                                                                }
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </ListGroupItem>
                                                            {/* <ListGroupItem className="border-start-0 border-end-0 border-bottom-0 pt-0 pb-0">
                                                    <small>
                                                        <small>
                                                            {new Date(
                                                                anime.lastCheckForNewEpisodes ||
                                                                    0
                                                            ).toLocaleDateString(
                                                                "en-us",
                                                                {
                                                                    weekday:
                                                                        "long",
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </small>
                                                    </small>
                                                </ListGroupItem> */}
                                                        </ListGroup>
                                                    </small>
                                                </small>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                );
            })}
        </Container>
        // <Container className="pt-4 pb-3">
        //     {/* Example of Card Grid React Bootstrap (20 items) */}
        //     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        //         {animeData.map((anime) => (
        //             <div className="col" key={anime.id + ""}>
        //                 <div className="card">
        //                     <img
        //                         src={anime.coverImage?.extraLarge}
        //                         className="card-img-top"
        //                         style={{
        //                             width: "100%",
        //                             height: "300px",
        //                             objectFit: "cover",
        //                         }}
        //                         alt="..."
        //                     />
        //                     <div className="card-body">
        //                         <p
        //                             className="card-title"
        //                             style={{
        //                                 height: "60px",
        //                                 overflow: "hidden",
        //                             }}
        //                             title={
        //                                 anime.title?.romaji ||
        //                                 anime.title?.english
        //                             }
        //                         >
        //                             {anime.title?.romaji ||
        //                                 anime.title?.english}
        //                         </p>

        //                         <a
        //                             href={anime.siteUrl}
        //                             target="_blank"
        //                             className="btn btn-primary"
        //                         >
        //                             Go somewhere
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </Container>
    );
}

function CustomToggle() {
    return <FontAwesomeIcon icon={faEllipsisH} size="sm" className="ms-2" />;
}

export default AnimePage;
