import { useUserData } from "@features/contexts/UserContext";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import MyLocalServer from "@shared/MyLocalServer";
import {
    ModalActionType,
    useSetShowingModalDispatch,
    useShowingModal,
} from "../../contexts/ModalContext";
import CreateNewLocalUserAnimeContainer, {
    CreateNewLocalUserAnimeContainerResponse,
} from "@shared/serverCalls/CreateNewLocalUserAnimeContainer";
import UpdateLocalUserAnimeContainer, {
    UpdateLocalUserAnimeContainerResponse,
} from "@shared/serverCalls/UpdateLocalUserAnimeContainer";

interface CreateUpdateModalFormData {
    containerName: string;
    containerFilters: string;
}

function CreateUpdateModalContainerModal() {
    const user = useUserData();
    const showingModal = useShowingModal();
    const setShowingModal = useSetShowingModalDispatch();

    const containerID = showingModal?.payload?.containerID || "";
    const type = containerID
        ? ModalActionType.UpdateContainer
        : ModalActionType.CreateNewContainer;

    const [formData, setFormData] = useState<CreateUpdateModalFormData>({
        containerName: "",
        containerFilters: JSON.stringify(
            [
                {
                    tableName: "localUserAnime",
                    fieldName: "status",
                    operation: "matchesOneOf",
                    matchesOneOf: ["Watching"],
                },
            ],
            null,
            2
        ),
    });

    useEffect(() => {
        populateOnFormLoad();
    }, [showingModal]);

    function populateOnFormLoad() {
        if (type === ModalActionType.UpdateContainer) {
            MyLocalServer.getUserAnimeContainer(user.id, containerID)
                .then(res => res.json())
                .then(data => {
                    console.log({ data });
                    setFormData({
                        containerName: data.container.name,
                        containerFilters: JSON.stringify(
                            data.container.filters,
                            null,
                            2
                        ),
                    });
                })
                .catch(err => {
                    console.error(err);
                    alert("Failed to fetch container data");
                });
        }
    }

    async function handleFormSubmit(data: any) {
        try {
            JSON.parse(data.containerFilters);
        } catch (e) {
            alert("Invalid JSON for filters");
            return;
        }

        try {
            if (type === ModalActionType.CreateNewContainer) {
                const response =
                    await new CreateNewLocalUserAnimeContainer().fetch({
                        userID: user.id,
                        newContainer: {
                            userID: user.id,
                            name: formData.containerName,
                            filters: JSON.parse(formData.containerFilters),
                            expanded: true,
                            sortBy: "",
                            sortOrder: "desc",
                        },
                    });
                const createNewContainerData: CreateNewLocalUserAnimeContainerResponse =
                    await response.json();

                console.log({ createNewContainerData });
            } else if (type === ModalActionType.UpdateContainer) {
                const response =
                    await new UpdateLocalUserAnimeContainer().fetch({
                        userID: user.id,
                        updatedContainer: {
                            userID: user.id,
                            id: containerID,
                            name: formData.containerName,
                            filters: JSON.parse(formData.containerFilters),
                            expanded: true,
                            sortBy: "",
                            sortOrder: "desc",
                        },
                    });
                const updatedContainerData: UpdateLocalUserAnimeContainerResponse =
                    await response.json();

                console.log({ updatedContainerData });
            }
            setShowingModal({
                type: ModalActionType.ClearModal,
            });
        } catch (e) {
            console.error(e);
            alert("Failed to " + type + " container");
        }
    }

    if (
        showingModal?.type === ModalActionType.CreateNewContainer ||
        showingModal?.type === ModalActionType.UpdateContainer
    ) {
        return (
            <Modal
                show={true}
                onHide={handleCancel}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {type === ModalActionType.UpdateContainer
                            ? "Update Container"
                            : "Create new Container"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="containerName">
                            <Form.Label>Container Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="containerName"
                                placeholder="Enter container name"
                                onChange={updateFormData}
                                value={formData.containerName}
                            />
                        </Form.Group>
                        <Form.Group controlId="containerFilters">
                            <Form.Label>Filters (JSON)</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="containerFilters"
                                placeholder='{"key": "value"}'
                                rows={12}
                                onChange={updateFormData}
                                value={formData.containerFilters}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleFormSubmit(formData);
                        }}
                    >
                        {type === ModalActionType.UpdateContainer
                            ? "Update"
                            : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return null;

    function handleCancel() {
        setShowingModal({
            type: ModalActionType.ClearModal,
        });
    }

    function updateFormData(event: any) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
}

export function CreateNewModalContainerButton() {
    const setShowingModal = useSetShowingModalDispatch();
    return (
        <Button
            onClick={() =>
                setShowingModal({
                    type: ModalActionType.CreateNewContainer,
                })
            }
        >
            Create new Container
        </Button>
    );
}

export default CreateUpdateModalContainerModal;
