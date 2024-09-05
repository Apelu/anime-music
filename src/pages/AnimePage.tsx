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
import { Badge, Container, Dropdown } from "react-bootstrap";

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
        getDoc(linkedSeriesRef).then(doc => {
            if (doc.exists()) {
                var data = doc.data() as LinkedSeriesObj;
                var items: SeriesLink[] = Object.keys(data).reduce(
                    (arr: SeriesLink[], key: string) => {
                        var seriesLinks: SeriesLink[] = data[key].seriesLinks;
                        return arr.concat(seriesLinks);
                    },
                    []
                );

                items.sort((a, b) => {
                    return (
                        (b.updatedAt || b.createdAt) -
                        (a.updatedAt || a.createdAt)
                    );
                });

                setAnimeData(items);
            }
        });

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

    return (
        <Container className="pt-4 pb-3">
            {/* Example of Card Grid React Bootstrap (20 items) */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {animeData.map((anime, index) => (
                    <div className="col" key={index + ""}>
                        <div className="card h-100 border-0">
                            <a
                                href={
                                    (anime.baseSiteUrl || "") + anime.watchPage
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
                                <div
                                    className="card-title p-0 m-0"
                                    // d-flex flex-column"
                                    style={
                                        {
                                            // height: "60px",
                                            // overflow: "hidden",
                                        }
                                    }
                                    title={anime.seriesTitle}
                                >
                                    <small
                                        className="me-1"
                                        title={
                                            anime.latestAvailableEpisodeSubtitle
                                        }
                                    >
                                        <small>Episode {anime.episode}</small>
                                    </small>

                                    {anime.availableEpisodes ? (
                                        <small>
                                            <small>
                                                <Badge
                                                    title={
                                                        anime.latestAvailableEpisodeSubtitle
                                                    }
                                                >
                                                    {anime.availableEpisodes}
                                                </Badge>
                                            </small>
                                        </small>
                                    ) : null}

                                    <hr className="mt-1 mb-1"></hr>
                                    <div className="d-flex align-items-center">
                                        <a
                                            href={
                                                (anime.baseSiteUrl || "") +
                                                anime.seriesInfoPage
                                            }
                                            target="_blank"
                                            style={{
                                                // flexGrow: 1,
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <small>
                                                <small>
                                                    {anime.seriesTitle}
                                                </small>
                                            </small>
                                        </a>
                                        <Dropdown className="ms-auto">
                                            <Dropdown.Toggle bsPrefix="p-1 m-1"></Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    Check for new Episodes
                                                </Dropdown.Item>
                                                <Dropdown.Item></Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        console.log({
                                                            seriesOrigin:
                                                                anime.baseSiteUrl,
                                                            seriesInfoPage:
                                                                anime.seriesInfoPage,
                                                        });
                                                        const isOK =
                                                            window.confirm(
                                                                "Are you sure you want to delete this item?"
                                                            );
                                                        if (isOK) {
                                                            fetch(
                                                                "http://localhost:5555/api/animeTrack/deleteSeries",
                                                                {
                                                                    method: "POST",
                                                                    headers: {
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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
