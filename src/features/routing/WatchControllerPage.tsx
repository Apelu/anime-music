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

export function WatchControllerPage() {
    // Page for round smartwatch controller
    interface CircleButtonProps {
        icon: any[] | any;
        size?: "lg" | "sm";
        onClick: () => void;
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
            >
                {(Array.isArray(props.icon) ? props.icon : [props.icon]).map(
                    (icon, index) => {
                        return <FontAwesomeIcon key={index} icon={icon} />;
                    }
                )}
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
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "black",
            }}
        >
            {/* Round container for watch stuff */}

            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100vh",
                    height: "100vh",
                    backgroundColor: "white",
                    borderRadius: "50%",
                }}
            >
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
                    <CircleButton
                        icon={faForward}
                        onClick={() => {
                            sendCommand("skip");
                        }}
                    />
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
                    <CircleButton
                        icon={faBackwardStep}
                        onClick={() => {
                            sendCommand("previous");
                        }}
                    />
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
                    <CircleButton
                        size="lg"
                        icon={[faPlay, faPause]}
                        onClick={() => {
                            sendCommand("playpause");
                        }}
                    />
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
                    <CircleButton
                        icon={faForwardStep}
                        onClick={() => {
                            sendCommand("next");
                        }}
                    />
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
                    <CircleButton
                        icon={faBackward}
                        onClick={() => {
                            sendCommand("rewind");
                        }}
                    />
                </div>

                {/* Bottom right corner container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.BottomRight.Y_Top}%`,
                        left: `${positions.BottomRight.X_Center}%`,
                    }}
                >
                    <CircleButton
                        icon={faBars}
                        onClick={() => {
                            sendCommand("menu");
                        }}
                        size={"sm"}
                    />
                </div>

                {/* Top left corner container */}
                <div
                    style={{
                        position: "absolute",
                        top: `${positions.TopLeft.Y_Top}%`,
                        left: `${positions.TopLeft.X_Center}%`,
                    }}
                >
                    <CircleButton
                        icon={fa0}
                        onClick={() => {
                            sendCommand("restart");
                        }}
                        size={"sm"}
                    />
                </div>
            </div>
        </div>
    );
}
