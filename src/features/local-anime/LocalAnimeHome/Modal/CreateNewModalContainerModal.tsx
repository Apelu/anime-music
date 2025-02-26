import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { ShowingModal } from "../LocalAnimeHome";
import MyLocalServer from "@features/server/MyLocalServer";
import { useUserData } from "@features/contexts/UserContext";

export function ShowCreateNewModalContainerButton(props: {
    showingModal: ShowingModal | null;
    setShowingModal: (modal: ShowingModal | null) => void;
}) {
    return (
        <Button
            onClick={() =>
                props.setShowingModal({ name: "Create new Container" })
            }
        >
            Create new Container
        </Button>
    );
}

function CreateNewModalContainerModal(props: {
    showingModal: ShowingModal | null;
    setShowingModal: (modal: ShowingModal | null) => void;
}) {
    const user = useUserData();
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
        props.setShowingModal(null);
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
                props.setShowingModal(null);
            })
            .catch(err => {
                alert("Failed to create container");
                console.error(err);
            });
    }

    if (props.showingModal?.name === "Create new Container") {
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
