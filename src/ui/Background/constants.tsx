export enum BackgroundType {
    Image = "image",
    Video = "video",
}

export enum BackgroundKey {
    ID = "id",
    Type = "type",
    Url = "url",
    BackupUrl = "backupUrl",
    Poster = "poster",
    Description = "description",
}

export interface BackgroundItem {
    [BackgroundKey.ID]?: number;
    [BackgroundKey.Type]: BackgroundType.Image | BackgroundType.Video;
    [BackgroundKey.Url]: string;
    [BackgroundKey.BackupUrl]?: string;
    [BackgroundKey.Description]?: string;
    [BackgroundKey.Poster]?: string;
    ignore?: boolean;
}

export const initialBackgroundItems: BackgroundItem[] = [
    {
        [BackgroundKey.Type]: BackgroundType.Image,
        [BackgroundKey.Url]:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx141391-pUVgnceYVhJE.jpg",
        [BackgroundKey.Description]: "Call of the Night (Cover)",
    },
    {
        [BackgroundKey.Type]: BackgroundType.Image,
        [BackgroundKey.Url]:
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/141391-JErChZ8G3b49.jpg",
        [BackgroundKey.Description]: "Call of the Night (Banner)",
    },
    {
        [BackgroundKey.Type]: BackgroundType.Image,
        [BackgroundKey.Url]:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx12189-eBb6fcM21Zh7.jpg",
        [BackgroundKey.Description]: "Hyouka (Cover)",
    },
    {
        [BackgroundKey.Type]: BackgroundType.Video,
        [BackgroundKey.Url]:
            "https://mylivewallpapers.com/download/4k-muzan-kibutsuji-live-wallpaper/?wpdmdl=57045&refresh=66a01b401bc851721768768",
        [BackgroundKey.Poster]:
            "https://mylivewallpapers.com/wp-content/uploads/Anime/PREVIEW-Muzan-Kibutsuji.mp4",
        [BackgroundKey.Description]: "MUZAN KIBUTSUJI LIVE WALLPAPER",
    },
    {
        [BackgroundKey.Type]: BackgroundType.Video,
        [BackgroundKey.Url]:
            "https://mylivewallpapers.com/download/4k-thousand-sunny-one-piece-live-wallpaper/?wpdmdl=56764&refresh=66a01bcf305cc1721768911",
        [BackgroundKey.Poster]:
            "https://mylivewallpapers.com/wp-content/uploads/Anime/PREVIEW-Thousand-Sunny-One-Piece.mp4",
        [BackgroundKey.Description]: "THOUSAND SUNNY ONE PIECE LIVE WALLPAPER",
    },
    {
        [BackgroundKey.Type]: BackgroundType.Video,
        [BackgroundKey.Url]:
            "https://mylivewallpapers.com/download/4k-miyamoto-vagabond-live-wallpaper/?wpdmdl=56695&refresh=66a01bd1977181721768913",
        [BackgroundKey.Poster]:
            "https://mylivewallpapers.com/wp-content/uploads/Anime/PREVIEW-Miyamoto-Vagabond.mp4",
        [BackgroundKey.Description]: "MIYAMOTO VAGABOND LIVE WALLPAPER",
    },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=23770",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Tanjiro-Fire-Katana-Demon-Slayer.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=25264",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-KonoSuba-Magic-Spells-Megumin.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=17018",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Kochou-Shinobu.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=15631",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Hatake-Kakashi-Naruto.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=17687",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Giyu-Tomioka-Kimetsu-No-Yaiba.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=6393",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Shoto-Todoroki.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=8734",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-One-Piece-Ship.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=13040",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Midoriya-Boku-no-Hero.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=16921",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Kimetsu-no-Yaiba.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=13934",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Sniper.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=2621",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Konosuba-Dance.png",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=3152",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Rain-Pond.png",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=7403",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Megumin.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=17166",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Blaze.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=3608",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-One-Punch-Man.png",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=5009",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Shingeki-No-Kyojin.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=13954",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Telephone-Booth.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=9334",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Rem-ReZero.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=14159",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Steins-Gate-Okabe-Kurisux.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=17635",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Tengen-Uzui-Kimetsu-no-Yaiba.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=9569",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Steins-Gate.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=15488",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Albedo-Overlord-1.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=17287",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Inori-Yuzuriha-Guilty-Crown.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=12316",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Katekyo-Hitman-Reborn.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=11944",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Kill-La-Kill-Ryuko-Matoi.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=18317",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-Shinobu-Kochou-Butterfly.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://mylivewallpapers.com/?ddownload=14008",
    //     [BackgroundKey.Poster]:
    //         "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Anime/thumb-One-Punch-Man-Fly.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://wallpaperwaifu.com/download/1129/",
    //     [BackgroundKey.Poster]:
    //         "https://wallpaperwaifu.com/wp-content/uploads/2020/03/senku-ishigami-dr-stone-thumb-1500x844.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://wallpaperwaifu.com/download/1125/",
    //     [BackgroundKey.Poster]:
    //         "https://wallpaperwaifu.com/wp-content/uploads/2020/03/schwi-dola-no-game-no-life-zero-thumb-1500x844.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://wallpaperwaifu.com/download/1939/",
    //     [BackgroundKey.Poster]:
    //         "https://wallpaperwaifu.com/wp-content/uploads/2021/04/tanya-degurechaff-youjo-senki-thumb-1500x844.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]: "https://wallpaperwaifu.com/download/11/",
    //     [BackgroundKey.Poster]:
    //         "https://wallpaperwaifu.com/wp-content/uploads/2019/09/anime-robot-girl-thumb-1500x844.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]:
    //         "https://thumbs.gfycat.com/AdolescentLongBandicoot-mobile.mp4",
    //     [BackgroundKey.Poster]:
    //         "https://thumbs.gfycat.com/AdolescentLongBandicoot-mobile.jpg",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]:
    //         "https://media.tenor.com/videos/3f65a0cd55ab1f18c66c9338972cf471/mp4",
    //     [BackgroundKey.Poster]:
    //         "https://media1.tenor.com/images/508fe7a0908b87ea1de36391094a1049/tenor.gif?itemid=9214816",
    // },
    // {
    //     [BackgroundKey.Type]: BackgroundType.Video,
    //     [BackgroundKey.Url]:
    //         "https://media.tenor.com/videos/1f59fab27a9d9bfb1b29f2b91d266c51/mp4",
    //     [BackgroundKey.Poster]:
    //         "https://media1.tenor.com/images/c0011b22ef40718152484c7e11fd4b6d/tenor.gif?itemid=14677284",
    // },
];

