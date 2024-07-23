export enum Mutation {
    UpdateUser = "UpdateUser",
    SaveMediaListEntry = "SaveMediaListEntry",
    UpdateMediaListEntries = "UpdateMediaListEntries",
}

export enum UpdateUserParam {
    about = "about",
    titleLanguage = "titleLanguage",
    displayAdultContent = "displayAdultContent",
    airingNotifications = "airingNotifications",
    scoreFormat = "scoreFormat",
    rowOrder = "rowOrder",
    profileColor = "profileColor",
    donatorBadge = "donatorBadge",
    notificationOptions = "notificationOptions",
    timezone = "timezone",
    activityMergeTime = "activityMergeTime",
    animeListOptions = "animeListOptions",
    mangaListOptions = "mangaListOptions",
    staffNameLanguage = "staffNameLanguage",
    restrictMessagesToFollowing = "restrictMessagesToFollowing",
    disabledListActivity = "disabledListActivity",
}

export enum SaveMediaListEntryParam {
    id = "id",
    mediaId = "mediaId",
    status = "status",
    score = "score",
    scoreRaw = "scoreRaw",
    progress = "progress",
    progressVolumes = "progressVolumes",
    repeat = "repeat",
    priority = "priority",
    private = "private",
    notes = "notes",
    hiddenFromStatusLists = "hiddenFromStatusLists",
    customLists = "customLists",
    advancedScores = "advancedScores",
    startedAt = "startedAt",
    completedAt = "completedAt",
}

export enum UpdateMediaListEntriesParam {
    status = "status",
    score = "score",
    scoreRaw = "scoreRaw",
    progress = "progress",
    progressVolumes = "progressVolumes",
    repeat = "repeat",
    priority = "priority",
    private = "private",
    notes = "notes",
    hiddenFromStatusLists = "hiddenFromStatusLists",
    advancedScores = "advancedScores",
    startedAt = "startedAt",
    completedAt = "completedAt",
    ids = "ids",
}

// export  interface  UpdateUserParamType {
//     [UpdateUserParam.about]: string;
//     // [UpdateUserParam.titleLanguage]: UserTitleLanguage;
//     [UpdateUserParam.displayAdultContent]: boolean;
//     [UpdateUserParam.airingNotifications]: boolean;
//     [UpdateUserParam.scoreFormat]: ScoreFormat;
//     [UpdateUserParam.rowOrder]: string;
//     [UpdateUserParam.profileColor]: string;
//     [UpdateUserParam.donatorBadge]: string;
//     [UpdateUserParam.notificationOptions]: NotificationOptionInput[];
//     [UpdateUserParam.timezone]: string;
//     [UpdateUserParam.activityMergeTime]: number;
//     [UpdateUserParam.animeListOptions]: MediaListOptionsInput;
//     [UpdateUserParam.mangaListOptions]: MediaListOptionsInput;
//     [UpdateUserParam.staffNameLanguage]: UserStaffNameLanguage;
//     [UpdateUserParam.restrictMessagesToFollowing]: boolean;
//     [UpdateUserParam.disabledListActivity]: ListActivityOptionInput[];
// }

export interface SaveMediaListEntryParamType {
    [SaveMediaListEntryParam.id]: number;
    [SaveMediaListEntryParam.mediaId]: number;
    [SaveMediaListEntryParam.status]: MediaListStatus;
    [SaveMediaListEntryParam.score]: number;
    [SaveMediaListEntryParam.scoreRaw]: number;
    [SaveMediaListEntryParam.progress]: number;
    [SaveMediaListEntryParam.progressVolumes]: number;
    [SaveMediaListEntryParam.repeat]: number;
    [SaveMediaListEntryParam.priority]: number;
    [SaveMediaListEntryParam.private]: boolean;
    [SaveMediaListEntryParam.notes]: string;
    [SaveMediaListEntryParam.hiddenFromStatusLists]: boolean;
    [SaveMediaListEntryParam.customLists]: string[];
    [SaveMediaListEntryParam.advancedScores]: number[];
    [SaveMediaListEntryParam.startedAt]: FuzzyDateInput;
    [SaveMediaListEntryParam.completedAt]: FuzzyDateInput;
}

