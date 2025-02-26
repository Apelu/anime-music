import { Modal, Button } from "react-bootstrap";
import { ModalState, ModalProps } from ".";

export interface FormModalFormComponentProps {
    formData: any;
    onChange: (event: any) => void;
}

export interface FormModalState extends ModalState {
    FormComponent: (props: FormModalFormComponentProps) => JSX.Element;
    formData: any;
}

export interface FormModalProps extends FormModalState, ModalProps {
    setFormData: (data: any) => void;
    handleFormSubmit: (data: any) => void;
}

export function FormModal(props: FormModalProps) {
    const {
        show,
        title,
        handleCancel,
        FormComponent,
        formData,
        setFormData,
        handleFormSubmit,
    } = props;

    function updateFormData(event: any) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormComponent formData={formData} onChange={updateFormData} />
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
