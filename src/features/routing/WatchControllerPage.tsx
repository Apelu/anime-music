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

    const positions = {
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

    const defaultBubbles = {
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

    const [bubbles, setBubbles] = useState(defaultBubbles);
    function switchToNumberBubbles() {
        setBubbles({
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
        });
    }

    return (
        <div className="watch-controller-page">
            {/* Round container for watch stuff */}

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
