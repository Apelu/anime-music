import {
    AniListFilterOptions,
    AniListFormatOptions,
    getSortIcon,
    AniListGroupOptions,
    SortDirection,
    AniListSortOptions,
    SortType,
    AniListStatusOptions,
    AniListTagOptions,
    ViewType,
    ViewTypeIcons,
} from "@data/constants";
import { Feature, FeatureStatus } from "@features/documentation/constants";
import HrWithName from "@features/ui/HrWithName";
import TheUltimateDropdown, {
    TitleType,
} from "@features/ui/TheUltimateDropdown";
import {
    faArrowLeft,
    faArrowRight,
    faArrowsDownToLine,
    faArrowsUpToLine,
    faClose,
    faFilter,
    faFilterCircleXmark,
    faPhotoFilm,
    faSearch,
    faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Container,
    Form,
    ToggleButton,
    ToggleButtonGroup,
} from "react-bootstrap";
import DisplaySettingsSubBar from "./DisplaySettingsSubBar";
import {
    SubBarActionType,
    SubBarSettingsContext,
    SubBarSettingsDispatchContext,
} from "@features/contexts/SubBarContext";

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

function SubBar({
    currentItemIndex,
    nextBackgroundItem,
    previousBackgroundItem,
}: {
    currentItemIndex: number;
    nextBackgroundItem: () => void;
    previousBackgroundItem: () => void;
}) {
    const subBarSettings = useContext(SubBarSettingsContext);
    const displatchSubBarSettings = useContext(SubBarSettingsDispatchContext);
    if (!subBarSettings || !displatchSubBarSettings) {
        return null;
    }

    const { isOpen } = subBarSettings;
    return (
        <div className="sticky-top">
            {/* Fix white line */}
            {/* <div
                style={{
                    position: "absolute",
                    top: -1,
                    left: 0,
                    right: 0,
                    height: "1px",
                }}
                className="bg-primary"
            ></div> */}

            {/* SubBar Actions Bar */}
            <div
                className="d-flex flex-column align-items-center justify-items-center text-light"
                // bg-primary
                onClick={() =>
                    displatchSubBarSettings(
                        subBarSettings.isOpen
                            ? { type: SubBarActionType.Close }
                            : { type: SubBarActionType.Open }
                    )
                }
                style={{
                    backgroundColor: "transparent",
                }}
            >
                <div className="d-flex flex-row">
                    <FontAwesomeIcon
                        title={"Previous Background <" + currentItemIndex + ">"}
                        icon={faArrowLeft}
                        className="btn btn-sm text-secondary p-0 ps-2 pe-2 ms-3 me-2 me-3"
                        onClick={e => {
                            previousBackgroundItem();
                            e.stopPropagation();
                        }}
                    />

                    <FontAwesomeIcon
                        title={"Toggle Visiblity"}
                        icon={faPhotoFilm}
                        className="btn btn-sm text-secondary p-0 ps-2 pe-2 ms-3 me-2 me-3"
                        onClick={e => e.stopPropagation()}
                    />
                    <FontAwesomeIcon
                        title={isOpen ? "Close SubBar" : "Open SubBar"}
                        icon={isOpen ? faArrowsUpToLine : faArrowsDownToLine}
                        className="btn btn-sm text-secondary p-0 ps-2 pe-2 ms-3 me-2 me-3"
                    />
                    <FontAwesomeIcon
                        title={"Watch Sites"}
                        icon={faTv}
                        className="btn btn-sm text-secondary p-0 ps-2 pe-2 ms-3 me-2 me-3"
                        onClick={e => e.stopPropagation()}
                    />

                    <FontAwesomeIcon
                        title={"Next Background <" + currentItemIndex + ">"}
                        icon={faArrowRight}
                        className="btn btn-sm text-secondary p-0 ps-2 pe-2 ms-3 me-2 me-3"
                        onClick={e => {
                            nextBackgroundItem();
                            e.stopPropagation();
                        }}
                    />
                </div>
            </div>

            {/* SubBar */}
            {isOpen && <DisplaySettingsSubBar />}
        </div>
    );
}

export default SubBar;