export interface UpdateMediaListEntriesParamType {
    [UpdateMediaListEntriesParam.status]: MediaListStatus;
    [UpdateMediaListEntriesParam.score]: number;
    [UpdateMediaListEntriesParam.scoreRaw]: number;
    [UpdateMediaListEntriesParam.progress]: number;
    [UpdateMediaListEntriesParam.progressVolumes]: number;
    [UpdateMediaListEntriesParam.repeat]: number;
    [UpdateMediaListEntriesParam.priority]: number;
    [UpdateMediaListEntriesParam.private]: boolean;
    [UpdateMediaListEntriesParam.notes]: string;
    [UpdateMediaListEntriesParam.hiddenFromStatusLists]: boolean;
    [UpdateMediaListEntriesParam.advancedScores]: number[];
    [UpdateMediaListEntriesParam.startedAt]: FuzzyDateInput;
    [UpdateMediaListEntriesParam.completedAt]: FuzzyDateInput;
    [UpdateMediaListEntriesParam.ids]: number[];
}

export enum Query {
    Page = "Page",
    Media = "Media",
    MediaTrend = "MediaTrend",
    AiringSchedule = "AiringSchedule",
    Character = "Character",
    Staff = "Staff",
    MediaList = "MediaList",
    MediaListCollection = "MediaListCollection",
    GenreCollection = "GenreCollection",
    MediaTagCollection = "MediaTagCollection",
    User = "User",
    Viewer = "Viewer",
    Markdown = "Markdown",
    AniChartUser = "AniChartUser",
    SiteStatistics = "SiteStatistics",
    ExternalLinkSourceCollection = "ExternalLinkSourceCollection",
}

export enum PageParam {
    page = "page",
    perPage = "perPage",
}

export interface PageParamType {
    [PageParam.page]: number;
    [PageParam.perPage]: number;
}

export enum MediaParam {
    id = "id",
    idMal = "idMal",
    startDate = "startDate",
    endDate = "endDate",
    season = "season",
    seasonYear = "seasonYear",
    type = "type",
    format = "format",
    status = "status",
    episodes = "episodes",
    duration = "duration",
    chapters = "chapters",
    volumes = "volumes",
    isAdult = "isAdult",
    genre = "genre",
    tag = "tag",
    minimumTagRank = "minimumTagRank",
    tagCategory = "tagCategory",
    onList = "onList",
    licensedBy = "licensedBy",
    licensedById = "licensedById",
    averageScore = "averageScore",
    popularity = "popularity",
    source = "source",
    countryOfOrigin = "countryOfOrigin",
    isLicensed = "isLicensed",
    search = "search",
    id_not = "id_not",
    id_in = "id_in",
    id_not_in = "id_not_in",
    idMal_not = "idMal_not",
    idMal_in = "idMal_in",
    idMal_not_in = "idMal_not_in",
    startDate_greater = "startDate_greater",
    startDate_lesser = "startDate_lesser",
    startDate_like = "startDate_like",
    endDate_greater = "endDate_greater",
    endDate_lesser = "endDate_lesser",
    endDate_like = "endDate_like",
    format_in = "format_in",
    format_not = "format_not",
    format_not_in = "format_not_in",
    status_in = "status_in",
    status_not = "status_not",
    status_not_in = "status_not_in",
    episodes_greater = "episodes_greater",
    episodes_lesser = "episodes_lesser",
    duration_greater = "duration_greater",
    duration_lesser = "duration_lesser",
    chapters_greater = "chapters_greater",
    chapters_lesser = "chapters_lesser",
    volumes_greater = "volumes_greater",
    volumes_lesser = "volumes_lesser",
    genre_in = "genre_in",
    genre_not_in = "genre_not_in",
    tag_in = "tag_in",
    tag_not_in = "tag_not_in",
    tagCategory_in = "tagCategory_in",
    tagCategory_not_in = "tagCategory_not_in",
    licensedBy_in = "licensedBy_in",
    licensedById_in = "licensedById_in",
    averageScore_not = "averageScore_not",
    averageScore_greater = "averageScore_greater",
    averageScore_lesser = "averageScore_lesser",
    popularity_not = "popularity_not",
    popularity_greater = "popularity_greater",
    popularity_lesser = "popularity_lesser",
    source_in = "source_in",
    sort = "sort",
}

