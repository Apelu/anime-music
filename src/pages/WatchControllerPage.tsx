import {
    faForward,
    faBackwardStep,
    faPlay,
    faPause,
    faForwardStep,
    faCircleCheck,
    faBackward,
    faBars,
    fa0,
    faRefresh,
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ServerCalls } from "../features/ServerCalls";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface PositionType {
    X_Center: number;
    Y_Top: number;
}

interface PositionsType {
    Top: PositionType;
    Left: PositionType;
    Center: PositionType;
    Right: PositionType;
    Bottom: PositionType;
    TopLeft: PositionType;
    BottomRight: PositionType;
}

interface BubblesType {
    Top: JSX.Element;
    TopRight: JSX.Element;
    Right: JSX.Element;
    BottomRight: JSX.Element;
    Bottom: JSX.Element;
    BottomLeft: JSX.Element;
    Left: JSX.Element;
    TopLeft: JSX.Element;
    Center: JSX.Element;
}

function sendCommand(command: string) {
    const serverCalls = new ServerCalls();

    serverCalls.sendCommand(command);
}

// Page for round smartwatch controller
interface CircleButtonProps {
    icon: any[] | any;
    size?: "lg" | "sm";
    onClick: () => void;
    onDoubleClick?: () => void;
    appendText?: string;
}

function CircleButtonV2(props: CircleButtonProps) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                fontSize: "5vw",
                color: "white",
                // Center
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // Keep whitespace
                whiteSpace: "pre",
            }}
            onClick={props.onClick}
            onDoubleClick={props.onDoubleClick}
        >
            {(Array.isArray(props.icon) ? props.icon : [props.icon]).map(
                (icon, index) => {
                    return <FontAwesomeIcon key={index} icon={icon} />;
                }
            )}
            {props.appendText}
        </div>
    );
}
export function WatchControllerPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const limit = 15000;
        // cancel if new touch
        let timeout = setTimeout(() => {
            scrollToTopLeft();
        }, limit);

        if (containerRef.current) {
            containerRef.current.addEventListener("touchstart", () => {
                clearTimeout(timeout);
            });

            containerRef.current.addEventListener("mousedown", () => {
                clearTimeout(timeout);
            });

            containerRef.current.addEventListener("mouseup", () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    scrollToTopLeft();
                }, limit);
            });

            containerRef.current.addEventListener("touchend", () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    scrollToTopLeft();
                }, limit);
            });
        }

        return () => {
            clearTimeout(timeout);
        };
    }, []);
    function scrollToTopLeft() {
        if (containerRef.current && containerRef.current.scrollLeft > 0) {
            containerRef.current?.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    }

    const testItems = [
        <CircleContainer key="1" type={circleTypes.Compass} />, // Compass
        <CircleContainer
            key="2"
            type={circleTypes.Custom}
            renderContent={<ContinueWatchingItems />}
        />, // Select Show
    ];

    return (
        <div
            className="hide-scrollbars"
            ref={containerRef}
            style={{
                display: "grid",
                height: "100vw",
                width: "100vw",

                gridAutoFlow: "column",
                alignItems: "center",
                color: "white",
                overflowX: "scroll",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
            }}
        >
            <BlackBackground />
            {testItems}
        </div>
    );
}

