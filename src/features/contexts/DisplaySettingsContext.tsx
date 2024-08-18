import {
    AniListGroupOptions,
    SortDirection,
    AniListSortOptions,
    ViewType,
} from "@data/constants";
import { createContext, useReducer } from "react";

export const DisplaySettingsContext = createContext<DisplaySettings | null>(
    null
);
export const DisplaySettingsDispatchContext =
    createContext<React.Dispatch<DisplaySettingsAction> | null>(null);

export function DisplaySettingsProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const [displaySettings, dispatch] = useReducer(
        displaySettingsReducer,
        initialDisplaySettings
    );

    return (
        <DisplaySettingsContext.Provider value={displaySettings}>
            <DisplaySettingsDispatchContext.Provider value={dispatch}>
                {children}
            </DisplaySettingsDispatchContext.Provider>
        </DisplaySettingsContext.Provider>
    );
}

function displaySettingsReducer(
    displaySettings: DisplaySettings,
    action: DisplaySettingsAction
) {
    switch (action.type) {
        case DisplaySettingsActionType.SetSortByOptions:
            return {
                ...displaySettings,
                sortBy: action.payload[0],
                sortByOptions: action.payload, // newSortByOptions
            };
        case DisplaySettingsActionType.ToggleIsFiltering:
            return {
                ...displaySettings,
                showingFilters: !displaySettings.showingFilters,
            };
        case DisplaySettingsActionType.ToggleIsSearching:
            return {
                ...displaySettings,
                isSearching: !displaySettings.isSearching,
                searchText: "",
            };
        case DisplaySettingsActionType.HandleSearchTextUpdates:
            return {
                ...displaySettings,
                searchText: action.payload, // newSearchText
            };
        case DisplaySettingsActionType.HandleViewTypeChange:
            return {
                ...displaySettings,
                viewType: action.payload, // newValue
            };
        case DisplaySettingsActionType.ToggleGroupDirection:
            return {
                ...displaySettings,
                groupDirection:
                    displaySettings.groupDirection === SortDirection.Ascending
                        ? SortDirection.Descending
                        : SortDirection.Ascending,
            };
        case DisplaySettingsActionType.HandleGroupBySelection:
            return {
                ...displaySettings,
                groupBy: action.payload,
            };
        case DisplaySettingsActionType.ToggleSortDirection:
            return {
                ...displaySettings,
                sortDirection:
                    displaySettings.sortDirection === SortDirection.Ascending
                        ? SortDirection.Descending
                        : SortDirection.Ascending,
            };
        case DisplaySettingsActionType.HandleSortBySelection:
            return {
                ...displaySettings,
                sortBy: action.payload,
            };
        default:
            throw new Error("Unknown action type");
    }
}

export enum DisplaySettingsActionType {
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

interface DisplaySettingsAction {
    type:
        | DisplaySettingsActionType.SetSortByOptions
        | DisplaySettingsActionType.ToggleIsFiltering
        | DisplaySettingsActionType.ToggleIsSearching
        | DisplaySettingsActionType.HandleSearchTextUpdates
        | DisplaySettingsActionType.HandleViewTypeChange
        | DisplaySettingsActionType.ToggleGroupDirection
        | DisplaySettingsActionType.HandleGroupBySelection
        | DisplaySettingsActionType.ToggleSortDirection
        | DisplaySettingsActionType.HandleSortBySelection;
    payload?: any;
}

interface DisplaySettings {
    showingFilters: boolean;
    filter: any;

    isSearching: boolean;
    searchText: string;

    sortBy: string;
    sortByOptions: string[];
    sortDirection: SortDirection;

    groupBy: string;
    groupByOptions: string[];
    groupDirection: SortDirection;

    viewType: ViewType;
}

const initialDisplaySettings = {
    showingFilters: false,
    filter: {},

    isSearching: false,
    searchText: "",

    sortBy: "",
    sortByOptions: [],
    sortDirection: SortDirection.Descending,

    groupBy: "",
    groupByOptions: [],
    groupDirection: SortDirection.Descending,

    viewType: ViewType.Card,
};
