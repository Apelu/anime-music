import { Feature, FeatureStatus } from "@features/documentation/constants";
// import { AnimeSubBarFeature } from "./AnimeSubBar";

const SubBarFeatures = [
    {
        title: "The SubBar",
        description:
            "A small menu right below the NavBar that displays quick actions for the current page without taking up a lot of space.",
        subfeatures: [
            {
                title: "Previous Background Action",
                description: "Displays the previous background in the list.",
            },
            {
                title: "Toggle Background SubBar Menu Action",
                description:
                    "Toggles the Background SubBar Menu on and off. This menu allows you to quickly change the background settings (See Background Features).",
            },
            {
                title: "Toggle [...] SubBar Menu Action",
                description:
                    "Toggles the SubBar Menu for the current page on and off. Example: The Anime SubBar Menu (See Anime Features).",
            },
            {
                title: "Toggle Watch Sites SubBar Menu Action",
                description:
                    "Toggles the Watch Sites SubBar Menu on and off. Will more than likely just be site name and logo.",
            },
            {
                title: "Next Background Action",
                description: "Displays the next background image in the list.",
            },
        ],
    },
];

export const topLevelAnimeFeature: Feature = {
    title: "Anime",
    description: "All the features related to anime.",
    status: FeatureStatus.InProgress,
    // subfeatures: [AnimeSubBarFeature],
};

/**
 * Retrieve user's anime list from AniList
 * Update AniList through seperate chrome extension
 * Display anime in a grid
 * Display anime in a list
 * Display anime in a carousel
 * Sort anime by [Title, Score, Progress, Last Updated, Last Added, Start Date, Completed Date]
 * Filter anime by [Status, Format, Tag]
 * Search for anime by Search Text
 * Group anime by [Default, Status]
 * Display anime next airing if current season
 * Current Episode / Total Episodes
 * Score
 * Type of Anime
 * Airing Status
 * Season Aired (Year, Season)
 * Title
 * Alternative Titles
 * Site being watched on
 * Change Status
 * Change Progress
 * Change Score
 * Open in AniList
 * Go to Watch Page / if not stored open watch site search page for the anime (?query=anime-title)
 */
