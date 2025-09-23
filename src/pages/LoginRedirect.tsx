import {
    UserActionType,
    useUserData,
    useUserDispatch,
} from "@features/contexts/UserContext";
import MyLocalServer from "@shared/MyLocalServer";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LoginRedirect() {
    const user = useUserData();
    const dispatchUser = useUserDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    async function handleRedirect() {
        const hash = new URLSearchParams(location.hash.replace("#", "?"));
        const hashData = {
            access_token: hash.get("access_token"),
            token_type: hash.get("token_type"),
            expires_in: hash.get("expires_in"),
        };

        if (hashData.access_token) {
            const response = await MyLocalServer.aniListLoginRedirect(
                user.id,
                hashData
            );

            if (response.status !== 200) {
                alert(`AniList Login Failed - ${response.statusText}`);
            } else {
                const data = await response.json();
                console.log("AniList Login Success", data);

                dispatchUser({
                    type: UserActionType.HandleLogin,
                    payload: data.user,
                });
            }
        } else {
            alert("AniList Login Failed - No Access Token");
        }
    }

    useEffect(() => {
        handleRedirect();
    }, []);

    useEffect(() => {
        if (user.aniList?.access_token) {
            navigate("/anime");
        }
    }, [user]);

    return null;
}

export default LoginRedirect;
