import { DisplaySettingsProvider } from "@features/contexts/DisplaySettingsContext";
import { SubBarSettingsProvider } from "@features/contexts/SubBarContext";
import { AnimeProvider } from "@features/contexts/AnimeContext";
import { ToastProvider } from "@features/contexts/TemplateContext";

function ProviderParent({ children }: { children: JSX.Element }) {
    return (
        <ToastProvider>
            <AnimeProvider>
                <SubBarSettingsProvider>
                    <DisplaySettingsProvider>
                        {children}
                    </DisplaySettingsProvider>
                </SubBarSettingsProvider>
            </AnimeProvider>
        </ToastProvider>
    );
}

export default ProviderParent;