interface Item {
    seriesFolderName: string;
    progress: number;
    duration: number;
    lastUpdated: number;
    episodeNumber: string;
    coverImageUrl: string;
    watchUrl: string;
    seriesTitle: string;
}
function ContinueWatchingItems() {
    const lists = [
        {
            listName: "Continue Watching",
        },
        {
            listName: "Completed",
        },
        {
            listName: "Planning",
        },
        {
            listName: "Search",
        },
    ];
    const [listIndex, setListIndex] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState<Item[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    function getList() {
        return lists[listIndex] || lists[0];
    }

    function getData(isListChange: boolean = false, limit: number = 50) {
        const serverCalls = new ServerCalls();

        fetch(
            serverCalls.getListItems(
                getList().listName,
                searchText,
                data.length >= limit && !isListChange
                    ? data.length + limit
                    : limit
            )
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data.data);
                setHasMore(data.hasMore);
                setTotalCount(data.totalCount);
            });
    }

    useEffect(() => {
        getData(true);
    }, [listIndex]);

    const placeholder = (
        <div
            style={{
                width: "30vw",
                height: "30vw",
            }}
        ></div>
    );

    return (
        <div
            className="hide-scrollbars"
            style={{
                width: "100vw",
                height: "100%",
                overflow: "scroll",
                overflowX: "hidden",
                borderRadius: "50%",
                display: "flex",

                flexWrap: "wrap",

                justifyContent: "center",
                padding: 0,
                paddingTop: "6vw",
                paddingBottom: "55vw",
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "100vw",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "5vw",
                }}
            >
                <button
                    className="btn btn-primary"
                    style={{
                        height: "fit-content",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size="3x"
                        onClick={() => {
                            setListIndex(
                                listIndex == 0
                                    ? lists.length - 1
                                    : listIndex - 1
                            );
                        }}
                    />
                </button>
                <button
                    className="btn btn-primary ms-3 me-3"
                    style={{
                        height: "fit-content",
                        width: "fit-content",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faRefresh}
                        size="4x"
                        onClick={() => {
                            getData();
                        }}
                    />
                </button>

                <button
                    className="btn btn-primary"
                    style={{
                        height: "fit-content",
                    }}
                >
                    <FontAwesomeIcon
                        className="p-0 m-0"
                        icon={faArrowRight}
                        size="3x"
                        onClick={() => {
                            setListIndex(
                                listIndex == lists.length - 1
                                    ? 0
                                    : listIndex + 1
                            );
                        }}
                    />
                </button>
            </div>

            <div
                style={{
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "3vw",
                }}
            >
                <h1>
                    {getList().listName}{" "}
                    {totalCount > 0 ? `(${totalCount})` : `(${data.length})`}
                </h1>
                <div>
                    {getList().listName == "Search" && (
                        <input
                            className="form-control"
                            type="text"
                            value={searchText}
                            onChange={e => {
                                setSearchText(e.target.value);
                            }}
                            style={{
                                width: "50vw",
                                fontSize: "3vw",
                                textAlign: "center",
                            }}
                        />
                    )}
                </div>
                {getList().listName == "Search" && (
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            getData();
                        }}
                    >
                        Search
                    </button>
                )}
            </div>
            {/* {placeholder} */}
            {/* Watch items */}
            {data.map((item, index) => {
                const image = <SeriesImage key={index} item={item} />;

                if (index == 1) {
                    return (
                        <React.Fragment key={index}>
                            {/* {placeholder} */}
                            {image}
                        </React.Fragment>
                    );
                }

                return image;
            })}

            {hasMore && (
                <div
                    style={{
                        width: "100vw",
                    }}
                >
                    <button
                        className="btn btn-primary btn-block"
                        style={{
                            marginTop: "5vw",
                            width: "100vw",
                            fontSize: "10vw",
                        }}
                        onClick={() => {
                            getData();
                        }}
                    >
                        <div>
                            ({data.length} / {totalCount})
                        </div>
                        More
                    </button>
                </div>
            )}
        </div>
    );
}

function SeriesImage(props: { item: Item }) {
    const { coverImageUrl, watchUrl, seriesTitle } = props.item;
    const [isExpanded, setExpanded] = useState(false);
    return (
        <>
            <img
                src={coverImageUrl}
                style={
                    !isExpanded
                        ? {
                              width: "40vw",
                              height: "40vw",
                              borderRadius: "5%",
                              padding: 0,
                              margin: "1vw",
                          }
                        : {
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100vw",
                              height: "100vw",
                              borderRadius: "50%",
                              padding: 0,
                          }
                }
                onClick={() => {
                    setExpanded(!isExpanded);
                }}
                onDoubleClick={() => {
                    sendCommand("open|" + watchUrl);
                }}
            />

            {isExpanded && (
                <div
                    style={{
                        pointerEvents: "none",
                        position: "absolute",
                        bottom: 0,
                        left: "auto",
                        right: "auto",
                        textAlign: "center",
                        width: "100vw",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        fontSize: "6vw",
                        paddingLeft: "30vw",
                        paddingRight: "30vw",
                        paddingBottom: "5vw",
                        overflow: "hidden",
                        // borderBottomRightRadius: "100vw",
                        // borderBottomLeftRadius: "100vw",
                    }}
                >
                    {seriesTitle}
                </div>
            )}
        </>
    );
}

