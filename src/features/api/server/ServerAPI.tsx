export enum SeriesInfoType {
    // seriesOrigin, seriesInfoPage, seriesWatchPage
    seriesOrigin = "seriesOrigin",
    seriesInfoPage = "seriesInfoPage",
    seriesWatchPage = "seriesWatchPage",
}

export function getSeries(seriesInfo: SeriesInfoType) {
    fetch("http:localhost:5555/api/animeTrack/getSeries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            seriesInfo,
        }),
    });
}
