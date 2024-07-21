import {
    faArrowLeft,
    faArrowRight,
    faArrowsDownToLine,
    faArrowsUpToLine,
    faCaretDown,
    faCaretUp,
    faCheck,
    faCheckCircle,
    faCircleUp,
    faCircleXmark,
    faClose,
    faDiagramNext,
    faEnvelope,
    faExpand,
    faEye,
    faFilter,
    faFilterCircleXmark,
    faForward,
    faGrip,
    faSearch,
    faTableList,
    faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    FormControl,
    ToggleButton,
    ToggleButtonGroup,
} from "react-bootstrap";
import { OrderDirectionButton } from "@pages/App";
import { faOpensuse } from "@fortawesome/free-brands-svg-icons";
import {
    FilterOptions,
    FormatOptions,
    GroupOptions,
    SortDirection,
    SortOptions,
    SortType,
    StatusOptions,
    TagOptions,
    ViewType,
} from "@data/constants";

function HrWithName({ name }: { name: string }) {
    return (
        <div className="d-flex align-items-center">
            <hr className="flex-grow-1" />
            <span className="m-2 text-center">{name}</span>
            <hr className="flex-grow-1" />
        </div>
    );
}

function TestFilter() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const handleItemClick = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(
                selectedItems.filter(selectedItem => selectedItem !== item)
            );
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <MultiSelectFilterDropdown
            title="Status"
            selectedItems={selectedItems}
            items={Object.values(StatusOptions)}
            handleItemClick={handleItemClick}
        />
    );
}

