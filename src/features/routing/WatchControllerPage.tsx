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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ServerCalls } from "@pages/AnimeDownloadPage";
import { app } from "./../api/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { send } from "process";

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
function CircleButton(props: CircleButtonProps) {
    const size =
        props.size === "lg" ? "33vw" : props.size === "sm" ? "22vw" : "28vw";

    return (
        <button
            className="btn btn-primary"
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                fontSize: "5vw",
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
        </button>
    );
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
    const positions: PositionsType = {
        Top: {
            X_Center: 50,
            Y_Top: 15,
        },
        Left: {
            X_Center: 15,
            Y_Top: 50,
        },
        Center: {
            X_Center: 50,
            Y_Top: 50,
        },
        Right: {
            X_Center: 85,
            Y_Top: 50,
        },
        Bottom: {
            X_Center: 50,
            Y_Top: 85,
        },
        TopLeft: {
            X_Center: 15,
            Y_Top: 15,
        },
        BottomRight: {
            X_Center: 65,
            Y_Top: 65,
        },
    };

    const defaultBubbles: BubblesType = {
        Top: (
            <CircleButton
                icon={faForward}
                onClick={() => {
                    sendCommand("skip");
                }}
                appendText=" 85"
            />
        ),
        TopRight: (
            <CircleButton
                icon={faForward}
                onClick={() => {
                    sendCommand("forward5");
                }}
                size={"sm"}
                appendText=" 5"
            />
        ),
        Right: (
            <CircleButton
                icon={faForwardStep}
                onClick={() => {
                    sendCommand("next");
                }}
            />
        ),
        BottomRight: (
            <CircleButton
                icon={faBackward}
                onClick={() => {
                    sendCommand("undo-skip");
                }}
                size={"sm"}
                appendText=" 85"
            />
        ),
        Bottom: (
            <CircleButton
                icon={faBars}
                onClick={() => {
                    sendCommand("menu");
                }}
            />
        ),
        BottomLeft: (
            <CircleButton
                icon={faBackward}
                onClick={() => {
                    sendCommand("rewind5");
                }}
                size={"sm"}
                appendText=" 5"
            />
        ),
        Left: (
            <CircleButton
                icon={faBackwardStep}
                onClick={() => {
                    sendCommand("previous");
                }}
            />
        ),
        TopLeft: (
            <CircleButton
                icon={fa0}
                onClick={() => {
                    sendCommand("restart");
                }}
                onDoubleClick={() => {
                    switchToNumberBubbles();
                }}
                size={"sm"}
            />
        ),
        Center: (
            <CircleButton
                size="lg"
                icon={[faPlay, faPause]}
                onClick={() => {
                    sendCommand("playpause");
                }}
            />
        ),
    };

    const numberBubbles = {
        Top: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("1");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 1"
            />
        ),
        TopRight: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("2");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 2"
                size="sm"
            />
        ),
        Right: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("3");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 3"
            />
        ),
        BottomRight: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("4");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 4"
                size="sm"
            />
        ),
        Bottom: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("5");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 5"
            />
        ),
        BottomLeft: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("6");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 6"
                size="sm"
            />
        ),
        Left: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("7");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 7"
            />
        ),
        TopLeft: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("8");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 8"
                size="sm"
            />
        ),
        Center: (
            <CircleButton
                icon={faCircleCheck}
                onClick={() => {
                    sendCommand("9");
                    setBubbles(defaultBubbles);
                }}
                appendText=" 9"
            />
        ),
    };

    const [bubbles, setBubbles] = useState<BubblesType>(defaultBubbles);

    function switchToNumberBubbles() {
        setBubbles(numberBubbles);
    }

    const testItems = [
        <CircleContainer type={circleTypes.Compass} />, // Compass
        <CircleContainer
            type={circleTypes.Custom}
            renderContent={<ContinueWatchingItems />}
        />, // Select Show
    ];

    const showNew = true;

    if (showNew)
        return (
            <div
                className="hide-scrollbars"
                style={{
                    display: "grid",
                    height: "100vh",
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

    return (
        <div className="watch-controller-page">
            {/* Round container for watch stuff */}

            <div
                style={{
                    position: "relative",
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
            <div
                style={{
                    position: "relative",
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
        </div>
    );
}

function ContinueWatchingItems() {
    interface Item {
        seriesFolderName: string;
        progress: number;
        duration: number;
        lastUpdated: number;
        episodeNumber: string;
        coverImageUrl: string;
        watchUrl: string;
    }

    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        const serverCalls = new ServerCalls();

        fetch(serverCalls.getContinueWatchingUrl())
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data.data);
            });
    }, []);

    function sendCommand(command: string) {
        const serverCalls = new ServerCalls();

        serverCalls.sendCommand(command);
    }

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
                paddingBottom: "50vw",
            }}
        >
            {placeholder}
            {/* Watch items */}
            {data.map((item, index) => {
                const image = (
                    <SeriesImage
                        coverImageUrl={item.coverImageUrl}
                        watchUrl={item.watchUrl}
                    />
                );

                if (index == 1) {
                    return (
                        <>
                            {placeholder}
                            {image}
                        </>
                    );
                }

                return image;
            })}
        </div>
    );
}

function SeriesImage(props: { coverImageUrl: string; watchUrl: string }) {
    const { coverImageUrl, watchUrl } = props;
    const [isExpanded, setExpanded] = useState(false);
    return (
        <img
            src={coverImageUrl}
            style={
                !isExpanded
                    ? {
                          width: "30vw",
                          height: "30vw",
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
            className="cool-background"
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
