import { DisplaySettingsProvider } from "@features/contexts/DisplaySettingsContext";
import { SubBarSettingsProvider } from "@features/contexts/SubBarContext";
import { AnimeProvider } from "@features/contexts/AnimeContext";
import { ToastProvider } from "@features/contexts/ToastContext";
import { UserProvider } from "./UserContext";
import { ModalProvider } from "./ModalContext";

function ProviderParent({ children }: { children: JSX.Element }) {
    return (
        <ModalProvider>
            <ToastProvider>
                <AnimeProvider>
                    <SubBarSettingsProvider>
                        <DisplaySettingsProvider>
                            <UserProvider>{children}</UserProvider>
                        </DisplaySettingsProvider>
                    </SubBarSettingsProvider>
                </AnimeProvider>
            </ToastProvider>
        </ModalProvider>
    );
}

export default ProviderParent;
