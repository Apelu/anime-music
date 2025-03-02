export const enum ModalType {
    Confirm = "Confirm",
    Form = "Form",
}

export interface ModalState {
    show: boolean;
    title: any;
    // type: ModalType;
}

export interface ModalProps extends ModalState {
    handleCancel: () => void;
}

export interface UpdateContainerPayload {
    containerID: string;
}

// export interface ShowingModal {
//     name: "Create new Container" | "Update Container";
//     payload?: UpdateContainerPayload;
// }
