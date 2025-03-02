import {
    getSortIcon,
    SortType,
    ViewType,
    ViewTypeIcons,
} from "@data/constants";
import {
    DisplaySettingsActionType,
    DisplaySettingsContext,
    DisplaySettingsDispatchContext,
} from "@features/contexts/DisplaySettingsContext";
import TheUltimateDropdown, {
    TitleType,
} from "@features/ui/TheUltimateDropdown";
import {
    faClose,
    faFilter,
    faFilterCircleXmark,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import {
    Button,
    ButtonGroup,
    Container,
    Form,
    ToggleButton,
    ToggleButtonGroup,
} from "react-bootstrap";

function DisplaySettingsSubBar() {
    const displaySettings = useContext(DisplaySettingsContext);
    const dispatchDisplaySettings = useContext(DisplaySettingsDispatchContext);
    console.log(displaySettings);

    if (!displaySettings || !dispatchDisplaySettings) {
        return null;
    }

    return (
        <Container fluid className="pt-2 pb-2 bg-dark text-light mt-1">
            <div className=" d-flex align-items-end mb-2">
                {/* Sort By */}
                <div className="d-flex flex-column">
                    Sort By
                    <ButtonGroup className="me-2">
                        <TheUltimateDropdown
                            dropdownProps={{
                                as: ButtonGroup,
                            }}
                            toggleProps={{
                                variant: "primary",
                            }}
                            title={displaySettings.sortBy}
                            selectedItems={[displaySettings.sortBy]}
                            items={displaySettings.sortByOptions}
                            handleItemClick={(item: string) => {
                                dispatchDisplaySettings({
                                    type: DisplaySettingsActionType.HandleSortBySelection,
                                    payload: item,
                                });
                            }}
                        />

                        <Button
                            variant={"secondary"}
                            onClick={() =>
                                dispatchDisplaySettings({
                                    type: DisplaySettingsActionType.ToggleSortDirection,
                                })
                            }
                        >
                            <FontAwesomeIcon
                                icon={getSortIcon(
                                    SortType.Numeric,
                                    displaySettings.sortDirection
                                )}
                            />
                        </Button>
                    </ButtonGroup>
                </div>

                {/* Group By */}
                <div className="d-flex flex-column me-2">
                    Group By
                    <ButtonGroup>
                        <TheUltimateDropdown
                            dropdownProps={{
                                as: ButtonGroup,
                            }}
                            toggleProps={{
                                variant: "primary",
                            }}
                            titleType={TitleType.SelectedItems}
                            selectedItems={[displaySettings.groupBy]}
                            items={displaySettings.groupByOptions}
                            handleItemClick={(item: string) =>
                                dispatchDisplaySettings({
                                    type: DisplaySettingsActionType.HandleGroupBySelection,
                                    payload: item,
                                })
                            }
                        />

                        <Button
                            variant={"secondary"}
                            onClick={() =>
                                dispatchDisplaySettings({
                                    type: DisplaySettingsActionType.ToggleGroupDirection,
                                })
                            }
                        >
                            <FontAwesomeIcon
                                icon={getSortIcon(
                                    SortType.Alphabetical,
                                    displaySettings.groupDirection
                                )}
                            />
                        </Button>
                    </ButtonGroup>
                </div>

                {/* Toggle Filters */}
                <Button
                    variant={"outline-success"}
                    onClick={() =>
                        dispatchDisplaySettings({
                            type: DisplaySettingsActionType.ToggleIsFiltering,
                        })
                    }
                    title={
                        displaySettings.showingFilters
                            ? "Hide Filters"
                            : "Show Filters <Current Filter: " +
                              JSON.stringify(displaySettings.filter) +
                              ">"
                    }
                    className="position-relative"
                >
                    <FontAwesomeIcon
                        icon={
                            displaySettings.showingFilters
                                ? faFilterCircleXmark
                                : faFilter
                        }
                    />
                    {/* {Object.values(displaySettings.filter).filter(
                        it => it.length > 0
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
                                Object.values(displaySettings.filter).filter(
                                    it => it.length > 0
                                ).length
                            } 
                        </Badge>
                    )} */}
                </Button>

                {/* View Type */}
                <div className="d-flex flex-column align-items-center ms-auto me-2">
                    <ToggleButtonGroup
                        type="radio"
                        name="viewToggle"
                        defaultValue={displaySettings.viewType}
                        onChange={(e: any) => {
                            dispatchDisplaySettings({
                                type: DisplaySettingsActionType.HandleViewTypeChange,
                                payload: e.target.value,
                            });
                        }}
                    >
                        {Object.values(ViewType).map(viewType => (
                            <ToggleButton
                                key={viewType}
                                id={`tbg-radio-${viewType}`}
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
                    variant={"outline-success"}
                    onClick={() =>
                        dispatchDisplaySettings({
                            type: DisplaySettingsActionType.ToggleIsSearching,
                        })
                    }
                >
                    <FontAwesomeIcon
                        icon={displaySettings.isSearching ? faClose : faSearch}
                    />
                </Button>
            </div>

            {/* Search Bar */}
            {displaySettings.isSearching && (
                <>
                    Keyword Search
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="mb-2"
                        value={displaySettings.searchText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatchDisplaySettings({
                                type: DisplaySettingsActionType.HandleSearchTextUpdates,
                                payload: e.target.value,
                            })
                        }
                    />
                </>
            )}

            {/* Filters */}
            {/* {displaySettings.showingFilters && (
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
                                        displaySettings.filter[filterOption]
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
                                            displaySettings.filter[
                                                filterOption
                                            ];
                                        if (selectedItems.includes(item)) {
                                            // setDisplaySettings({
                                            //     ...displaySettings,
                                            //     filter: {
                                            //         ...displaySettings.filter,
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
                                            //     ...displaySettings,
                                            //     filter: {
                                            //         ...displaySettings.filter,
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
export default DisplaySettingsSubBar;
