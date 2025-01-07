import { ToastData, useToastData } from "@features/contexts/TemplateContext";
import { ToastContainer, Toast } from "react-bootstrap";

export function GlobalToastContainer() {
    const toasts = useToastData();
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "5px",
                overflow: "hidden",
                maxHeight: "100vh",
                overflowY: "auto",
                borderRadius: "5px",
                zIndex: 999999999999999,
            }}
        >
            <ToastContainer className="position-static">
                {toasts.map((toast: ToastData) => {
                    return (
                        <Toast show={toast.hideAfterTimestamp > Date.now()}>
                            <Toast.Header>
                                <strong className="me-auto">
                                    {toast.title}
                                </strong>
                            </Toast.Header>
                            <Toast.Body className="text-dark">
                                {toast.body}
                            </Toast.Body>
                        </Toast>
                    );
                })}
            </ToastContainer>
        </div>
    );
}
