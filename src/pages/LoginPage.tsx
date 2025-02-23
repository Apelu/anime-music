import { MyLocalServer } from "@features/api/server";
import {
    UserActionType,
    useUserData,
    useUserDispatch,
} from "@features/contexts/UserContext";
import { useState } from "react";
import {
    Button,
    Container,
    FloatingLabel,
    Form,
    FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const user = useUserData();
    const dispatchUser = useUserDispatch();

    const navigate = useNavigate();

    const [loginData, updateLoginData] = useState({
        userName: "",
        password: "",
    });

    if (user.isLoggedIn) {
        navigate("/anime");
        return null;
    }

    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center bg-info"
            style={{ height: "100vh" }}
        >
            <Container className="d-flex flex-column justify-content-center align-items-center bg-info">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3 w-100"
                >
                    <FormControl
                        placeholder="Username"
                        className="text-center"
                        value={loginData.userName}
                        onChange={e => {
                            updateLoginData({
                                ...loginData,
                                userName: e.target.value,
                            });
                        }}
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3 w-100"
                >
                    <FormControl
                        type="password"
                        placeholder="Password"
                        className="text-center"
                        value={loginData.password}
                        onChange={e => {
                            updateLoginData({
                                ...loginData,
                                password: e.target.value,
                            });
                        }}
                    />
                </FloatingLabel>

                <Button
                    size="lg"
                    className="text-center mb-3"
                    variant="outline-primary"
                    onClick={() => {
                        if (!loginData.userName || !loginData.password) {
                            alert("Please enter a username and password");
                            return;
                        }
                        MyLocalServer.loginUser(
                            loginData.userName,
                            loginData.password
                        )
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                if (data.error) {
                                    alert(data.error);
                                } else if (data.user) {
                                    dispatchUser({
                                        type: UserActionType.HandleLogin,
                                        payload: data.user,
                                    });
                                } else {
                                    alert(data);
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }}
                >
                    Login with Email and Password
                </Button>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                    }}
                >
                    {/* AniList Login */}
                    <Button
                        size="lg"
                        className="text-center mb-3 d-flex align-items-center"
                        title="Login with AniList"
                        onClick={() => {
                            alert("AniList Login - Coming Soon");
                        }}
                    >
                        <img
                            src="https://anilist.co/img/icons/icon.svg"
                            alt=""
                            style={{
                                width: "64px",
                                height: "64px",
                            }}
                        />
                    </Button>

                    {/* MAL Login */}
                    <Button
                        size="lg"
                        className="text-center mb-3"
                        title="Login with MyAnimeList"
                        onClick={() => {
                            alert("MAL Login - Coming Soon");
                        }}
                    >
                        <img
                            src="https://www.svgrepo.com/show/331489/myanimelist.svg"
                            alt=""
                            style={{
                                width: "64px",
                                height: "64px",
                            }}
                        />
                    </Button>
                </div>
            </Container>
        </Container>
    );
}

export default LoginPage;
