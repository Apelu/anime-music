import {
    getSortIcon,
    SortDirection,
    SortType,
    ViewType,
    ViewTypeIcons,
} from "@data/constants";
import TheUltimateDropdown from "@features/ui/TheUltimateDropdown";
import {
    faClose,
    faFilter,
    faFilterCircleXmark,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Container,
    Form,
    ToggleButton,
    ToggleButtonGroup,
} from "react-bootstrap";

export interface AnimeContainerSettingsSubBarProps {
    id: string;
    settings: AnimeContainerSettings;
    updateSettings: (action: AnimeContainerSettingsAction) => void;
}

function AnimeContainerSettingsSubBar(
    props: AnimeContainerSettingsSubBarProps
) {
    const { id, settings, updateSettings } = props;
    return (
        <Container fluid className="bg-dark text-light">
            <div className=" d-flex align-items-end mb-2">
                {/* Sort By */}
                <div className="ms-auto d-flex flex-column">
                    Sort By
                    <ButtonGroup className="me-2">
                        <TheUltimateDropdown
                            dropdownProps={{
                                as: ButtonGroup,
                            }}
                            toggleProps={{
                                variant: "primary",
                            }}
                            title={settings.sortBy}
                            selectedItems={[settings.sortBy]}
                            items={settings.sortByOptions}
                            handleItemClick={(item: string) => {
                                updateSettings({
                                    type: AnimeContainerSettingsActionType.HandleSortBySelection,
                                    payload: item,
                                });
                            }}
                        />

                        <Button
                            variant={"secondary"}
                            onClick={() =>
                                updateSettings({
                                    type: AnimeContainerSettingsActionType.ToggleSortDirection,
                                })
                            }
                        >
                            <FontAwesomeIcon
                                icon={getSortIcon(
                                    SortType.Numeric,
                                    settings.sortDirection
                                )}
                            />
                        </Button>
                    </ButtonGroup>
                </div>

                {/* Toggle Filters */}
                <Button
                    variant={"outline-success"}
                    onClick={() =>
                        updateSettings({
                            type: AnimeContainerSettingsActionType.ToggleIsFiltering,
                        })
                    }
                    title={
                        settings.showingFilters
                            ? "Hide Filters"
                            : "Show Filters <Current Filter: " +
                              JSON.stringify(settings.filter) +
                              ">"
                    }
                    className="position-relative"
                >
                    <FontAwesomeIcon
                        icon={
                            settings.showingFilters
                                ? faFilterCircleXmark
                                : faFilter
                        }
                    />
                    {Object.values(settings.filter).filter(
                        (it: any) => it.length > 0
                    ).length > 0 && (
                        <Badge
                            pill
                            bg="secondary"
                            text="dark"
                            className="position-absolute top-0 end-0"
                            style={{
                                marginTop: "-16px",
                                marginRight: "-16px",
                                zIndex: 10,
                            }}
                        >
                            {
                                Object.values(settings.filter).filter(
                                    (it: any) => it.length > 0
                                ).length
                            }
                        </Badge>
                    )}
                </Button>

                {/* View Type */}
                <div className="d-flex flex-column align-items-center ms-2">
                    <ToggleButtonGroup
                        type="radio"
                        name={`tbg-radio-${id}`}
                        defaultValue={settings.viewType}
                        onChange={(viewType: ViewType) => {
                            updateSettings({
                                type: AnimeContainerSettingsActionType.HandleViewTypeChange,
                                payload: viewType,
                            });
                        }}
                    >
                        {Object.values(ViewType).map(viewType => (
                            <ToggleButton
                                key={viewType}
                                id={`tbg-radio-${viewType}-${id}`}
                                value={viewType}
                                variant="outline-success"
                            >
                                <FontAwesomeIcon
                                    icon={ViewTypeIcons[viewType]}
                                />{" "}
                                {viewType}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>

                {/* Toggle Search */}
                <Button
                    className="ms-2 me-auto"
                    variant={"outline-success"}
                    onClick={() =>
                        updateSettings({
                            type: AnimeContainerSettingsActionType.ToggleIsSearching,
                        })
                    }
                >
                    <FontAwesomeIcon
                        icon={settings.isSearching ? faClose : faSearch}
                    />
                </Button>
            </div>

            {/* Search Bar */}
            {settings.isSearching && (
                <>
                    <Form.Control
                        type="search"
                        placeholder="Keyword Search"
                        className="mb-2"
                        value={settings.searchText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateSettings({
                                type: AnimeContainerSettingsActionType.HandleSearchTextUpdates,
                                payload: e.target.value,
                            })
                        }
                    />
                </>
            )}

            {/* Filters */}
            {/* {settings.showingFilters && (
                <>
                    <HrWithName name="Filters" />
                    <div className="d-flex flex-wrap">
                        {Object.values(FilterOptions).map(filterOption => (
                            <div className="d-flex flex-column me-2">
                                {filterOption}
                                <TheUltimateDropdown
                                    dropdownProps={{
                                        as: ButtonGroup,
                                    }}
                                    toggleProps={{
                                        variant: "success",
                                    }}
                                    title={filterOption}
                                    titleType={TitleType.Both}
                                    selectedItems={
                                        settings.filter[filterOption]
                                    }
                                    items={Object.values(
                                        filterOption === FilterOptions.Status
                                            ? StatusOptions
                                            : filterOption ===
                                              FilterOptions.Format
                                            ? FormatOptions
                                            : filterOption === FilterOptions.Tag
                                            ? TagOptions
                                            : {}
                                    )}
                                    handleItemClick={(item: string) => {
                                        var selectedItems =
                                            settings.filter[
                                                filterOption
                                            ];
                                        if (selectedItems.includes(item)) {
                                            // setDisplaySettings({
                                            //     ...settings,
                                            //     filter: {
                                            //         ...settings.filter,
                                            //         [filterOption]:
                                            //             selectedItems.filter(
                                            //                 selectedItem =>
                                            //                     selectedItem !==
                                            //                     item
                                            //             ),
                                            //     },
                                            // });
                                        } else {
                                            // setDisplaySettings({
                                            //     ...settings,
                                            //     filter: {
                                            //         ...settings.filter,
                                            //         [filterOption]: [
                                            //             ...selectedItems,
                                            //             item,
                                            //         ],
                                            //     },
                                            // });
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )} */}
        </Container>
    );
}

export enum AnimeContainerSettingsActionType {
    SetSortByOptions = "SetSortByOptions",
    ToggleIsFiltering = "ToggleIsFiltering",
    ToggleIsSearching = "ToggleIsSearching",
    HandleSearchTextUpdates = "HandleSearchTextUpdates",
    HandleViewTypeChange = "HandleViewTypeChange",
    ToggleGroupDirection = "ToggleGroupDirection",
    HandleGroupBySelection = "HandleGroupBySelection",
    ToggleSortDirection = "ToggleSortDirection",
    HandleSortBySelection = "HandleSortBySelection",
}

export interface AnimeContainerSettingsAction {
    type:
        | AnimeContainerSettingsActionType.SetSortByOptions
        | AnimeContainerSettingsActionType.ToggleIsFiltering
        | AnimeContainerSettingsActionType.ToggleIsSearching
        | AnimeContainerSettingsActionType.HandleSearchTextUpdates
        | AnimeContainerSettingsActionType.HandleViewTypeChange
        | AnimeContainerSettingsActionType.ToggleGroupDirection
        | AnimeContainerSettingsActionType.HandleGroupBySelection
        | AnimeContainerSettingsActionType.ToggleSortDirection
        | AnimeContainerSettingsActionType.HandleSortBySelection;
    payload?: any;
}

export interface AnimeContainerSettings {
    isOpen: boolean;
    showingFilters: boolean;
    filter: any;

    isSearching: boolean;
    searchText: string;

    sortBy: string;
    sortByOptions: string[];
    sortDirection: SortDirection;

    viewType: ViewType;
}
export default AnimeContainerSettingsSubBar;