export interface MediaParamType {
    [MediaParam.id]?: number;
    [MediaParam.idMal]?: number;
    // [MediaParam.startDate]?: FuzzyDateInt;
    // [MediaParam.endDate]?: FuzzyDateInt;
    // [MediaParam.season]?: MediaSeason;
    [MediaParam.seasonYear]?: number;
    [MediaParam.type]?: MediaType;
    // [MediaParam.format]?: MediaFormat;
    // [MediaParam.status]?: MediaStatus;
    [MediaParam.episodes]?: number;
    [MediaParam.duration]?: number;
    [MediaParam.chapters]?: number;
    [MediaParam.volumes]?: number;
    [MediaParam.isAdult]?: boolean;
    [MediaParam.genre]?: string;
    [MediaParam.tag]?: string;
    [MediaParam.minimumTagRank]?: number;
    [MediaParam.tagCategory]?: string;
    [MediaParam.onList]?: boolean;
    [MediaParam.licensedBy]?: string;
    [MediaParam.licensedById]?: number;
    [MediaParam.averageScore]?: number;
    [MediaParam.popularity]?: number;
    [MediaParam.source]?: MediaSource;
    // [MediaParam.countryOfOrigin]?: CountryCode;
    [MediaParam.isLicensed]?: boolean;
    [MediaParam.search]?: string;
    [MediaParam.id_not]?: number;
    [MediaParam.id_in]?: number[];
    [MediaParam.id_not_in]?: number[];
    [MediaParam.idMal_not]?: number;
    [MediaParam.idMal_in]?: number[];
    [MediaParam.idMal_not_in]?: number[];
    // [MediaParam.startDate_greater]?: FuzzyDateInt;
    // [MediaParam.startDate_lesser]?: FuzzyDateInt;
    [MediaParam.startDate_like]?: string;
    // [MediaParam.endDate_greater]?: FuzzyDateInt;
    // [MediaParam.endDate_lesser]?: FuzzyDateInt;
    [MediaParam.endDate_like]?: string;
    // [MediaParam.format_in]?: MediaFormat[];
    // [MediaParam.format_not]?: MediaFormat;
    // [MediaParam.format_not_in]?: MediaFormat[];
    // [MediaParam.status_in]?: MediaStatus[];
    // [MediaParam.status_not]?: MediaStatus;
    // [MediaParam.status_not_in]?: MediaStatus[];
    [MediaParam.episodes_greater]?: number;
    [MediaParam.episodes_lesser]?: number;
    [MediaParam.duration_greater]?: number;
    [MediaParam.duration_lesser]?: number;
    [MediaParam.chapters_greater]?: number;
    [MediaParam.chapters_lesser]?: number;
    [MediaParam.volumes_greater]?: number;
    [MediaParam.volumes_lesser]?: number;
    [MediaParam.genre_in]?: string[];
    [MediaParam.genre_not_in]?: string[];
    [MediaParam.tag_in]?: string[];
    [MediaParam.tag_not_in]?: string[];
    [MediaParam.tagCategory_in]?: string[];
    [MediaParam.tagCategory_not_in]?: string[];
    [MediaParam.licensedBy_in]?: string[];
    [MediaParam.licensedById_in]?: number;
    [MediaParam.averageScore_not]?: number;
    [MediaParam.averageScore_greater]?: number;
    [MediaParam.averageScore_lesser]?: number;
    [MediaParam.popularity_not]?: number;
    [MediaParam.popularity_greater]?: number;
    [MediaParam.popularity_lesser]?: number;
    [MediaParam.source_in]?: MediaSource[];
    [MediaParam.sort]?: MediaSort;
}

