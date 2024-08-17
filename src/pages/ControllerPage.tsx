import { linkedSeriesRef } from "@features/api/firebase";
import { setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { Map } from "typescript";

function ControllerPage() {
    interface SeriesLink {
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
    const [linkedSeriesObj, setLinkedSeriesObj] = useState<LinkedSeriesObj>({});
    function addSeriesLink(siteBaseURL: string, newSeriesLink: SeriesLink) {
        var copy = { ...linkedSeriesObj };
        if (copy[siteBaseURL] === undefined) {
            copy[siteBaseURL] = {
                seriesLinks: [],
            };
        }

        if (
            !copy[siteBaseURL].seriesLinks.find(
                it => it.seriesInfoPage === newSeriesLink.seriesInfoPage
            )
        ) {
            copy[siteBaseURL].seriesLinks.push(newSeriesLink);
        }
        setLinkedSeriesObj(copy);
    }
    useEffect(() => {
        if (Object.keys(linkedSeriesObj).length === 0) {
            addSeriesLink("https://gogoanime3.co", {
                seriesTitle: "I Can Strike Infinitely",
                seriesInfoPage: "/i-can-strike-infinitely/",
                watchPage:
                    "/i-can-strike-infinitely-episode-27-subtitles-english-indonesian/",
                episode: "27",
                seriesCoverImage:
                    "https://animekhor.xyz/wp-content/uploads/2023/12/I-Can-Strike-Infinitely-Subbed.webp",
            });
        }

        console.log("Linked Series Object: ", linkedSeriesObj);
        // setDoc(linkedSeriesRef, linkedSeriesObj);
    }, [linkedSeriesObj]);

    return (
        <Container className="text-dark">
            <h1 className="text-light">Link Site Series</h1>
            <FloatingLabel label="Site (Base URL)" className="mb-3">
                <Form.Control type="text" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel label="Series Title" className="mb-3">
                <Form.Control type="text" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel label="Series Info Page" className="mb-3">
                <Form.Control type="text" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel label="Series Watch Page" className="mb-3">
                <Form.Control type="text" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel label="Series Title" className="mb-3">
                <Form.Control type="text" placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel
                label="Series Cover Image (Override)"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="name@example.com" />
            </FloatingLabel>
        </Container>
    );
}
var obj = {
    "https://gogoanime3.co": {
        seriesInfoPage:
            "https://gogoanime3.co/category/hazurewaku-no-joutai-ijou-skill-de-saikyou-ni-natta-ore-ga-subete-wo-juurin-suru-made",
        watchPage:
            "https://gogoanime3.co/hazurewaku-no-joutai-ijou-skill-de-saikyou-ni-natta-ore-ga-subete-wo-juurin-suru-made-episode-5",
    },
    lastWatchedOnPage:
        "https://gogoanime3.co/hazurewaku-no-joutai-ijou-skill-de-saikyou-ni-natta-ore-ga-subete-wo-juurin-suru-made-episode-5",
};

/**
 * Linked Series DB Firestore structure:
 * Top-Collection WatchSiteLinks
 * - Document: Site URL
 *
 *
 */

var documentMap = {
    "https://animekhor.xyz/": {
        seriesLinks: [
            {
                seriesTitle: "I Can Strike Infinitely",
                seriesInfoPage: "/i-can-strike-infinitely/",
                watchPage:
                    "/i-can-strike-infinitely-episode-27-subtitles-english-indonesian/",
                episode: "27",
                seriesCoverImage:
                    "https://animekhor.xyz/wp-content/uploads/2023/12/I-Can-Strike-Infinitely-Subbed.webp",
            },
            {
                seriesTitle: "Series Title2",
                seriesInfoPage: "<Relative Path>",
                watchPage: "<Relative Path>",
                episode: "String",
                seriesCoverImage: "Series Cover Image (Override)2",
            },
        ],
    },
    "https://gogoanime3.co/": {
        seriesLinks: [
            {
                seriesTitle: "Qi Jie Diyi Xian",
                seriesInfoPage: "/category/qi-jie-diyi-xian",
                watchPage: "/qi-jie-diyi-xian-episode-117",
                episode: "117",
                seriesCoverImage:
                    "https://gogocdn.net/cover/qi-jie-diyi-xian.png",
            },
        ],
    },
};

function mergeDocumentMap() {}

export default ControllerPage;