const circleSize = {
    lg: "33vw",
    md: "27vw",
    sm: "20vw",
};
const circleTypes = {
    Compass: "Compass",
    Dial: "Dial",
    Cross: "Cross",
    Square: "Square",
    Custom: "Custom",
};
function CircleContainer(props: { type?: string; renderContent?: any }) {
    const [compassItems, setCompassItems] = useState(getDefaultItems());

    const { type = circleTypes.Square, renderContent } = props;

    function getDefaultItems() {
        return {
            top: (
                <CircleButtonV2
                    icon={faForward}
                    onClick={() => {
                        sendCommand("skip");
                    }}
                    appendText=" 85"
                />
            ),

            right: (
                <CircleButtonV2
                    icon={faForwardStep}
                    onClick={() => {
                        sendCommand("next");
                    }}
                />
            ),
            bottom: (
                <CircleButtonV2
                    icon={faBars}
                    onClick={() => {
                        sendCommand("menu");
                    }}
                />
            ),
            left: (
                <CircleButtonV2
                    icon={faBackwardStep}
                    onClick={() => {
                        sendCommand("previous");
                    }}
                />
            ),
            center: (
                <CircleButtonV2
                    size="lg"
                    icon={[faPlay, faPause]}
                    onClick={() => {
                        sendCommand("playpause");
                    }}
                    onDoubleClick={() => {
                        sendCommand("toggle-controls");
                    }}
                />
            ),
            topLeft: (
                <CircleButtonV2
                    icon={fa0}
                    onClick={() => {
                        sendCommand("restart");
                    }}
                    onDoubleClick={() => {
                        switchToNumberBubbles();
                    }}
                    size="sm"
                />
            ),
            topRight: (
                <CircleButtonV2
                    icon={faForward}
                    onClick={() => {
                        sendCommand("forward5");
                    }}
                    size={"sm"}
                    appendText=" 5"
                />
            ),
            bottomLeft: (
                <CircleButtonV2
                    icon={faBackward}
                    onClick={() => {
                        sendCommand("rewind5");
                    }}
                    size={"sm"}
                    appendText=" 5"
                />
            ),
            bottomRight: (
                <CircleButtonV2
                    icon={faBackward}
                    onClick={() => {
                        sendCommand("undo-skip");
                    }}
                    size={"sm"}
                    appendText=" 85"
                />
            ),
        };
    }

    function getNumberItems() {
        return {
            top: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("1");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 1"
                />
            ),
            topRight: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("2");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 2"
                    size="sm"
                />
            ),
            right: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("3");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 3"
                />
            ),
            bottomRight: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("4");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 4"
                    size="sm"
                />
            ),
            bottom: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("5");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 5"
                />
            ),
            bottomLeft: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("6");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 6"
                    size="sm"
                />
            ),
            left: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("7");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 7"
                />
            ),
            topLeft: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("8");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 8"
                    size="sm"
                />
            ),
            center: (
                <CircleButtonV2
                    icon={faCircleCheck}
                    onClick={() => {
                        sendCommand("9");
                        revertToDefaultBubbles();
                    }}
                    appendText=" 9"
                />
            ),
        };
    }

    function switchToNumberBubbles() {
        setCompassItems(getNumberItems());
    }

    function revertToDefaultBubbles() {
        setCompassItems(getDefaultItems());
    }

    return (
        <div
            id="parent-circle"
            className="cool-background hide-scrollbars"
            style={{
                width: "100vw",
                height: "100vw",
                borderRadius: "50%",
                color: "white",

                // Item to snap
                scrollSnapAlign: "start",
                position: "relative",
            }}
        >
            {
                {
                    Compass: <CompassCircle {...compassItems} />,
                    Dial: <DialCircle />,
                    Cross: <CrossCircle />,
                    Square: <SquareCircle />,
                    Custom: <CustomCircle renderContent={renderContent} />,
                }[type]
            }
        </div>
    );
}

function CustomCircle(props: { renderContent: any }) {
    return props.renderContent ? props.renderContent : null;
}

interface CompassCircleProps {
    top: JSX.Element;
    right: JSX.Element;
    bottom: JSX.Element;
    left: JSX.Element;
    center: JSX.Element;
    topLeft: JSX.Element;
    topRight: JSX.Element;
    bottomLeft: JSX.Element;
    bottomRight: JSX.Element;
}
function CompassCircle(props: CompassCircleProps) {
    const {
        top,
        right,
        bottom,
        left,
        center,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
    } = props;
    return (
        <>
            {/* Top Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.md,
                    height: circleSize.md,
                    borderRadius: "50%",
                }}
            >
                {top}
            </div>

            {/* Right Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "15%",
                    transform: "translate(50%, -50%)",
                    width: circleSize.md,
                    height: circleSize.md,
                    borderRadius: "50%",
                }}
            >
                {right}
            </div>

            {/* Bottom Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "50%",
                    transform: "translate(-50%, 50%)",
                    width: circleSize.md,
                    height: circleSize.md,
                    borderRadius: "50%",
                }}
            >
                {bottom}
            </div>

            {/* Left Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "15%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.md,
                    height: circleSize.md,
                    borderRadius: "50%",
                }}
            >
                {left}
            </div>

            {/* Center Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.lg,
                    height: circleSize.lg,
                    borderRadius: "50%",
                }}
            >
                {center}
            </div>
            {/* Top Left Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            >
                {topLeft}
            </div>

            {/* Top Right Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "25%",
                    right: "25%",
                    transform: "translate(50%, -50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            >
                {topRight}
            </div>

            {/* Bottom Left Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "25%",
                    left: "25%",
                    transform: "translate(-50%, 50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            >
                {bottomLeft}
            </div>

            {/* Bottom Right Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "25%",
                    right: "25%",
                    transform: "translate(50%, 50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            >
                {bottomRight}
            </div>
        </>
    );
}

function DialCircle() {
    return (
        <>
            {/* Top Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Right Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "15%",
                    transform: "translate(50%, -50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Bottom Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "50%",
                    transform: "translate(-50%, 50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Left Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "15%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Center Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.lg,
                    height: circleSize.lg,
                    borderRadius: "50%",
                }}
            ></div>
            {/* Top Left Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Top Right Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "25%",
                    right: "25%",
                    transform: "translate(50%, -50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Bottom Left Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "25%",
                    left: "25%",
                    transform: "translate(-50%, 50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Bottom Right Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "25%",
                    right: "25%",
                    transform: "translate(50%, 50%)",
                    width: circleSize.sm,
                    height: circleSize.sm,
                    borderRadius: "50%",
                }}
            ></div>
        </>
    );
}

function CrossCircle() {
    return (
        <>
            {/* Top Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.md,
                    height: circleSize.md,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Right Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "15%",
                    transform: "translate(50%, -50%)",
                    width: circleSize.md,
                    height: circleSize.md,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Bottom Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "50%",
                    transform: "translate(-50%, 50%)",
                    width: circleSize.md,
                    height: circleSize.md,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Left Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "15%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.md,
                    height: circleSize.md,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Center Circle */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.lg,
                    height: circleSize.lg,
                    borderRadius: "50%",
                }}
            ></div>
        </>
    );
}

