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
export function WatchControllerPage() {
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
            props.size === "lg"
                ? "33vw"
                : props.size === "sm"
                ? "22vw"
                : "28vw";

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

    function sendCommand(command: string) {
        const serverCalls = new ServerCalls();

        serverCalls.sendCommand(command);
    }

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

    const items = [
        <WatchControllerCircle bubbles={bubbles} positions={positions} />,

        <WatchControllerCircle bubbles={numberBubbles} positions={positions} />,
    ];

    const testItems = [<CircleContainer />, <CircleContainer />];

    // return (
    //     <div
    //         className="hide-scrollbars"
    //         style={{
    //             display: "grid",
    //             height: "100vh",
    //             width: "100vw",

    //             // Make items horizontal
    //             gridAutoFlow: "column",
    //             // Center vertically
    //             // justifyContent: "center",
    //             // Center horizontally
    //             alignItems: "center",
    //             color: "white",
    //             overflowX: "scroll",
    //             scrollSnapType: "x mandatory",
    //             // scrollBehavior: "smooth",
    //         }}
    //         // onWheel={e => {
    //         //     const currentScroll = window.scrollY;
    //         //     console.log(e.deltaY, currentScroll);

    //         //     const isScrollingDown = e.deltaY > 0;

    //         //     if (
    //         //         isScrollingDown &&
    //         //         currentScroll < window.innerHeight * (items.length - 1)
    //         //     ) {
    //         //         window.scrollTo(0, currentScroll + window.innerHeight);
    //         //     } else if (!isScrollingDown && currentScroll > 0) {
    //         //         window.scrollTo(0, currentScroll - window.innerHeight);
    //         //     }
    //         // }}
    //     >
    //         <BlackBackground />
    //         {testItems}

    //         {/* {items} */}
    //     </div>
    // );

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

function CircleContainer() {
    return (
        <div
            id="parent-circle"
            style={{
                width: "100vw",
                height: "100vw",
                borderRadius: "50%",
                backgroundColor: "red",
                color: "white",

                // Item to snap
                scrollSnapAlign: "start",
                position: "relative",
            }}
        >
            {/* Top Circle */}
            <div
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "30vw",
                    height: "30vw",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                }}
            ></div>

            {/* Right Circle */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "15%",
                    transform: "translate(50%, -50%)",
                    width: "30vw",
                    height: "30vw",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                }}
            ></div>

            {/* Bottom Circle */}
            <div
                style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "50%",
                    transform: "translate(-50%, 50%)",
                    width: "30vw",
                    height: "30vw",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                }}
            ></div>

            {/* Left Circle */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "15%",
                    transform: "translate(-50%, -50%)",
                    width: "30vw",
                    height: "30vw",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                }}
            ></div>

            {/* Center Circle */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "30vw",
                    height: "30vw",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                }}
            ></div>
            {/* Top Left Circle */}
            <div
                style={{
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                    transform: "translate(-50%, -50%)",
                    width: "20vw",
                    height: "20vw",
                    borderRadius: "50%",
                    backgroundColor: "green",
                }}
            ></div>

            {/* Top Right Circle */}
            <div
                style={{
                    position: "absolute",
                    top: "25%",
                    right: "25%",
                    transform: "translate(50%, -50%)",
                    width: "20vw",
                    height: "20vw",
                    borderRadius: "50%",
                    backgroundColor: "green",
                }}
            ></div>

            {/* Bottom Left Circle */}
            <div
                style={{
                    position: "absolute",
                    bottom: "25%",
                    left: "25%",
                    transform: "translate(-50%, 50%)",
                    width: "20vw",
                    height: "20vw",
                    borderRadius: "50%",
                    backgroundColor: "green",
                }}
            ></div>

            {/* Bottom Right Circle */}
            <div
                style={{
                    position: "absolute",
                    bottom: "25%",
                    right: "25%",
                    transform: "translate(50%, 50%)",
                    width: "20vw",
                    height: "20vw",
                    borderRadius: "50%",
                    backgroundColor: "green",
                }}
            ></div>
        </div>
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
