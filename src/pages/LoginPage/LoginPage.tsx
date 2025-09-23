import {
    UserActionType,
    useUserData,
    useUserDispatch,
} from "@features/contexts/UserContext";
import { Paths } from "@features/routing/routes";
import MyLocalServer from "@shared/MyLocalServer";
import { useState } from "react";
import { Button, Container, FloatingLabel, FormControl } from "react-bootstrap";
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
        navigate(Paths.Anime);
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
                            updateLoginDataField("userName", e.target.value);
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
                            updateLoginDataField("password", e.target.value);
                        }}
                    />
                </FloatingLabel>

                <Button
                    size="lg"
                    className="text-center mb-3"
                    variant="outline-primary"
                    onClick={handleLogin}
                >
                    Login with Email and Password
                </Button>
            </Container>
        </Container>
    );

    function updateLoginDataField(field: string, value: string) {
        updateLoginData({
            ...loginData,
            [field]: value,
        });
    }

    function handleLogin() {
        if (!loginData.userName || !loginData.password) {
            alert("Please enter a username and password");
            return;
        }

        MyLocalServer.loginUser(loginData.userName, loginData.password)
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
    }
}

export default LoginPage;
