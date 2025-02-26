import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import MyLocalServer from "@features/server/MyLocalServer";
import { useUserData } from "@features/contexts/UserContext";
import {
    ModalActionType,
    useSetShowingModalDispatch,
    useShowingModal,
} from "./../../contexts/ModalContext";

export function ShowCreateNewModalContainerButton() {
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

function CreateNewModalContainerModal() {
    const user = useUserData();
    const showingModal = useShowingModal();
    const setShowingModal = useSetShowingModalDispatch();

    const [formData, setFormData] = useState({
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

    function updateFormData(event: any) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleCancel() {
        setShowingModal({
            type: ModalActionType.ClearModal,
        });
    }

    function handleFormSubmit(data: any) {
        try {
            const filters = JSON.parse(data.containerFilters);
        } catch (e) {
            alert("Invalid JSON for filters");
            return;
        }

        MyLocalServer.createAnimeContainer(user.id, {
            name: data.containerName,
            filters: data.containerFilters,
        })
            .then(res => res.json())
            .then(data => {
                console.log({ data });
                setShowingModal({
                    type: ModalActionType.ClearModal,
                });
            })
            .catch(err => {
                alert("Failed to create container");
                console.error(err);
            });
    }

    if (showingModal?.type === ModalActionType.CreateNewContainer) {
        return (
            <Modal
                show={true}
                onHide={handleCancel}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{"Create new Container"}</Modal.Title>
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
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return null;
}

export default CreateNewModalContainerModal;
