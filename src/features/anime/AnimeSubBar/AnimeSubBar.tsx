import {
    FilterOptions,
    FormatOptions,
    getSortIcon,
    GroupOptions,
    SortDirection,
    SortOptions,
    SortType,
    StatusOptions,
    TagOptions,
    ViewType,
    ViewTypeIcons,
} from "@data/constants";
import HrWithName from "@features/ui/HrWithName";
import TheUltimateDropdown, {
    TitleType,
} from "@features/ui/TheUltimateDropdown";
import {
    faArrowDown91,
    faArrowDownAZ,
    faArrowDownWideShort,
    faArrowDownZA,
    faArrowLeft,
    faArrowRight,
    faArrowsDownToLine,
    faArrowsUpToLine,
    faArrowUp91,
    faArrowUpWideShort,
    faArrowUpZA,
    faCheckCircle,
    faCircleCheck,
    faClose,
    faEye,
    faFilter,
    faFilterCircleXmark,
    faGrip,
    faSearch,
    faTableList,
    faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    Button,
    Dropdown,
    FormControl,
    ToggleButtonGroup,
    ToggleButton,
    Container,
    ButtonGroup,
    DropdownButton,
    Badge,
    Form,
} from "react-bootstrap";

function AnimeSubBar() {
    const [displaySettings, setDisplaySettings] = useState({
        isOpen: true,

        showingFilters: true,
        filter: {
            [FilterOptions.Status]: [] as string[],
            [FilterOptions.Format]: [] as string[],
            [FilterOptions.Tag]: [] as string[],
        },

        isSearching: true,
        searchText: "123",

        sortBy: SortOptions.LastAdded,
        sortDirection: SortDirection.Descending,

        groupBy: GroupOptions.None,
        groupDirection: SortDirection.Descending,

        viewType: ViewType.Card,
    });

    return (
        <div className="sticky-top">
            {/* Fix white line */}
            <div
                style={{
                    position: "absolute",
                    top: -1,
                    left: 0,
                    right: 0,
                    height: "1px",
                }}
                className="bg-primary"
            ></div>

            {/* SubBar Actions Bar */}
            <div
                className="d-flex flex-column align-items-center justify-items-center bg-primary text-light"
                onClick={toggleSubBarVisibility()}
            >
                <div className="d-flex flex-row">
                    <FontAwesomeIcon
                        title={"Previous Background"}
                        icon={faArrowLeft}
                        className="btn btn-sm text-secondary p-0 ms-5 me-5"
                        onClick={e => e.stopPropagation()}
                    />

                    <FontAwesomeIcon
                        title={"Toggle Visiblity"}
                        icon={faEye}
                        className="btn btn-sm text-secondary p-0 ms-5 me-5"
                        onClick={e => e.stopPropagation()}
                    />
                    <FontAwesomeIcon
                        title={
                            displaySettings.isOpen
                                ? "Close SubBar"
                                : "Open SubBar"
                        }
                        icon={
                            displaySettings.isOpen
                                ? faArrowsUpToLine
                                : faArrowsDownToLine
                        }
                        className="btn btn-sm text-secondary p-0 ms-5 me-5"
                    />
                    <FontAwesomeIcon
                        title={"Watch Sites"}
                        icon={faTv}
                        className="btn btn-sm text-secondary p-0 ms-5 me-5"
                        onClick={e => e.stopPropagation()}
                    />

                    <FontAwesomeIcon
                        title={"Next Background"}
                        icon={faArrowRight}
                        className="btn btn-sm text-secondary p-0 ms-5 me-5"
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            </div>

            {/* SubBar */}
            {displaySettings.isOpen && (
                <Container fluid className="pt-2 pb-2 bg-dark text-light">
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
                                    items={Object.values(SortOptions)}
                                    handleItemClick={handleSortBySelection()}
                                />

                                <Button
                                    variant={"secondary"}
                                    onClick={toggleSortDirection()}
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
                                    items={Object.values(GroupOptions)}
                                    handleItemClick={handleGroupBySelection()}
                                />

                                <Button
                                    variant={"secondary"}
                                    onClick={toggleGroupDirection()}
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
                            onClick={toggleIsFiltering}
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
                            {Object.values(displaySettings.filter).filter(
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
                                        Object.values(
                                            displaySettings.filter
                                        ).filter(it => it.length > 0).length
                                    }
                                </Badge>
                            )}
                        </Button>

                        {/* View Type */}
                        <div className="d-flex flex-column align-items-center ms-auto me-2">
                            <ToggleButtonGroup
                                type="radio"
                                name="viewToggle"
                                defaultValue={displaySettings.viewType}
                                onChange={handleViewTypeChange()}
                            >
                                {Object.values(ViewType).map(viewType => (
                                    <ToggleButton
                                        key={viewType}
                                        id={`tbg-radio-${viewType}`}
                                        value={viewType}
                                        variant="outline-success"
                                    >
                                        {viewType}{" "}
                                        <FontAwesomeIcon
                                            icon={ViewTypeIcons[viewType]}
                                        />
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </div>

                        {/* Toggle Search */}
                        <Button
                            variant={"outline-success"}
                            onClick={toggleIsSearching}
                        >
                            <FontAwesomeIcon
                                icon={
                                    displaySettings.isSearching
                                        ? faClose
                                        : faSearch
                                }
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
                                onChange={e =>
                                    handleSearchTextUpdates(e.target.value)
                                }
                            />
                        </>
                    )}

                    {/* Filters */}
                    {displaySettings.showingFilters && (
                        <>
                            <HrWithName name="Filters" />
                            <div className="d-flex flex-wrap">
                                {Object.values(FilterOptions).map(
                                    filterOption => (
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
                                                    displaySettings.filter[
                                                        filterOption
                                                    ]
                                                }
                                                items={Object.values(
                                                    filterOption ===
                                                        FilterOptions.Status
                                                        ? StatusOptions
                                                        : filterOption ===
                                                          FilterOptions.Format
                                                        ? FormatOptions
                                                        : filterOption ===
                                                          FilterOptions.Tag
                                                        ? TagOptions
                                                        : {}
                                                )}
                                                handleItemClick={(
                                                    item: string
                                                ) => {
                                                    var selectedItems =
                                                        displaySettings.filter[
                                                            filterOption
                                                        ];
                                                    if (
                                                        selectedItems.includes(
                                                            item
                                                        )
                                                    ) {
                                                        setDisplaySettings({
                                                            ...displaySettings,
                                                            filter: {
                                                                ...displaySettings.filter,
                                                                [filterOption]:
                                                                    selectedItems.filter(
                                                                        selectedItem =>
                                                                            selectedItem !==
                                                                            item
                                                                    ),
                                                            },
                                                        });
                                                    } else {
                                                        setDisplaySettings({
                                                            ...displaySettings,
                                                            filter: {
                                                                ...displaySettings.filter,
                                                                [filterOption]:
                                                                    [
                                                                        ...selectedItems,
                                                                        item,
                                                                    ],
                                                            },
                                                        });
                                                    }
                                                }}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </Container>
            )}
        </div>
    );

    function toggleIsFiltering() {
        setDisplaySettings({
            ...displaySettings,
            showingFilters: !displaySettings.showingFilters,
        });
    }

    function toggleIsSearching() {
        setDisplaySettings({
            ...displaySettings,
            isSearching: !displaySettings.isSearching,
            searchText: "",
        });
    }

    function handleSearchTextUpdates(newSearchText: string) {
        setDisplaySettings({
            ...displaySettings,
            searchText: newSearchText,
        });
    }

    function handleViewTypeChange():
        | ((value: any, event: any) => void)
        | undefined {
        return newValue => {
            setDisplaySettings({
                ...displaySettings,
                viewType: newValue,
            });
        };
    }

    function toggleGroupDirection() {
        return () =>
            setDisplaySettings({
                ...displaySettings,
                groupDirection:
                    displaySettings.groupDirection === SortDirection.Ascending
                        ? SortDirection.Descending
                        : SortDirection.Ascending,
            });
    }

    function handleGroupBySelection(): ((item: string) => void) | undefined {
        return (item: string) => {
            setDisplaySettings({
                ...displaySettings,
                groupBy: item as GroupOptions,
            });
        };
    }

    function toggleSortDirection() {
        return () =>
            setDisplaySettings({
                ...displaySettings,
                sortDirection:
                    displaySettings.sortDirection === SortDirection.Ascending
                        ? SortDirection.Descending
                        : SortDirection.Ascending,
            });
    }

    function handleSortBySelection(): ((item: string) => void) | undefined {
        return (item: string) => {
            setDisplaySettings({
                ...displaySettings,
                sortBy: item as SortOptions,
            });
        };
    }

    function toggleSubBarVisibility() {
        return () =>
            setDisplaySettings({
                ...displaySettings,
                isOpen: !displaySettings.isOpen,
            });
    }
}

export default AnimeSubBar;
