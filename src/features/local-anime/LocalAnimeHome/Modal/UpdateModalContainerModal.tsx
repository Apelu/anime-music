import { useUserData } from "@features/contexts/UserContext";
import MyLocalServer from "@features/server/MyLocalServer";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ShowingModal } from "../LocalAnimeHome";

export function ShowUpdateModalContainerButton(props: {
    showingModal: ShowingModal | null;
    setShowingModal: (modal: ShowingModal | null) => void;
    container: any;
}) {
    return (
        <Button
            onClick={() => {
                props.setShowingModal({
                    name: "Update Container",
                    payload: {
                        containerId: props.container.id,
                    },
                });
            }}
        >
            Update Container
        </Button>
    );
}

function UpdateModalContainerModal(props: {
    showingModal: ShowingModal | null;
    setShowingModal: (modal: ShowingModal | null) => void;
}) {
    const user = useUserData();
    const [formData, setFormData] = useState({
        containerName: "",
        containerFilters: "",
    });

    const containerId = props.showingModal?.payload?.containerId || "";
    useEffect(() => {
        if (props.showingModal?.name === "Update Container") {
            if (!containerId) {
                alert("No container id provided");
                return;
            }
            // Fetch the container data
            MyLocalServer.pullUserAnimeList(user.id, containerId)
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
    }, [props.showingModal]);

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
        MyLocalServer.updateAnimeContainer(user.id, containerId, {
            name: data.containerName,
            filters: data.containerFilters,
        })
            .then(res => res.json())
            .then(data => {
                console.log({ data });
                props.setShowingModal(null);
            })
            .catch(err => {
                alert("Failed to update container");
                console.error(err);
            });
    }

    if (props.showingModal?.name === "Update Container") {
        const containerId = props.showingModal.payload?.containerId;
        if (!containerId) {
            return null;
        }

        return (
            <Modal
                show={true}
                onHide={handleCancel}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{"Update Container"}</Modal.Title>
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
                        {/* TODO: Make GUI rather than free-json field */}
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
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return null;
}

export default UpdateModalContainerModal;