// MediaTrend
export enum MediaTrendParam {
    mediaId = "mediaId",
    date = "date",
    trending = "trending",
    averageScore = "averageScore",
    popularity = "popularity",
    episode = "episode",
    releasing = "releasing",
    mediaId_not = "mediaId_not",
    mediaId_in = "mediaId_in",
    mediaId_not_in = "mediaId_not_in",
    date_greater = "date_greater",
    date_lesser = "date_lesser",
    trending_greater = "trending_greater",
    trending_lesser = "trending_lesser",
    trending_not = "trending_not",
    averageScore_greater = "averageScore_greater",
    averageScore_lesser = "averageScore_lesser",
    averageScore_not = "averageScore_not",
    popularity_greater = "popularity_greater",
    popularity_lesser = "popularity_lesser",
    popularity_not = "popularity_not",
    episode_greater = "episode_greater",
    episode_lesser = "episode_lesser",
    episode_not = "episode_not",
    sort = "sort",
}

export interface MediaTrendParamType {
    [MediaTrendParam.mediaId]: number;
    [MediaTrendParam.date]: number;
    [MediaTrendParam.trending]: number;
    [MediaTrendParam.averageScore]: number;
    [MediaTrendParam.popularity]: number;
    [MediaTrendParam.episode]: number;
    [MediaTrendParam.releasing]: boolean;
    [MediaTrendParam.mediaId_not]: number;
    [MediaTrendParam.mediaId_in]: number[];
    [MediaTrendParam.mediaId_not_in]: number[];
    [MediaTrendParam.date_greater]: number;
    [MediaTrendParam.date_lesser]: number;
    [MediaTrendParam.trending_greater]: number;
    [MediaTrendParam.trending_lesser]: number;
    [MediaTrendParam.trending_not]: number;
    [MediaTrendParam.averageScore_greater]: number;
    [MediaTrendParam.averageScore_lesser]: number;
    [MediaTrendParam.averageScore_not]: number;
    [MediaTrendParam.popularity_greater]: number;
    [MediaTrendParam.popularity_lesser]: number;
    [MediaTrendParam.popularity_not]: number;
    [MediaTrendParam.episode_greater]: number;
    [MediaTrendParam.episode_lesser]: number;
    [MediaTrendParam.episode_not]: number;
    [MediaTrendParam.sort]: MediaTrendSort[];
}
//AiringSchedule
export enum AiringScheduleParam {
    id = "id",
    mediaId = "mediaId",
    episode = "episode",
    airingAt = "airingAt",
    notYetAired = "notYetAired",
    id_not = "id_not",
    id_in = "id_in",
    id_not_in = "id_not_in",
    mediaId_not = "mediaId_not",
    mediaId_in = "mediaId_in",
    mediaId_not_in = "mediaId_not_in",
    episode_not = "episode_not",
    episode_in = "episode_in",
    episode_not_in = "episode_not_in",
    episode_greater = "episode_greater",
    episode_lesser = "episode_lesser",
    airingAt_greater = "airingAt_greater",
    airingAt_lesser = "airingAt_lesser",
    sort = "sort",
}

export interface AiringScheduleParamType {
    [AiringScheduleParam.id]: number;
    [AiringScheduleParam.mediaId]: number;
    [AiringScheduleParam.episode]: number;
    [AiringScheduleParam.airingAt]: number;
    [AiringScheduleParam.notYetAired]: boolean;
    [AiringScheduleParam.id_not]: number;
    [AiringScheduleParam.id_in]: number[];
    [AiringScheduleParam.id_not_in]: number[];
    [AiringScheduleParam.mediaId_not]: number;
    [AiringScheduleParam.mediaId_in]: number[];
    [AiringScheduleParam.mediaId_not_in]: number[];
    [AiringScheduleParam.episode_not]: number;
    [AiringScheduleParam.episode_in]: number[];
    [AiringScheduleParam.episode_not_in]: number[];
    [AiringScheduleParam.episode_greater]: number;
    [AiringScheduleParam.episode_lesser]: number;
    [AiringScheduleParam.airingAt_greater]: number;
    [AiringScheduleParam.airingAt_lesser]: number;
    [AiringScheduleParam.sort]: AiringSort[];
}
// Character
export enum CharacterParam {
    id = "id",
    isBirthday = "isBirthday",
    search = "search",
    id_not = "id_not",
    id_in = "id_in",
    id_not_in = "id_not_in",
    sort = "sort",
}

