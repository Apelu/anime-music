import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import HrWithName from "@features/ui/HrWithName";

interface AnimeSeries {
    id: string;
    title: string;
    coverImage: string;
}

function getShortTitle(title: string, maxLength = 40) {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

enum Side {
    left = "left",
    right = "right",
}

interface AnimeSeriesPair {
    [Side.left]: AnimeSeries;
    [Side.right]: AnimeSeries;
}

function ErrorPage() {
    const [imageUrls, setImageUrls] = useState<AnimeSeries[]>([]);
    const [animeSeries, setAnimeSeries] = useState<AnimeSeriesPair | null>(
        null
    );

    function pullMoreUrls() {
        const randomPage = Math.floor(Math.random() * 50) + 1;
        fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `
                    query {
                        Page(page: ${randomPage}, perPage: 50) {
                            media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
                                id
                                title {
                                    romaji
                                    english
                                }
                                bannerImage
                                coverImage {
                                    extraLarge
                                }
                            }
                        }
                    }
                `,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const media = data?.data?.Page?.media;
                if (media) {
                    console.log("Fetched media:", media);
                    const urls = media.map(
                        (m: {
                            id: string;
                            coverImage: { extraLarge: string };
                            bannerImage: string;
                            title: {
                                romaji: string;
                                english: string;
                            };
                        }) => {
                            const animeSeries: AnimeSeries = {
                                id: m.id,
                                title: m.title.romaji || m.title.english,
                                coverImage: m.coverImage.extraLarge,
                            };
                            return animeSeries;
                        }
                    );
                    setImageUrls(urls);
                }
            })
            .catch(error => {
                console.error("Error fetching image URLs:", error);
            });
    }
    useEffect(() => {
        pullMoreUrls();
    }, []);

    useEffect(() => {
        if (imageUrls.length > 0 && animeSeries === null) {
            handleClick();
        }
    }, [imageUrls]);

    const handleClick = () => {
        const randomIndex1 = Math.floor(Math.random() * imageUrls.length);
        let randomIndex2 = Math.floor(Math.random() * imageUrls.length);

        while (randomIndex1 === randomIndex2) {
            randomIndex2 = Math.floor(Math.random() * imageUrls.length);
        }
        setAnimeSeries({
            left: imageUrls[randomIndex1],
            right: imageUrls[randomIndex2],
        });

        const newImageUrls = [...imageUrls];
        newImageUrls.splice(randomIndex1, 1);
        newImageUrls.splice(randomIndex2, 1);
        setImageUrls(newImageUrls);

        if (imageUrls.length <= 10) {
            pullMoreUrls();
        }
    };

    return (
        <Container
            fluid
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "row",
            }}
            className="p-0"
        >
            <SeriesImage animeSeries={animeSeries} side={Side.left} />

            <div style={{ flexGrow: 1 }} className="p-3 bg-info">
                <HrWithName name={<Button disabled>Error 404</Button>} />
                <div className="text-center text-secondary">
                    <p className="p-0 m-0">
                        The page you are looking for does not exist.
                    </p>
                    {animeSeries && (
                        <p className="p-0 m-0">
                            But hey, at least you found some anime
                        </p>
                    )}
                </div>

                <SeriesDetails
                    animeSeries={animeSeries}
                    side={Side.left}
                    handleClick={handleClick}
                />
                <SeriesDetails
                    animeSeries={animeSeries}
                    side={Side.right}
                    handleClick={handleClick}
                />
            </div>

            <SeriesImage animeSeries={animeSeries} side={Side.right} />
        </Container>
    );
}

function SeriesDetails({
    animeSeries,
    side,
    handleClick,
}: {
    animeSeries: AnimeSeriesPair | null;
    side: Side;
    handleClick: () => void;
}) {
    if (!animeSeries) return null;

    const isLeft = side === Side.left;
    const series = animeSeries[side];
    return (
        <>
            <HrWithName
                name={
                    side == Side.right ? (
                        <Button
                            size="sm"
                            onClick={handleClick}
                            variant="outline-secondary"
                        >
                            Randomize Series
                        </Button>
                    ) : (
                        <Button href={"/"}>Return to Home</Button>
                    )
                }
            />

            <div className="d-flex align-items-center">
                {isLeft && (
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size="lg"
                        className={"me-2"}
                    />
                )}
                <span className={!isLeft ? "ms-auto" : ""} title={series.title}>
                    {getShortTitle(series.title)}
                </span>
                {!isLeft && (
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        size="lg"
                        className={"ms-2"}
                    />
                )}
            </div>
            <div className="d-flex">
                <Button
                    size="sm"
                    className={isLeft ? "mt-2" : "ms-auto mt-2"}
                    target="_blank"
                    href={"https://anilist.co/anime/" + series.id}
                >
                    Open AniList
                </Button>
            </div>
        </>
    );
}

function SeriesImage({
    animeSeries,
    side,
}: {
    animeSeries: AnimeSeriesPair | null;
    side: Side;
}) {
    if (!animeSeries) return null;
    return (
        <img
            src={animeSeries?.[side].coverImage}
            style={{
                height: "100vh",
                maxWidth: "40vw",
                width: "fit-content",
                objectFit: "contain",
            }}
        />
    );
}

/**
 * Things to fix:
 * - Title restricted by length but not to being a single line
 * - Images are repeating when they shouldn't
 * - Image width is not consistent
 */

export default ErrorPage;
