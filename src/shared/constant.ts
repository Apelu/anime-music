export const SortOption: {
    localAnime: {
        [key: string]: string;
    };
    localUserAnime: {
        [key: string]: string;
    };
} = {
    localAnime: {
        title: "localAnime.title",
        episodeCount: "localAnime.episodeCount",
    },
    localUserAnime: {
        currentEpisodeNumber: "localUserAnime.currentEpisodeNumber",
        lastWatched: "localUserAnime.lastWatched",
    },
};

export enum SortType {
    Alphabetical = "Alphabetical",
    Numeric = "Numeric",
    Other = "Other",
}
export const SortOptionTypes = {
    [SortOption.localAnime.title]: SortType.Alphabetical,
    [SortOption.localAnime.episodeCount]: SortType.Numeric,
    [SortOption.localUserAnime.currentEpisodeNumber]: SortType.Numeric,
    [SortOption.localUserAnime.lastWatched]: SortType.Alphabetical,
};

export const SortOptions = [
    ...Object.keys(SortOption.localAnime).map(
        key => SortOption.localAnime[key]
    ),
    ...Object.keys(SortOption.localUserAnime).map(
        key => SortOption.localUserAnime[key]
    ),
];

export const enum FilterOperation {
    MatchesOneOf = "matchesOneOf",
    DoesNotMatchOneOf = "doesNotMatchOneOf",
    IsInRange = "isInRange",
    IsEmpty = "isEmpty",
    IsNotEmpty = "isNotEmpty",
}

export interface FilterTemplate {
    tableName: string;
    fieldName: string;

    operation:
        | FilterOperation.MatchesOneOf
        | FilterOperation.DoesNotMatchOneOf
        | FilterOperation.IsInRange
        | FilterOperation.IsEmpty
        | FilterOperation.IsNotEmpty;

    matchesOneOf: string[];
    doesNotMatchOneOf: string[];

    isInRange: boolean;
    range: [number, number];

    orFilter?: FilterTemplate;
}

export enum SortDirection {
    Ascending = "Ascending",
    Descending = "Descending",
}

export enum ViewType {
    Card = "Card",
    List = "List",
}