export interface CharacterParamType {
    [CharacterParam.id]: number;
    [CharacterParam.isBirthday]: boolean;
    [CharacterParam.search]: string;
    [CharacterParam.id_not]: number;
    [CharacterParam.id_in]: number[];
    [CharacterParam.id_not_in]: number[];
    [CharacterParam.sort]: CharacterSort[];
}

// Staff
export enum StaffParam {
    id = "id",
    isBirthday = "isBirthday",
    search = "search",
    id_not = "id_not",
    id_in = "id_in",
    id_not_in = "id_not_in",
    sort = "sort",
}

export interface StaffParamType {
    [StaffParam.id]: number;
    [StaffParam.isBirthday]: boolean;
    [StaffParam.search]: string;
    [StaffParam.id_not]: number;
    [StaffParam.id_in]: number[];
    [StaffParam.id_not_in]: number[];
    [StaffParam.sort]: StaffSort[];
}
//MediaList
export enum MediaListParam {
    id = "id",
    userId = "userId",
    userName = "userName",
    type = "type",
    status = "status",
    mediaId = "mediaId",
    isFollowing = "isFollowing",
    notes = "notes",
    startedAt = "startedAt",
    completedAt = "completedAt",
    compareWithAuthList = "compareWithAuthList",
    userId_in = "userId_in",
    status_in = "status_in",
    status_not_in = "status_not_in",
    status_not = "status_not",
    mediaId_in = "mediaId_in",
    mediaId_not_in = "mediaId_not_in",
    notes_like = "notes_like",
    startedAt_greater = "startedAt_greater",
    startedAt_lesser = "startedAt_lesser",
    startedAt_like = "startedAt_like",
    completedAt_greater = "completedAt_greater",
    completedAt_lesser = "completedAt_lesser",
    completedAt_like = "completedAt_like",
    sort = "sort",
}

export interface MediaListParamType {
    [MediaListParam.id]: number;
    [MediaListParam.userId]: number;
    [MediaListParam.userName]: string;
    [MediaListParam.type]: MediaType;
    [MediaListParam.status]: MediaListStatus;
    [MediaListParam.mediaId]: number;
    [MediaListParam.isFollowing]: boolean;
    [MediaListParam.notes]: string;
    //[MediaListParam.startedAt]: FuzzyDateInt;
    // [MediaListParam.completedAt]: FuzzyDateInt;
    [MediaListParam.compareWithAuthList]: boolean;
    [MediaListParam.userId_in]: number[];
    [MediaListParam.status_in]: MediaListStatus[];
    [MediaListParam.status_not_in]: MediaListStatus[];
    [MediaListParam.status_not]: MediaListStatus;
    [MediaListParam.mediaId_in]: number[];
    [MediaListParam.mediaId_not_in]: number[];
    [MediaListParam.notes_like]: string;
    // [MediaListParam.startedAt_greater]: FuzzyDateInt;
    // [MediaListParam.startedAt_lesser]: FuzzyDateInt;
    [MediaListParam.startedAt_like]: string;
    // [MediaListParam.completedAt_greater]: FuzzyDateInt;
    // [MediaListParam.completedAt_lesser]: FuzzyDateInt;
    [MediaListParam.completedAt_like]: string;
    [MediaListParam.sort]: MediaListSort[];
}
//MediaListCollection
export enum MediaListCollectionParam {
    userId = "userId",
    userName = "userName",
    type = "type",
    status = "status",
    notes = "notes",
    startedAt = "startedAt",
    completedAt = "completedAt",
    forceSingleCompletedList = "forceSingleCompletedList",
    chunk = "chunk",
    perChunk = "perChunk",
    status_in = "status_in",
    status_not_in = "status_not_in",
    status_not = "status_not",
    notes_like = "notes_like",
    startedAt_greater = "startedAt_greater",
    startedAt_lesser = "startedAt_lesser",
    startedAt_like = "startedAt_like",
    completedAt_greater = "completedAt_greater",
    completedAt_lesser = "completedAt_lesser",
    completedAt_like = "completedAt_like",
    sort = "sort",
}

