import { useUserData } from "@features/contexts/UserContext";
import MyLocalServer from "@features/server/MyLocalServer";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AnimeContainer } from "./LocalAnimeContainer";
import CreateNewModalContainerModal, {
    ShowCreateNewModalContainerButton,
} from "../Modal/CreateNewModalContainerModal";
import UpdateModalContainerModal from "../Modal/UpdateModalContainerModal";
import { ShowingModal } from "../Modal";
import { useShowingModal } from "@features/contexts/ModalContext";

export function LocalAnimeHome() {
    const user = useUserData();
    const modal = useShowingModal();

    const [userContainers, setUserContainers] = useState<any[]>([]);
    async function retrieveUserContainers() {
        try {
            const response = await MyLocalServer.pullUserAnimeLists(user.id);
            const retrievedUserContainers = await response.json();
            console.log({ retrievedUserContainers });
            setUserContainers(retrievedUserContainers);
        } catch (e) {
            console.error(e);
            alert("Failed to retrieve user containers");
        }
    }

    useEffect(() => {
        retrieveUserContainers();
    }, []);

    return (
        <Container>
            {userContainers.map((container, index) => {
                return (
                    <AnimeContainer container={container} key={container.id} />
                );
            })}

            <ShowCreateNewModalContainerButton />

            <CreateNewModalContainerModal />

            <UpdateModalContainerModal />
        </Container>
    );
}