function SquareCircle() {
    return (
        <>
            {/* Quadrent 1 */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "31%",
                    left: "31%",
                    transform: "translate(-50%, -50%)",
                    width: circleSize.lg,
                    height: circleSize.lg,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Quadrent 2 */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    top: "31%",
                    right: "31%",
                    transform: "translate(50%, -50%)",
                    width: circleSize.lg,
                    height: circleSize.lg,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Quadrent 3 */}

            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "32%",
                    left: "32%",
                    transform: "translate(-50%, 50%)",
                    width: circleSize.lg,
                    height: circleSize.lg,
                    borderRadius: "50%",
                }}
            ></div>

            {/* Quadrent 4 */}
            <div
                className="btn btn-primary"
                style={{
                    position: "absolute",
                    bottom: "32%",
                    right: "32%",
                    transform: "translate(50%, 50%)",
                    width: circleSize.lg,
                    height: circleSize.lg,
                    borderRadius: "50%",
                }}
            ></div>
        </>
    );
}

function BlackBackground() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
                zIndex: -100,
            }}
        ></div>
    );
}

function WatchControllerCircle(props: {
    bubbles: BubblesType;
    positions: PositionsType;
}) {
    const { bubbles, positions } = props;
    return (
        <div
            style={{
                scrollSnapAlign: "start",
                position: "relative",
                height: "min(100vw, 100vh)",
                padding: 0,
                margin: 0,
            }}
        >
            <div className="watch-controller-page-circle cool-background">
                {/* Media Controls Play pause circle in center Left (previous) Right (next) Top (Skip) Bottom () */}

                {/* Top Container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.Top.Y_Top}%`,
                        left: `${positions.Top.X_Center}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {bubbles.Top}
                </div>
                {/* Left Container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.Left.Y_Top}%`,
                        left: `${positions.Left.X_Center}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {bubbles.Left}
                </div>
                {/* Center Container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.Center.Y_Top}%`,
                        left: `${positions.Center.X_Center}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {bubbles.Center}
                </div>
                {/* Right Container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.Right.Y_Top}%`,
                        left: `${positions.Right.X_Center}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {bubbles.Right}
                </div>
                {/* Bottom Container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.Bottom.Y_Top}%`,
                        left: `${positions.Bottom.X_Center}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {bubbles.Bottom}
                </div>

                {/* Bottom right corner container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.BottomRight.Y_Top}%`,
                        left: `${positions.BottomRight.X_Center}%`,
                    }}
                >
                    {bubbles.BottomRight}
                </div>

                {/* Top left corner container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.TopLeft.Y_Top}%`,
                        left: `${positions.TopLeft.X_Center}%`,
                    }}
                >
                    {bubbles.TopLeft}
                </div>

                {/* Top Right corner container*/}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.TopLeft.Y_Top}%`,
                        left: `${positions.BottomRight.X_Center}%`,
                    }}
                >
                    {bubbles.TopRight}
                </div>

                {/* Bottom Left corner container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.BottomRight.Y_Top}%`,
                        left: `${positions.TopLeft.X_Center}%`,
                    }}
                >
                    {bubbles.BottomLeft}
                </div>
            </div>
        </div>
    );
}
