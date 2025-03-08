import {
    faArrowDown91,
    faArrowDownWideShort,
    faArrowDownZA,
    faArrowUp91,
    faArrowUpWideShort,
    faArrowUpZA,
    faGrip,
    faTableList,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export enum SortDirection {
    Ascending = "Ascending",
    Descending = "Descending",
}

export enum SortType {
    Alphabetical = "Alphabetical",
    Numeric = "Numeric",
    Other = "Other",
}

export const SortIcons = {
    [SortType.Alphabetical]: {
        [SortDirection.Ascending]: faArrowUpZA,
        [SortDirection.Descending]: faArrowDownZA,
    },
    [SortType.Numeric]: {
        [SortDirection.Ascending]: faArrowUp91,
        [SortDirection.Descending]: faArrowDown91,
    },
    [SortType.Other]: {
        [SortDirection.Ascending]: faArrowDownWideShort,
        [SortDirection.Descending]: faArrowUpWideShort,
    },
};

export function getSortIcon(
    sortType: SortType,
    sortDirection: SortDirection
): IconDefinition {
    return SortIcons[sortType][sortDirection];
}

export enum AniListSortOptions {
    Title = "Title",
    Score = "Score",
    Progress = "Progress",
    "LastUpdated" = "Last Updated",
    "LastAdded" = "Last Added",
    "StartDate" = "Start Date",
    "CompletedDate" = "Completed Date",
}

export const AniListSortOptionsTypes = {
    [AniListSortOptions.Title]: SortType.Alphabetical,
    [AniListSortOptions.Score]: SortType.Numeric,
    [AniListSortOptions.Progress]: SortType.Numeric,
    [AniListSortOptions.LastUpdated]: SortType.Other,
    [AniListSortOptions.LastAdded]: SortType.Other,
    [AniListSortOptions.StartDate]: SortType.Other,
    [AniListSortOptions.CompletedDate]: SortType.Other,
};

export enum ViewType {
    Card = "Card",
    List = "List",
}

export const ViewTypeIcons = {
    [ViewType.Card]: faGrip,
    [ViewType.List]: faTableList,
};

export enum AniListGroupOptions {
    None = "None",
    Status = "Status",
}

export enum AniListStatusOptions {
    CURRENT = "CURRENT",
    PLANNING = "PLANNING",
    COMPLETED = "COMPLETED",
    DROPPED = "DROPPED",
    PAUSED = "PAUSED",
    REPEATING = "REPEATING",
}

export enum AniListFilterOptions {
    Status = "Status",
    Format = "Format",
    Tag = "Tag",
}

const StatusOptionDescriptions = {
    [AniListStatusOptions.CURRENT]: "Currently watching/reading",
    [AniListStatusOptions.PLANNING]: "Planning to watch/read",
    [AniListStatusOptions.COMPLETED]: "Finished watching/reading",
    [AniListStatusOptions.DROPPED]:
        "Stopped watching/reading before completing",
    [AniListStatusOptions.PAUSED]: "Paused watching/reading",
    [AniListStatusOptions.REPEATING]: "Re-watching/reading",
};

export enum AniListFormatOptions {
    TV = "TV",
    TV_SHORT = "TV_SHORT",
    MOVIE = "MOVIE",
    SPECIAL = "SPECIAL",
    OVA = "OVA",
    ONA = "ONA",
    MUSIC = "MUSIC",
    MANGA = "MANGA",
    NOVEL = "NOVEL",
    ONE_SHOT = "ONE_SHOT",
}

const FormatOptionDescriptions = {
    [AniListFormatOptions.TV]: "Anime broadcast on television",
    [AniListFormatOptions.TV_SHORT]:
        "Anime which are under 15 minutes in length and broadcast on television",
    [AniListFormatOptions.MOVIE]: "Anime movies with a theatrical release",
    [AniListFormatOptions.SPECIAL]:
        "Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc",
    [AniListFormatOptions.OVA]:
        "(Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast",
    [AniListFormatOptions.ONA]:
        "(Original Net Animation) Anime that have been originally released online or are only available through streaming services.",
    [AniListFormatOptions.MUSIC]: "Short anime released as a music video",
    [AniListFormatOptions.MANGA]:
        "Professionally published manga with more than one chapter",
    [AniListFormatOptions.NOVEL]:
        "Written books released as a series of light novels",
    [AniListFormatOptions.ONE_SHOT]: "Manga with just one chapter",
};

export const AniListGroupOptionsTypes = {
    [AniListGroupOptions.None]: SortType.Other,
    [AniListGroupOptions.Status]: SortType.Alphabetical,
};

export enum AniListTagOptions {
    Action = "Action",
    Adventure = "Adventure",
    Cars = "Cars",
    Comedy = "Comedy",
    Dementia = "Dementia",
    Demons = "Demons",
    Mystery = "Mystery",
    Drama = "Drama",
    Ecchi = "Ecchi",
    Fantasy = "Fantasy",
    Game = "Game",
    Hentai = "Hentai",
    Historical = "Historical",
    Horror = "Horror",
    Kids = "Kids",
    Magic = "Magic",
    MartialArts = "Martial Arts",
    Mecha = "Mecha",
    Music = "Music",
    Parody = "Parody",
    Samurai = "Samurai",
    Romance = "Romance",
    School = "School",
    SciFi = "Sci-Fi",
    Shoujo = "Shoujo",
    ShoujoAi = "Shoujo Ai",
    Shounen = "Shounen",
    ShounenAi = "Shounen Ai",
    Space = "Space",
    Sports = "Sports",
    SuperPower = "Super Power",
    Vampire = "Vampire",
    Yaoi = "Yaoi",
    Yuri = "Yuri",
    Harem = "Harem",
    SliceOfLife = "Slice of Life",
    Supernatural = "Supernatural",
    Military = "Military",
    Police = "Police",
    Psychological = "Psychological",
    Thriller = "Thriller",
    Seinen = "Seinen",
    Josei = "Josei",
}

const TagOptionDescriptions = {
    [AniListTagOptions.Action]:
        "Anime in which the protagonist fights against others",
    [AniListTagOptions.Adventure]:
        "Anime in which the protagonist travels to different places",
    [AniListTagOptions.Cars]: "Anime that involves cars",
    [AniListTagOptions.Comedy]: "Anime that aims to make the audience laugh",
    [AniListTagOptions.Dementia]:
        "Anime that is difficult to understand or interpret",
    [AniListTagOptions.Demons]: "Anime that involves demons",
    [AniListTagOptions.Mystery]: "Anime that involves solving a mystery",
    [AniListTagOptions.Drama]: "Anime that involves emotional scenes",
    [AniListTagOptions.Ecchi]: "Anime that involves sexual themes",
    [AniListTagOptions.Fantasy]: "Anime that involves magical elements",
    [AniListTagOptions.Game]: "Anime that involves games",
    [AniListTagOptions.Hentai]: "Anime that involves explicit sexual content",
    [AniListTagOptions.Historical]: "Anime that involves historical events",
    [AniListTagOptions.Horror]: "Anime that involves scary scenes",
    [AniListTagOptions.Kids]: "Anime that is targeted towards children",
    [AniListTagOptions.Magic]: "Anime that involves magic",
    [AniListTagOptions.MartialArts]: "Anime that involves martial arts",
    [AniListTagOptions.Mecha]: "Anime that involves robots",
    [AniListTagOptions.Music]: "Anime that involves music",
    [AniListTagOptions.Parody]: "Anime that parodies other anime",
    [AniListTagOptions.Samurai]: "Anime that involves samurais",
    [AniListTagOptions.Romance]: "Anime that involves romantic relationships",
    [AniListTagOptions.School]: "Anime that takes place in a school",
    [AniListTagOptions.SciFi]: "Anime that involves futuristic technology",
    [AniListTagOptions.Shoujo]: "Anime that is targeted towards young",
};

export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