export interface MediaListCollectionParamType {
    [MediaListCollectionParam.userId]: number;
    [MediaListCollectionParam.userName]: string;
    [MediaListCollectionParam.type]: MediaType;
    [MediaListCollectionParam.status]: MediaList;
}
//GenreCollection
export enum GenreCollectionParam {
    sort = "sort",
}

export interface GenreCollectionParamType {
    [GenreCollectionParam.sort]: GenreSort[];
}

//MediaTagCollection
export enum MediaTagCollectionParam {
    status = "status",
}

export interface MediaTagCollectionParamType {
    [MediaTagCollectionParam.status]: number;
}
//User
export enum UserParam {
    id = "id",
    name = "name",
    isModerator = "isModerator",
    search = "search",
    sort = "sort",
}

export interface UserParamType {
    [UserParam.id]: number;
    [UserParam.name]: string;
    [UserParam.isModerator]: boolean;
    [UserParam.search]: string;
    [UserParam.sort]: UserSort[];
}
//Viewer
export enum ViewerParam {}

export enum ViewerParamType {}

// MediaSource
export enum MediaSource {
    ORIGINAL = "ORIGINAL",
    MANGA = "MANGA",
    LIGHT_NOVEL = "LIGHT_NOVEL",
    VISUAL_NOVEL = "VISUAL_NOVEL",
    VIDEO_GAME = "VIDEO_GAME",
    OTHER = "OTHER",
}

// MediaSort
export enum MediaSort {
    ID = "ID",
    ID_DESC = "ID_DESC",
    TITLE_ROMAJI = "TITLE_ROMAJI",
    TITLE_ROMAJI_DESC = "TITLE_ROMAJI_DESC",
    TITLE_ENGLISH = "TITLE_ENGLISH",
    TITLE_ENGLISH_DESC = "TITLE_ENGLISH_DESC",
    TITLE_NATIVE = "TITLE_NATIVE",
    TITLE_NATIVE_DESC = "TITLE_NATIVE_DESC",
    TYPE = "TYPE",
    TYPE_DESC = "TYPE_DESC",
    FORMAT = "FORMAT",
    FORMAT_DESC = "FORMAT_DESC",
    START_DATE = "START_DATE",
    START_DATE_DESC = "START_DATE_DESC",
    END_DATE = "END_DATE",
    END_DATE_DESC = "END_DATE_DESC",
    SCORE = "SCORE",
    SCORE_DESC = "SCORE_DESC",
    POPULARITY = "POPULARITY",
    POPULARITY_DESC = "POPULARITY_DESC",
    TRENDING = "TRENDING",
    TRENDING_DESC = "TRENDING_DESC",
    EPISODES = "EPISODES",
    EPISODES_DESC = "EPISODES_DESC",
    DURATION = "DURATION",
    DURATION_DESC = "DURATION_DESC",
    STATUS = "STATUS",
    STATUS_DESC = "STATUS_DESC",
    CHAPTERS = "CHAPTERS",
    CHAPTERS_DESC = "CHAPTERS_DESC",
    VOLUMES = "VOLUMES",
    VOLUMES_DESC = "VOLUMES_DESC",
    UPDATED_AT = "UPDATED_AT",
    UPDATED_AT_DESC = "UPDATED_AT_DESC",
}

// MediaTrendSort
export enum MediaTrendSort {
    ID = "ID",
    ID_DESC = "ID_DESC",
    MEDIA_ID = "MEDIA_ID",
    MEDIA_ID_DESC = "MEDIA_ID_DESC",
    DATE = "DATE",
    DATE_DESC = "DATE_DESC",
    TRENDING = "TRENDING",
    TRENDING_DESC = "TRENDING_DESC",
    AVERAGE_SCORE = "AVERAGE_SCORE",
    AVERAGE_SCORE_DESC = "AVERAGE_SCORE_DESC",
    POPULARITY = "POPULARITY",
    POPULARITY_DESC = "POPULARITY_DESC",
    EPISODE = "EPISODE",
    EPISODE_DESC = "EPISODE_DESC",
    RELEASING = "RELEASING",
    RELEASING_DESC = "RELEASING_DESC",
}

