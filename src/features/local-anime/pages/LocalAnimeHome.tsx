import { useUserData } from "@features/contexts/UserContext";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { LocalUserAnimeContainer } from "../LocalAnimeHome/LocalAnimeContainer";
import PullLocalUserAnimeContainers, {
    PullLocalUserAnimeContainersResponse,
    UserContainer,
} from "@shared/serverCalls/PullLocalUserAnimeContainers";
import CreateUpdateModalContainerModal, {
    CreateNewModalContainerButton,
} from "../Modal/CreateUpdateModalContainerModal";

export function LocalAnimeHome() {
    const user = useUserData();

    const [userContainers, setUserContainers] = useState<UserContainer[]>([]);

    async function retrieveUserContainers() {
        try {
            const response = await new PullLocalUserAnimeContainers().fetch({
                userID: user.id,
            });
            const data: PullLocalUserAnimeContainersResponse =
                await response.json();

            setUserContainers(data.userContainers);
        } catch (e) {
            console.error(e);
            alert("Failed to retrieve user containers");
        }
    }

    useEffect(() => {
        //  TODO: Listen for live updates (New containers, container updates)
        retrieveUserContainers();
    }, []);

    return (
        <Container fluid style={{ paddingBottom: "500px" }}>
            {userContainers.map(userContainer => {
                return (
                    <LocalUserAnimeContainer
                        userContainerID={userContainer.id}
                        key={userContainer.id}
                    />
                );
            })}

            <CreateNewModalContainerButton />
            <CreateUpdateModalContainerModal />
        </Container>
    );
}
