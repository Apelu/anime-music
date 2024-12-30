import { DisplaySettingsProvider } from "@features/contexts/DisplaySettingsContext";
import { SubBarSettingsProvider } from "@features/contexts/SubBarContext";
import { AnimeProvider } from "@features/contexts/TemplateContext";

function ProviderParent({ children }: { children: JSX.Element }) {
    return (
        <AnimeProvider>
            <SubBarSettingsProvider>
                <DisplaySettingsProvider>{children}</DisplaySettingsProvider>
            </SubBarSettingsProvider>
        </AnimeProvider>
    );
}

export default ProviderParent;