// AiringSort
export enum AiringSort {
    ID = "ID",
    ID_DESC = "ID_DESC",
    MEDIA_ID = "MEDIA_ID",
    MEDIA_ID_DESC = "MEDIA_ID_DESC",
    EPISODE = "EPISODE",
    EPISODE_DESC = "EPISODE_DESC",
    AIRING_AT = "AIRING_AT",
    AIRING_AT_DESC = "AIRING_AT_DESC",
}

// CharacterSort
export enum CharacterSort {
    ID = "ID",
    ID_DESC = "ID_DESC",
    ROLE = "ROLE",
    ROLE_DESC = "ROLE_DESC",
    SEARCH_MATCH = "SEARCH_MATCH",
    SEARCH_MATCH_DESC = "SEARCH_MATCH_DESC",
}

// StaffSort
export enum StaffSort {
    ID = "ID",
    ID_DESC = "ID_DESC",
    ROLE = "ROLE",
    ROLE_DESC = "ROLE_DESC",
    SEARCH_MATCH = "SEARCH_MATCH",
    SEARCH_MATCH_DESC = "SEARCH_MATCH_DESC",
}

// MediaType
export enum MediaType {
    ANIME = "ANIME",
    MANGA = "MANGA",
}

// MediaListStatus
export enum MediaListStatus {
    CURRENT = "CURRENT",
    PLANNING = "PLANNING",
    COMPLETED = "COMPLETED",
    DROPPED = "DROPPED",
    PAUSED = "PAUSED",
    REPEATING = "REPEATING",
}

// MediaListSort
export enum MediaListSort {
    MEDIA_ID = "MEDIA_ID",
    MEDIA_ID_DESC = "MEDIA_ID_DESC",
    SCORE = "SCORE",
    SCORE_DESC = "SCORE_DESC",
    STATUS = "STATUS",
    STATUS_DESC = "STATUS_DESC",
    PROGRESS = "PROGRESS",
    PROGRESS_DESC = "PROGRESS_DESC",
    REPEAT = "REPEAT",
    REPEAT_DESC = "REPEAT_DESC",
    PRIORITY = "PRIORITY",
    PRIORITY_DESC = "PRIORITY_DESC",
    STARTED_ON = "STARTED_ON",
    STARTED_ON_DESC = "STARTED_ON_DESC",
    FINISHED_ON = "FINISHED_ON",
    FINISHED_ON_DESC = "FINISHED_ON_DESC",
    ADDED_TIME = "ADDED_TIME",
    ADDED_TIME_DESC = "ADDED_TIME_DESC",
    UPDATED_TIME = "UPDATED_TIME",
    UPDATED_TIME_DESC = "UPDATED_TIME_DESC",
}

// GenreSort
export enum GenreSort {
    ID = "ID",
    ID_DESC = "ID_DESC",
    NAME = "NAME",
    NAME_DESC = "NAME_DESC",
    SEARCH_MATCH = "SEARCH_MATCH",
    SEARCH_MATCH_DESC = "SEARCH_MATCH_DESC",
}

// UserSort
export enum UserSort {
    ID = "ID",
    ID_DESC = "ID_DESC",
    USERNAME = "USERNAME",
    USERNAME_DESC = "USERNAME_DESC",
    WATCHED_TIME = "WATCHED_TIME",
    WATCHED_TIME_DESC = "WATCHED_TIME_DESC",
    CHAPTERS_READ = "CHAPTERS_READ",
    CHAPTERS_READ_DESC = "CHAPTERS_READ_DESC",
    SEARCH_MATCH = "SEARCH_MATCH",
    SEARCH_MATCH_DESC = "SEARCH_MATCH_DESC",
}

// FuzzyDateInput
export interface FuzzyDateInput {
    year?: number;
    month?: number;
    day?: number;
}
