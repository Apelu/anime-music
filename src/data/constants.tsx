import {
    faArrowUpZA,
    faArrowDownZA,
    faArrowUp91,
    faArrowDown91,
    faArrowDownWideShort,
    faArrowUpWideShort,
    IconDefinition,
    faTableList,
    faGrip,
} from "@fortawesome/free-solid-svg-icons";
import exp from "constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export enum SortOptions {
    Title = "Title",
    Score = "Score",
    Progress = "Progress",
    "LastUpdated" = "Last Updated",
    "LastAdded" = "Last Added",
    "StartDate" = "Start Date",
    "CompletedDate" = "Completed Date",
}

export const SortOptionsTypes = {
    [SortOptions.Title]: SortType.Alphabetical,
    [SortOptions.Score]: SortType.Numeric,
    [SortOptions.Progress]: SortType.Numeric,
    [SortOptions.LastUpdated]: SortType.Other,
    [SortOptions.LastAdded]: SortType.Other,
    [SortOptions.StartDate]: SortType.Other,
    [SortOptions.CompletedDate]: SortType.Other,
};

export enum ViewType {
    Card = "Card",
    List = "List",
}

export const ViewTypeIcons = {
    [ViewType.Card]: faGrip,
    [ViewType.List]: faTableList,
};

export enum GroupOptions {
    None = "None",
    Status = "Status",
}

export enum StatusOptions {
    CURRENT = "CURRENT",
    PLANNING = "PLANNING",
    COMPLETED = "COMPLETED",
    DROPPED = "DROPPED",
    PAUSED = "PAUSED",
    REPEATING = "REPEATING",
}

export enum FilterOptions {
    Status = "Status",
    Format = "Format",
    Tag = "Tag",
}

export const StatusOptionDescriptions = {
    [StatusOptions.CURRENT]: "Currently watching/reading",
    [StatusOptions.PLANNING]: "Planning to watch/read",
    [StatusOptions.COMPLETED]: "Finished watching/reading",
    [StatusOptions.DROPPED]: "Stopped watching/reading before completing",
    [StatusOptions.PAUSED]: "Paused watching/reading",
    [StatusOptions.REPEATING]: "Re-watching/reading",
};

export enum FormatOptions {
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

export const FormatOptionDescriptions = {
    [FormatOptions.TV]: "Anime broadcast on television",
    [FormatOptions.TV_SHORT]:
        "Anime which are under 15 minutes in length and broadcast on television",
    [FormatOptions.MOVIE]: "Anime movies with a theatrical release",
    [FormatOptions.SPECIAL]:
        "Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc",
    [FormatOptions.OVA]:
        "(Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast",
    [FormatOptions.ONA]:
        "(Original Net Animation) Anime that have been originally released online or are only available through streaming services.",
    [FormatOptions.MUSIC]: "Short anime released as a music video",
    [FormatOptions.MANGA]:
        "Professionally published manga with more than one chapter",
    [FormatOptions.NOVEL]: "Written books released as a series of light novels",
    [FormatOptions.ONE_SHOT]: "Manga with just one chapter",
};

export const GroupOptionsTypes = {
    [GroupOptions.None]: SortType.Other,
    [GroupOptions.Status]: SortType.Alphabetical,
};

export enum TagOptions {
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

export const TagOptionDescriptions = {
    [TagOptions.Action]: "Anime in which the protagonist fights against others",
    [TagOptions.Adventure]:
        "Anime in which the protagonist travels to different places",
    [TagOptions.Cars]: "Anime that involves cars",
    [TagOptions.Comedy]: "Anime that aims to make the audience laugh",
    [TagOptions.Dementia]: "Anime that is difficult to understand or interpret",
    [TagOptions.Demons]: "Anime that involves demons",
    [TagOptions.Mystery]: "Anime that involves solving a mystery",
    [TagOptions.Drama]: "Anime that involves emotional scenes",
    [TagOptions.Ecchi]: "Anime that involves sexual themes",
    [TagOptions.Fantasy]: "Anime that involves magical elements",
    [TagOptions.Game]: "Anime that involves games",
    [TagOptions.Hentai]: "Anime that involves explicit sexual content",
    [TagOptions.Historical]: "Anime that involves historical events",
    [TagOptions.Horror]: "Anime that involves scary scenes",
    [TagOptions.Kids]: "Anime that is targeted towards children",
    [TagOptions.Magic]: "Anime that involves magic",
    [TagOptions.MartialArts]: "Anime that involves martial arts",
    [TagOptions.Mecha]: "Anime that involves robots",
    [TagOptions.Music]: "Anime that involves music",
    [TagOptions.Parody]: "Anime that parodies other anime",
    [TagOptions.Samurai]: "Anime that involves samurais",
    [TagOptions.Romance]: "Anime that involves romantic relationships",
    [TagOptions.School]: "Anime that takes place in a school",
    [TagOptions.SciFi]: "Anime that involves futuristic technology",
    [TagOptions.Shoujo]: "Anime that is targeted towards young",
};
