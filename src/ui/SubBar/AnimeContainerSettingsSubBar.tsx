import {
    getSortIcon,
    SortDirection,
    SortType,
    ViewType,
    ViewTypeIcons,
} from "../../utils/constants";
import {
    AnimeContainerAction,
    AnimeContainerActionType,
} from "@features/local-anime/LocalAnimeHome/AnimeContainer";
import TheUltimateDropdown, { TitleType } from "@ui/TheUltimateDropdown";
import {
    faClose,
    faFilter,
    faFilterCircleXmark,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    FilterOperation,
    FilterTemplate,
    SortOptionTypes,
} from "@shared/constant";
import { useState } from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Container,
    Form,
    FormControl,
    FormGroup,
    InputGroup,
    ToggleButton,
    ToggleButtonGroup,
} from "react-bootstrap";

export interface AnimeContainerSettingsSubBarProps {
    id: string;
    animeContainer: AnimeContainerSettings;
    updateSettings: (action: AnimeContainerAction) => void;
}

function AnimeContainerSettingsSubBar(
    props: AnimeContainerSettingsSubBarProps
) {
    const { id, animeContainer, updateSettings } = props;
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
                            title={animeContainer.sortBy}
                            selectedItems={[animeContainer.sortBy]}
                            items={animeContainer.sortByOptions}
                            handleItemClick={(item: string) => {
                                updateSettings({
                                    type: AnimeContainerActionType.HandleSortBySelection,
                                    payload: item,
                                });
                            }}
                        />

                        <Button
                            variant={"secondary"}
                            onClick={() =>
                                updateSettings({
                                    type: AnimeContainerActionType.ToggleSortDirection,
                                })
                            }
                        >
                            <FontAwesomeIcon
                                icon={getSortIcon(
                                    SortOptionTypes[animeContainer.sortBy] ||
                                        SortType.Other,
                                    animeContainer.sortDirection
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
                            type: AnimeContainerActionType.ToggleIsFiltering,
                        })
                    }
                    title={
                        animeContainer.showingFilters
                            ? "Hide Filters"
                            : "Show Filters <Current Filter: " +
                              JSON.stringify(animeContainer.filters) +
                              ">"
                    }
                    className="position-relative"
                >
                    <FontAwesomeIcon
                        icon={
                            animeContainer.showingFilters
                                ? faFilterCircleXmark
                                : faFilter
                        }
                    />
                    {Object.values(animeContainer.filters).filter(
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
                                Object.values(animeContainer.filters).filter(
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
                        defaultValue={animeContainer.viewType}
                        onChange={(viewType: ViewType) => {
                            updateSettings({
                                type: AnimeContainerActionType.HandleViewTypeChange,
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
                            type: AnimeContainerActionType.ToggleIsSearching,
                        })
                    }
                >
                    <FontAwesomeIcon
                        icon={animeContainer.isSearching ? faClose : faSearch}
                    />
                </Button>
            </div>

            {/* Search Bar */}
            {animeContainer.isSearching && (
                <>
                    <Form.Control
                        autoFocus
                        type="search"
                        placeholder="Keyword Search"
                        className="mb-2"
                        value={animeContainer.searchText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateSettings({
                                type: AnimeContainerActionType.HandleSearchTextUpdates,
                                payload: e.target.value,
                            })
                        }
                    />
                </>
            )}

            {/* Filters */}
            {animeContainer.showingFilters && (
                <>
                    <div
                        style={{
                            display: animeContainer.showingFilters
                                ? "block"
                                : "none",
                            textWrap: "wrap",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {JSON.stringify(animeContainer.filters, null, 2)}
                    </div>

                    <FiltersGUI initialFilters={animeContainer.filters} />
                </>
            )}
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

export interface AnimeContainerSettings {
    subBarIsOpen: boolean;
    showingFilters: boolean;
    filters: FilterTemplate[];

    isSearching: boolean;
    searchText: string;

    sortBy: string;
    sortByOptions: string[];
    sortDirection: SortDirection;

    viewType: ViewType;
}
export default AnimeContainerSettingsSubBar;

export function FiltersGUI({
    initialFilters,
}: {
    initialFilters?: FilterTemplate[];
}) {
    const [filters, setFilters] = useState<FilterTemplate[]>(
        initialFilters || []
    );

    const FilterJSX = filters.map((filter: FilterTemplate) => {
        return (
            <div className="mb-3">
                <InputGroup className="mb-3">
                    <TheUltimateDropdown
                        dropdownProps={{
                            as: ButtonGroup,
                        }}
                        toggleProps={{
                            variant: "success",
                        }}
                        title={"Table Name"}
                        titleType={TitleType.SelectedItems}
                        selectedItems={[filter.tableName]}
                        items={[filter.tableName]}
                        handleItemClick={(item: string) => {
                            // updateSettings({
                            //     type: AnimeContainerActionType.HandleSortBySelection,
                            //     payload: item,
                            // });
                        }}
                    />
                    <TheUltimateDropdown
                        dropdownProps={{
                            as: ButtonGroup,
                        }}
                        toggleProps={{
                            variant: "primary",
                        }}
                        title={"Field Name"}
                        titleType={TitleType.SelectedItems}
                        selectedItems={[filter.fieldName]}
                        items={[filter.fieldName]}
                        handleItemClick={(item: string) => {
                            // updateSettings({
                            //     type: AnimeContainerActionType.HandleSortBySelection,
                            //     payload: item,
                            // });
                        }}
                    />

                    <TheUltimateDropdown
                        dropdownProps={{
                            as: ButtonGroup,
                        }}
                        toggleProps={{
                            variant: "primary",
                        }}
                        title={"Operation"}
                        titleType={TitleType.SelectedItems}
                        selectedItems={[filter.operation]}
                        items={[
                            FilterOperation.MatchesOneOf,
                            FilterOperation.DoesNotMatchOneOf,
                            FilterOperation.IsInRange,
                            FilterOperation.IsEmpty,
                            FilterOperation.IsNotEmpty,
                        ]}
                        handleItemClick={(item: string) => {
                            // updateSettings({
                            //     type: AnimeContainerActionType.HandleSortBySelection,
                            //     payload: item,
                            // });
                        }}
                    />
                    <TheUltimateDropdown
                        dropdownProps={{
                            as: ButtonGroup,
                        }}
                        toggleProps={{
                            variant: "primary",
                        }}
                        title={"Matches One Of"}
                        titleType={TitleType.SelectedItems}
                        selectedItems={[filter.operation]}
                        items={[
                            FilterOperation.MatchesOneOf,
                            FilterOperation.DoesNotMatchOneOf,
                            FilterOperation.IsInRange,
                            FilterOperation.IsEmpty,
                            FilterOperation.IsNotEmpty,
                        ]}
                        handleItemClick={(item: string) => {
                            // updateSettings({
                            //     type: AnimeContainerActionType.HandleSortBySelection,
                            //     payload: item,
                            // });
                        }}
                    />
                    {/* <FormControl placeholder="start" />
                    <FormControl placeholder="end" /> */}
                </InputGroup>
                <ButtonGroup>
                    <Button variant="secondary">OR</Button>
                    <Button variant="danger">X</Button>
                </ButtonGroup>
            </div>
        );
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            Filters
            {FilterJSX}
            <Button variant="info" className="m-3">
                Add Another Filter (AND)
            </Button>
        </div>
    );
}
