import { useUserData } from "@features/contexts/UserContext";
import MyLocalServer from "@features/server/MyLocalServer";
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { AnimeContainer } from "./LocalAnimeContainer";
import { FormModal } from "./Modal/FormModal";
import CreateNewModalContainerModal, {
    ShowCreateNewModalContainerButton,
} from "./Modal/CreateNewModalContainerModal";
import UpdateModalContainerModal from "./Modal/UpdateModalContainerModal";

interface UpdateContainerPayload {
    containerId: string;
}
export interface ShowingModal {
    name: "Create new Container" | "Update Container";
    payload?: UpdateContainerPayload;
}

export function LocalAnimeHome() {
    const user = useUserData();

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

    // TODO: Probably move to context
    const [showingModal, setShowingModal] = useState<ShowingModal | null>(null);

    useEffect(() => {
        retrieveUserContainers();
    }, []);

    return (
        <Container>
            {userContainers.map((container, index) => {
                return (
                    <AnimeContainer
                        container={container}
                        key={container.id}
                        showingModal={showingModal}
                        setShowingModal={setShowingModal}
                    />
                );
            })}

            <ShowCreateNewModalContainerButton
                showingModal={showingModal}
                setShowingModal={setShowingModal}
            />

            <CreateNewModalContainerModal
                showingModal={showingModal}
                setShowingModal={setShowingModal}
            />

            <UpdateModalContainerModal
                showingModal={showingModal}
                setShowingModal={setShowingModal}
            />
        </Container>
    );
}
