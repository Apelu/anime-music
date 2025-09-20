import { DisplaySettingsProvider } from "@features/contexts/DisplaySettingsContext";
import { SubBarSettingsProvider } from "@features/contexts/SubBarContext";
import { AnimeProvider } from "@features/contexts/AnimeContext";
import { UserProvider } from "../UserContext";
import { ModalProvider } from "../ModalContext";

function ProviderParent({ children }: { children: JSX.Element }) {
    return (
        <ModalProvider>
            <AnimeProvider>
                <SubBarSettingsProvider>
                    <DisplaySettingsProvider>
                        <UserProvider>{children}</UserProvider>
                    </DisplaySettingsProvider>
                </SubBarSettingsProvider>
            </AnimeProvider>
        </ModalProvider>
    );
}

export default ProviderParent;
