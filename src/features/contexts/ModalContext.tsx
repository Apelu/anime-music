import { UpdateContainerPayload } from "@features/local-anime/Modal";
import { createContext, useContext, useReducer } from "react";

const ModalContext = createContext<ShowingModal | null>(null);
const ModalDispatchContext = createContext<React.Dispatch<ModalAction> | null>(
    null
);

export function ModalProvider({ children }: { children: JSX.Element }) {
    const [modalState, dispatch] = useReducer(
        modalReducer,
        initialShowingModal
    );

    return (
        <ModalContext.Provider value={modalState}>
            <ModalDispatchContext.Provider value={dispatch}>
                {children}
            </ModalDispatchContext.Provider>
        </ModalContext.Provider>
    );
}

export function useShowingModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useShowingModal must be used within a ModalProvider");
    }
    return context;
}

export function useSetShowingModalDispatch() {
    const context = useContext(ModalDispatchContext);
    if (!context) {
        throw new Error(
            "useSetShowingModalDispatch must be used within a ModalProvider"
        );
    }
    return context;
}

function modalReducer(data: ShowingModal, action: ModalAction) {
    switch (action.type) {
        case ModalActionType.Placeholder:
            return {
                ...data,
                // payload: action.payload,
            };
        case ModalActionType.CreateNewContainer:
            return {
                type: ModalActionType.CreateNewContainer,
            };
        case ModalActionType.UpdateContainer:
            return {
                type: ModalActionType.UpdateContainer,
                payload: action.payload,
            };
        case ModalActionType.ClearModal:
            return {
                type: null,
            };
        default:
            throw new Error("Unknown action type");
    }
}

export enum ModalActionType {
    Placeholder = "Placeholder",
    CreateNewContainer = "CreateNewContainer",
    UpdateContainer = "UpdateContainer",
    ClearModal = "ClearModal",
}

interface ModalAction {
    type: ModalActionType;
    payload?: UpdateContainerPayload;
}

interface ShowingModal {
    type: ModalActionType | null;
    payload?: UpdateContainerPayload;
}

const initialShowingModal: ShowingModal = {
    type: null,
    payload: undefined,
};
