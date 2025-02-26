import { Modal, Button } from "react-bootstrap";
import { ModalState, ModalProps } from ".";

export interface ConfirmationModalState extends ModalState {
    message: string;
}

export interface ConfirmationModalProps
    extends ConfirmationModalState,
        ModalProps {
    handleConfirm: () => void;
}

export function ConfirmationModal(props: ConfirmationModalProps) {
    const { show, title, message, handleCancel, handleConfirm } = props;

    return (
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleConfirm();
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
