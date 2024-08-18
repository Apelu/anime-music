import { DisplaySettingsProvider } from "@features/contexts/DisplaySettingsContext";
import { SubBarSettingsProvider } from "@features/contexts/SubBarContext";

function ProviderParent({ children }: { children: JSX.Element }) {
    return (
        <SubBarSettingsProvider>
            <DisplaySettingsProvider>{children}</DisplaySettingsProvider>
        </SubBarSettingsProvider>
    );
}

export default ProviderParent;
