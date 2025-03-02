import { useUserData } from "@features/contexts/UserContext";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CreateUpdateModalContainerModal, {
    CreateNewModalContainerButton,
} from "../Modal/CreateUpdateModalContainerModal";
import { LocalUserAnimeContainer } from "./LocalAnimeContainer";
import PullLocalUserAnimeContainers, {
    PullLocalUserAnimeContainersResponse,
    UserContainer,
} from "@shared/serverCalls/PullLocalUserAnimeContainers";

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

            console.log({ userContainers: data.userContainers });
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
        <Container fluid>
            {userContainers.map(userContainer => {
                return (
                    <LocalUserAnimeContainer
                        userContainer={userContainer}
                        key={userContainer.id}
                    />
                );
            })}

            <CreateNewModalContainerButton />
            <CreateUpdateModalContainerModal />
        </Container>
    );
}
