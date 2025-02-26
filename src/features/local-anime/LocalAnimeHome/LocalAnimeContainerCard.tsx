import { Link } from "react-router-dom";

export interface AnimeContainerItemData {
    localAnimeID: string;
    aniListID: number;
    title: string;
    coverImage: string;
    folderPath: string;
    finalEpisode: number;
    watchProgress: number | null;
}

export interface AnimeContainerCardProps {
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

export function AnimeContainerCard(props: AnimeContainerCardProps) {
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
                    <Link to={onImageClickLink || ""}>
                        <img
                            loading="lazy"
                            onClick={
                                onImageClickFunction
                                    ? onImageClickFunction
                                    : undefined
                            }
                            src={anime.coverImage}
                            alt={"Offline image missing"}
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
                            {anime.title}
                        </Link>
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

            {/* Bottom Component under image */}
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
