function AutomatedDownload() {
    const data = {
        "https://www.wcoanimesub.tv/anime/wataris-xx-is-about-to-collapse-english-subbed":
            {
                lastPull: 1759261973501,
                lastNewEpisode: 1759090911133,
                finishedAiring: false,
                allowCreateFolder: ["Watari-kun no xx ga Houkai Sunzen"],
                defaultCreateFolder: [
                    "Watari-kun's XX Is about to Collapse",
                    "Watari's XX Is about to Collapse",
                ],
            },
        "https://www.wcoanimesub.tv/anime/secrets-of-the-silent-witch-english-subbed":
            {
                lastPull: null,
                lastNewEpisode: 1759269625805,
                finishedAiring: false,
                allowCreateFolder: [],
                defaultCreateFolder: ["Secrets of the Silent Witch"],
            },
        "https://www.wcoanimesub.tv/anime/summer-pockets-english-subbed": {
            lastPull: null,
            lastNewEpisode: 1759269684865,
            finishedAiring: false,
            allowCreateFolder: [],
            defaultCreateFolder: ["Summer Pockets"],
        },
        "https://www.wcoanimesub.tv/anime/ruri-rocks-english-subbed": {
            lastPull: null,
            lastNewEpisode: 1759269701159,
            finishedAiring: false,
            allowCreateFolder: [],
            defaultCreateFolder: ["Ruri Rocks"],
        },
        "https://www.wcoanimesub.tv/anime/witch-watch-english-subbed": {
            lastPull: null,
            lastNewEpisode: 1759269733363,
            finishedAiring: false,
            allowCreateFolder: [],
            defaultCreateFolder: ["Witch Watch"],
        },
    };

    const planning = {
        "<seriesPageUrl>": {
            originalSeriesTitle: "<Original Series Title>",
            originalImageUrl: "<Original Image Url>",

            // episodeData: [
            //     {
            //         episodeNumber: 1,
            //         episodeTitle: "<Episode Title>",
            //     }
            // ]

            // lastPull: null,
            // lastNewEpisode: 1759269733363,
            // finishedAiring: false,
            // allowCreateFolder: [],
            // defaultCreateFolder: ["Witch Watch"],
        },
    };

    return (
        <div className="container mt-3 bg-dark">
            <h3>Automated Download</h3>
        </div>
    );
}

export default AutomatedDownload;