// {
//     id: 1721879935266,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12371",
//     description: "Sakura Drops Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Sakura-Drops.jpg",
// },
// {
//     id: 1721879935267,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12389",
//     description: "Reach Out-Nier Automata Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Reach-Out-Nier-Automata.jpg",
// },
// {
//     id: 1721879935268,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12409",
//     description: "Anime Girl Shooting Stars Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Anime-Girl-Shooting-Stars.jpg",
// },
// {
//     id: 1721879935269,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12447",
//     description: "Uraraka Ochako Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Uraraka-Ochako.jpg",
// },
// {
//     id: 1721879935270,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12471",
//     description: "Izumi Sagiri Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Izumi-Sagiri.jpg",
// },
// {
//     id: 1721879935272,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12493",
//     description: "Mashu Kyrielight-Fate Grand Order Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Mashu-Kyrielight-FGO.jpg",
// },
// {
//     id: 1721879935273,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12497",
//     description: "Berserker-Fate Zero Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Berserker-Fate-Zero.jpg",
// },
// {
//     id: 1721879935274,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12534",
//     description: "Spice and Wolf Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Spice-and-Wolf.jpg",
// },
// {
//     id: 1721879935275,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12538",
//     description: "Natsuki-Doki Doki Literature Club Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Natsuki-Doki-Doki-Literature-Club.jpg",
// },
// {
//     id: 1721880008221,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12542",
//     description: "My Neighbor Totoro Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-My-Neighbor-Totoro.jpg",
// },
// {
//     id: 1721880008223,
//     type: BackgroundType.Video,
//     url: "https://mylivewallpapers.com/?ddownload=12562",
//     description: "Ayame Ugasi Live Wallpaper",
//     poster: "https://mylivewallpapers.com/wp-content/uploads/Anime/thumb-Ayame-Ugasi.jpg",
// },
