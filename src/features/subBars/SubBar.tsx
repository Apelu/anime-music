import {
    SubBarActionType,
    SubBarSettingsContext,
    SubBarSettingsDispatchContext,
} from "@features/contexts/SubBarContext";
import { Feature, FeatureStatus } from "@features/documentation/constants";
import {
    faArrowsDownToLine,
    faArrowsUpToLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import AnimeContainerSettingsSubBar, {
    AnimeContainerSettings,
    AnimeContainerSettingsAction,
    AnimeContainerSettingsSubBarProps,
} from "./AnimeContainerSettingsSubBar";
import { set } from "video.js/dist/types/tech/middleware";

export const AnimeSubBarFeature: Feature = {
    title: "Anime SubBar",
    description:
        "A small menu right below the NavBar that displays quick actions for the current page without taking up a lot of space.",
    status: FeatureStatus.InProgress,
    subfeatures: [
        {
            title: "Sort By",
            description: "Sort the anime by [Sort By] in [Sort Direction]",
            status: FeatureStatus.InProgress,
        },
        {
            title: "Group By",
            description: "Group the anime by [Group By] in [Group Direction]",
            status: FeatureStatus.InProgress,
        },
        {
            title: "Filters",
            description: "Filter the anime by [Status, Format, Tag]",
            status: FeatureStatus.InProgress,
        },
        {
            title: "View Type",
            description: "Change the view type [Card, List, Carousel]",
            status: FeatureStatus.InProgress,
        },
        {
            title: "Search",
            description: "Search for anime by [Search Text]",
            status: FeatureStatus.InProgress,
        },
    ],
};

interface SubBarProps {
    id: string;
    settings: AnimeContainerSettings;
    updateSettings: (action: AnimeContainerSettingsAction) => void;
    toggleOpen: () => void;
}
function SubBar(props: SubBarProps) {
    const {
        id,
        settings,
        settings: { isOpen },
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
                        title={isOpen ? "Close SubBar" : "Open SubBar"}
                        icon={isOpen ? faArrowsUpToLine : faArrowsDownToLine}
                        className="btn btn-sm text-secondary p-0 ps-2 pe-2 ms-3 me-2 me-3"
                    />
                </div>
            </div>

            {/* SubBar */}
            {isOpen && (
                <AnimeContainerSettingsSubBar
                    id={id}
                    settings={settings}
                    updateSettings={updateSettings}
                />
            )}
        </div>
    );
}

export default SubBar;
