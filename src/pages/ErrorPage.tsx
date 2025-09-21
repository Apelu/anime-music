import { getRandomNumber } from "../utils/constants";
import AniListAPI, { AniListQueries } from "@features/AniList/AniListAPI";
import HrWithName from "@ui/HrWithName";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";

interface NewSeries {
    imageUrl: string;
    title: string;
    aniListUrl: string;
}

function ErrorPage() {
    const PAGE_MAX = 75;
    const [data, setData] = useState<{
        isFetching: boolean;
        unfetchedPages: number[];
        fetchedSeries: NewSeries[];
        leftSeries?: NewSeries;
        rightSeries?: NewSeries;
        previousSeries: NewSeries[];
        viewIndex: number;
    }>({
        unfetchedPages: Array.from({ length: PAGE_MAX }, (_, i) => i + 1),
        isFetching: true,
        fetchedSeries: [],
        previousSeries: [],
        viewIndex: -1,
    });

    const { isFetching, fetchedSeries, leftSeries, rightSeries } = data;

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                showPreviousSeries(true);
            } else if (event.key === "ArrowRight") {
                showPreviousSeries(false);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === " ") {
                randomizeSeries();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [showPreviousSeries, randomizeSeries]);

    useEffect(() => {
        if (data.isFetching) {
            fetchSeriesData();
        } else if (!data.leftSeries && !data.rightSeries) {
            randomizeSeries();
        }
    }, [data]);

    function fetchSeriesData() {
        let randomPageIndex = getRandomNumber(0, 10);

        if (data.unfetchedPages.length < PAGE_MAX - 2) {
            randomPageIndex = getRandomNumber(
                0,
                data.unfetchedPages.length - 1
            );
        }

        var randomPageNumber = data.unfetchedPages[randomPageIndex];

        AniListAPI.performFetch(
            AniListQueries.getMedia({
                page: randomPageNumber,
                perPage: 50,
            })
        )
            .then(response => response.json())
            .then(jsonData => {
                console.log("Fetch");
                const media = jsonData?.data?.Page?.media;
                if (media) {
                    const fetchedSeries = media.map(
                        (series: {
                            coverImage: { extraLarge: string };
                            title: {
                                romaji: string;
                                english: string;
                            };
                            siteUrl: string;
                        }) => {
                            const animeSeries: NewSeries = {
                                imageUrl: series.coverImage.extraLarge,
                                title:
                                    series.title.romaji || series.title.english,
                                aniListUrl: series.siteUrl,
                            };
                            return animeSeries;
                        }
                    );

                    setData({
                        ...data,
                        isFetching: false,
                        fetchedSeries: [
                            ...data.fetchedSeries,
                            ...fetchedSeries,
                        ],
                        unfetchedPages: data.unfetchedPages.filter(
                            it => it !== randomPageNumber
                        ),
                    });
                }
            })
            .catch(error => {
                setData({
                    ...data,
                    isFetching: false,
                    fetchedSeries: [],
                });
                console.error("Error fetching image URLs:", error);
            });
    }

    function randomizeSeries() {
        if (data.isFetching) return;

        console.log("Rand");

        const randomIndex1 = getRandomNumber(0, data.fetchedSeries.length - 1);
        let randomIndex2 = getRandomNumber(0, data.fetchedSeries.length - 1);

        while (randomIndex1 === randomIndex2 && data.fetchedSeries.length > 1) {
            randomIndex2 = getRandomNumber(0, data.fetchedSeries.length - 1);
        }

        const leftSeries = { ...data.fetchedSeries[randomIndex1] };
        const rightSeries = { ...data.fetchedSeries[randomIndex2] };

        if (
            !leftSeries ||
            !rightSeries ||
            Object.keys(leftSeries).length == 0 ||
            Object.keys(rightSeries).length == 0
        )
            return;

        const remainingSeries = data.fetchedSeries.filter(
            (it, index) => index !== randomIndex1 && index !== randomIndex2
        );

        var newPreviousSeries = [
            ...data.previousSeries,
            leftSeries,
            rightSeries,
        ];

        const newData = {
            ...data,
            leftSeries: leftSeries,
            rightSeries: rightSeries,
            fetchedSeries: remainingSeries,
            previousSeries: newPreviousSeries,
            viewIndex: newPreviousSeries.length - 1,
        };

        if (!data.isFetching) {
            newData.isFetching = remainingSeries.length < 10;
        }

        setData(newData);
    }

    function showPreviousSeries(isLeftClick: boolean = true) {
        if (
            (isLeftClick && data.viewIndex < 2) ||
            (!isLeftClick && data.viewIndex >= data.previousSeries.length - 2)
        )
            return;

        const indexRight = data.viewIndex + (isLeftClick ? -2 : 2);
        const indexLeft = indexRight - 1;

        const leftSeries = { ...data.previousSeries[indexLeft] };
        const rightSeries = { ...data.previousSeries[indexRight] };

        console.log({ indexLeft, indexRight, leftSeries, rightSeries });

        const newData = {
            ...data,
            leftSeries: leftSeries,
            rightSeries: rightSeries,
            viewIndex: indexRight,
        };

        setData(newData);
    }

    return (
        <Container
            fluid
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "row",
            }}
            className="p-0 bg-info"
        >
            <SeriesImage animeSeries={leftSeries} />
            {/* {JSON.stringify({
                isFetching,
                fetchedSeries: fetchedSeries.length,
                leftSeries,
                rightSeries,
            })} */}

            <div style={{ flexGrow: 1 }} className="p-3">
                <HrWithName name={<Button disabled>Error 404</Button>} />
                <div className="text-center text-secondary">
                    <p className="p-0 m-0">
                        The page you are looking for does not exist.
                    </p>
                    {leftSeries && rightSeries && (
                        <p className="p-0 m-0 ">
                            But hey, at least you found some anime
                        </p>
                    )}
                </div>

                <HrWithName name={<Button href={"/"}>Return to Home</Button>} />

                {leftSeries && rightSeries && (
                    <>
                        <HrWithName
                            name={
                                <Button
                                    size="lg"
                                    onClick={randomizeSeries}
                                    variant="outline-secondary"
                                >
                                    Randomize Series
                                </Button>
                            }
                        />

                        <HrWithName
                            name={
                                <ButtonGroup>
                                    {data.viewIndex > 1 && (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                showPreviousSeries(true)
                                            }
                                            variant="outline-primary"
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                            />
                                        </Button>
                                    )}
                                    <Button disabled>
                                        {parseInt(data.viewIndex / 2 + "") + 1}
                                    </Button>
                                    {data.viewIndex <
                                        data.previousSeries.length - 1 && (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                showPreviousSeries(false)
                                            }
                                            variant="outline-primary"
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                            />
                                        </Button>
                                    )}
                                </ButtonGroup>
                            }
                        />
                        <SeriesDetails animeSeries={leftSeries} alignLeft />
                        <HrWithName name="" />
                        <SeriesDetails animeSeries={rightSeries} />
                    </>
                )}
            </div>

            <SeriesImage animeSeries={rightSeries} />
        </Container>
    );
}

function SeriesDetails({
    animeSeries,
    alignLeft,
}: {
    animeSeries: NewSeries;
    alignLeft?: boolean;
}) {
    if (!animeSeries) return null;

    return (
        <>
            <div className="d-flex align-items-center justify-items-center text-secondary">
                <span
                    className={!alignLeft ? "ms-auto" : ""}
                    title={animeSeries.title}
                >
                    {animeSeries.title}
                </span>
            </div>

            <div className="d-flex">
                <Button
                    size="sm"
                    className={alignLeft ? "" : "ms-auto"}
                    target="_blank"
                    href={animeSeries.aniListUrl}
                >
                    View in AniList
                </Button>
            </div>
        </>
    );
}

function SeriesImage({ animeSeries }: { animeSeries?: NewSeries | null }) {
    if (!animeSeries) return null;
    return (
        <img
            src={animeSeries.imageUrl}
            style={{
                height: "100vh",
                maxWidth: "40vw",
                width: "fit-content",
                objectFit: "cover",
            }}
        />
    );
}

/**
 * Things to fix:
 * - Title restricted by length but not to being a single line
 * - Image width is not consistent
 */

export default ErrorPage;
