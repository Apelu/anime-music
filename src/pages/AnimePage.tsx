/**
 * Anime Page:
 * -Retrieves Anime Data from API
 * -Displays Anime Data in Grid or List View
 */

import AniListAPI, {
    AniListQueries,
    Anime,
} from "@features/api/anilist/AniListAPI";
import { linkedSeriesRef } from "@features/api/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Container, Dropdown, DropdownDivider } from "react-bootstrap";

interface SeriesLink {
    createdAt: number;
    baseSiteUrl?: string;
    seriesTitle: string;
    seriesInfoPage: string;
    watchPage: string;
    episode: string;
    seriesCoverImage: string;
}

interface LinkedSeriesObj {
    [siteBaseURL: string]: {
        seriesLinks: SeriesLink[];
    };
}
function AnimePage() {
    const [animeData, setAnimeData] = useState<SeriesLink[]>([]);

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
                    return b.createdAt - a.createdAt;
                });

                setAnimeData(items);
            }
        });
    }, []);

    return (
        <Container className="pt-4 pb-3">
            {/* Example of Card Grid React Bootstrap (20 items) */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {animeData.map((anime, index) => (
                    <div className="col" key={index + ""}>
                        <div className="card h-100">
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
                            <div className="card-body">
                                <p
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
                                    <div>Episode {anime.episode}</div>
                                    <hr></hr>
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
                                        {anime.seriesTitle}
                                    </a>
                                </p>
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

export default AnimePage;
