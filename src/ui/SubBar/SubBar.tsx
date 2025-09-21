import { AnimeContainerAction } from "@features/local-anime/LocalAnimeHome/AnimeContainer";
import {
    faArrowsDownToLine,
    faArrowsUpToLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimeContainerSettingsSubBar, {
    AnimeContainerSettings,
} from "./AnimeContainerSettingsSubBar";

interface SubBarProps {
    id: string;
    animeContainer: AnimeContainerSettings;
    updateSettings: (action: AnimeContainerAction) => void;
    toggleOpen: () => void;
}
function SubBar(props: SubBarProps) {
    const {
        id,
        animeContainer,
        animeContainer: { subBarIsOpen },
        updateSettings,
        toggleOpen,
    } = props;

    return (
        <div className="sticky-top bg-dark w-100">
            {/* SubBar Actions Bar */}
            <div
                className="d-flex flex-column align-items-center justify-items-center text-light"
                // bg-primary
                onClick={() => toggleOpen()}
                style={{
                    backgroundColor: "transparent",
                }}
            >
                <div className="d-flex flex-row">
                    <FontAwesomeIcon
                        title={subBarIsOpen ? "Close SubBar" : "Open SubBar"}
                        icon={
                            subBarIsOpen ? faArrowsUpToLine : faArrowsDownToLine
                        }
                        className="btn btn-sm text-secondary p-0 ps-2 pe-2 ms-3 me-2 me-3"
                    />
                </div>
            </div>

            {/* SubBar */}
            {subBarIsOpen && (
                <AnimeContainerSettingsSubBar
                    id={id}
                    animeContainer={animeContainer}
                    updateSettings={updateSettings}
                />
            )}
        </div>
    );
}

export default SubBar;
