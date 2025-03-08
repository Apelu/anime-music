import { SortDirection, ViewType } from "@data/constants";
import { FilterTemplate } from "@shared/constant";

export interface UserAnimeContainer {
    name: string;

    subBarIsOpen: boolean;

    showingFilters: boolean;
    filters: FilterTemplate[];

    isSearching: boolean;
    searchText: string;

    sortBy: string;
    sortByOptions: string[];
    sortDirection: SortDirection;

    viewType: ViewType;

    expanded: boolean;
    items: any;
}

export enum AnimeContainerActionType {
    ToggleExpanded = "ToggleExpanded",
    ToggleSubBar = "ToggleSubBar",
    SetSortByOptions = "SetSortByOptions",
    ToggleIsFiltering = "ToggleIsFiltering",
    ToggleIsSearching = "ToggleIsSearching",
    HandleSearchTextUpdates = "HandleSearchTextUpdates",
    HandleViewTypeChange = "HandleViewTypeChange",
    HandleContainerNameUpdates = "HandleContainerNameUpdates",
    ToggleGroupDirection = "ToggleGroupDirection",
    HandleGroupBySelection = "HandleGroupBySelection",
    ToggleSortDirection = "ToggleSortDirection",
    HandleSortBySelection = "HandleSortBySelection",
}

export interface AnimeContainerAction {
    type:
        | AnimeContainerActionType.HandleContainerNameUpdates
        | AnimeContainerActionType.ToggleExpanded
        | AnimeContainerActionType.ToggleSubBar
        | AnimeContainerActionType.SetSortByOptions
        | AnimeContainerActionType.ToggleIsFiltering
        | AnimeContainerActionType.ToggleIsSearching
        | AnimeContainerActionType.HandleSearchTextUpdates
        | AnimeContainerActionType.HandleViewTypeChange
        | AnimeContainerActionType.ToggleGroupDirection
        | AnimeContainerActionType.HandleGroupBySelection
        | AnimeContainerActionType.ToggleSortDirection
        | AnimeContainerActionType.HandleSortBySelection;
    payload?: any;
}