function MultiSelectFilterDropdown({
    title,
    selectedItems,
    items,
    handleItemClick,
}: {
    title?: string;
    selectedItems: string[];
    items: string[];
    handleItemClick: (item: string) => void;
}) {
    const [filterText, setFilterText] = useState("");

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
    };

    const filterItems = (items: string[]) => {
        return items.filter(item =>
            item.toLowerCase().includes(filterText.toLowerCase())
        );
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {title}{" "}
                {selectedItems.length > 0
                    ? `[${selectedItems.join(", ")}]`
                    : ""}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <FormControl
                    type="text"
                    placeholder="Filter"
                    value={filterText}
                    onChange={handleFilterChange}
                />
                {filterItems(items).map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        active={selectedItems.includes(item)}
                        onClick={() => handleItemClick(item)}
                    >
                        {selectedItems.includes(item) && (
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="me-2"
                            />
                        )}
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export function AnimeSubBar() {
    const [displaySettings, setDisplaySettings] = useState({
        isOpen: false,

        showingFilters: false,
        filter: {
            [FilterOptions.Status]: [] as string[],
            [FilterOptions.Format]: [] as string[],
            [FilterOptions.Tag]: [] as string[],
        },

        isSearching: false,
        searchText: "123",

        sortBy: SortOptions.LastAdded,
        sortDirection: SortDirection.Descending,

        groupBy: GroupOptions.None,
        groupDirection: SortDirection.Descending,

        viewType: ViewType.Card,
    });

    const toggleIsFiltering = () => {
        setDisplaySettings({
            ...displaySettings,
            showingFilters: !displaySettings.showingFilters,
        });
    };

    const toggleIsSearching = () => {
        setDisplaySettings({
            ...displaySettings,
            isSearching: !displaySettings.isSearching,
            searchText: "",
        });
    };

    const handleSearchTextUpdates = (newSearchText: string) => {
        setDisplaySettings({
            ...displaySettings,
            searchText: newSearchText,
        });
    };

    return (
        <div className="sticky-top">
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
            <div
                className="d-flex flex-column align-items-center justify-items-center bg-primary text-light"
                onClick={() =>
                    setDisplaySettings({
                        ...displaySettings,
                        isOpen: !displaySettings.isOpen,
                    })
                }
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

            {displaySettings.isOpen && (
                <Container fluid className="pt-2 pb-2 bg-dark text-light">
                    <div className=" d-flex align-items-end mb-2">
                        <div className="d-flex flex-column">
                            Sort By
                            <ButtonGroup className="me-2">
                                <DropdownButton
                                    as={ButtonGroup}
                                    title={displaySettings.sortBy}
                                >
                                    {Object.values(SortOptions).map(option => (
                                        <Dropdown.Item
                                            key={option}
                                            onClick={() =>
                                                setDisplaySettings({
                                                    ...displaySettings,
                                                    sortBy: option,
                                                })
                                            }
                                        >
                                            {option}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>

                                <OrderDirectionButton
                                    sortDirection={
                                        displaySettings.sortDirection
                                    }
                                    sortType={SortType.Numeric}
                                    handleFlipDirection={() =>
                                        setDisplaySettings({
                                            ...displaySettings,
                                            sortDirection:
                                                displaySettings.sortDirection ===
                                                SortDirection.Ascending
                                                    ? SortDirection.Descending
                                                    : SortDirection.Ascending,
                                        })
                                    }
                                />
                            </ButtonGroup>
                        </div>

                        <div className="d-flex flex-column me-2">
                            Group By
                            <ButtonGroup>
                                <DropdownButton
                                    as={ButtonGroup}
                                    title={displaySettings.groupBy}
                                >
                                    {Object.values(GroupOptions).map(
                                        groupType => (
                                            <Dropdown.Item
                                                key={groupType}
                                                onClick={() =>
                                                    setDisplaySettings({
                                                        ...displaySettings,
                                                        groupBy: groupType,
                                                    })
                                                }
                                            >
                                                {groupType}
                                            </Dropdown.Item>
                                        )
                                    )}
                                </DropdownButton>

                                <OrderDirectionButton
                                    sortDirection={
                                        displaySettings.groupDirection
                                    }
                                    sortType={SortType.Alphabetical}
                                    handleFlipDirection={() =>
                                        setDisplaySettings({
                                            ...displaySettings,
                                            groupDirection:
                                                displaySettings.groupDirection ===
                                                SortDirection.Ascending
                                                    ? SortDirection.Descending
                                                    : SortDirection.Ascending,
                                        })
                                    }
                                />
                            </ButtonGroup>
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={toggleIsFiltering}
                            title={
                                displaySettings.showingFilters
                                    ? "Hide Filters"
                                    : "Show Filters"
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

                        <div className="d-flex flex-column align-items-center ms-auto me-2">
                            <ViewTypeSelection
                                viewType={displaySettings.viewType}
                                handleViewTypeChange={newValue => {
                                    setDisplaySettings({
                                        ...displaySettings,
                                        viewType: newValue,
                                    });
                                }}
                            />
                        </div>

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

                    {displaySettings.showingFilters && (
                        <>
                            <HrWithName name="Filters" />
                            <div className="d-flex flex-wrap">
                                {Object.values(FilterOptions).map(
                                    filterOption => (
                                        <div className="d-flex flex-column me-2">
                                            {filterOption}
                                            <MultiSelectFilterDropdown
                                                title={filterOption}
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

                                {/* }
                                <div className="d-flex flex-column me-2">
                                    Status
                                    <MultiSelectFilterDropdown
                                        title="Status"
                                        selectedItems={
                                            displaySettings.filter["Status"] ||
                                            []
                                        }
                                        items={Object.values(StatusOptions)}
                                        handleItemClick={handleItemClick}
                                    />
                                    
                                </div>

                                <div className="d-flex flex-column me-2">
                                    Format
                                    <MultiSelectFilterDropdown
                                        title="Format"
                                        selectedItems={selectedItems}
                                        items={Object.values(FormatOptions)}
                                        handleItemClick={handleItemClick}
                                    />
                                </div>

                                <div className="d-flex flex-column me-2">
                                    Tags
                                    <MultiSelectFilterDropdown
                                        title="Tags"
                                        selectedItems={selectedItems}
                                        items={Object.values(TagOptions)}
                                        handleItemClick={handleItemClick}
                                    />
                                </div> */}
                            </div>
                        </>
                    )}

                    {/* {JSON.stringify(displaySettings, null, 2)} */}
                </Container>
            )}
        </div>
    );
}

function ViewTypeSelection({
    viewType,
    handleViewTypeChange,
}: {
    viewType: ViewType;
    handleViewTypeChange: (newValue: ViewType) => void;
}) {
    const options = [
        {
            id: ViewType.Card,
            label: (
                <>
                    <FontAwesomeIcon icon={faGrip} /> Card
                </>
            ),
            value: ViewType.Card,
        },
        {
            id: ViewType.List,
            label: (
                <>
                    <FontAwesomeIcon icon={faTableList} /> List
                </>
            ),
            value: ViewType.List,
        },
    ];

    return (
        <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue={options[0].value}
            onChange={newValue => handleViewTypeChange(newValue)}
        >
            {options.map(option => (
                <ToggleButton
                    key={option.id}
                    id={`tbg-radio-${option.id}`}
                    value={option.value}
                    variant="outline-success"
                >
                    {option.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
