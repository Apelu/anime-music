import { AnimeData } from "@features/contexts/AnimeContext";
import { AnimeGroup } from "./AnimeGroup";
import {
    AniListAPI,
    getLatestWatchedEpisode,
    StorageKeys,
} from "./OfflineAnimeV2";
import { useEffect, useState } from "react";
import { doc } from "firebase/firestore";
import { ServerCalls } from "@features/ServerCalls";
import { ConfirmAniListMappingModal } from "./EpisodeViewPage";
import { useUserData } from "@features/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AniListLoginButton from "@pages/LoginPage/AniListLoginButton";

export function SeriesViewPage(props: SeriesViewPageProps) {
    const user = useUserData();
    const navigate = useNavigate();

    const [anilistOrder, setAnilistOrder] = useState<number[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [anime, setAnime] = useState<AnimeData | null>(null);

    async function fetchMoreData() {
        const accessToken = localStorage.getItem(StorageKeys.accessToken);
        if (!accessToken) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 30000));

        try {
            AniListAPI(
                `
                    query ($page: Int) {
                        Page(page: $page, perPage: 50) {
                            pageInfo {
                                total
                                perPage
                                currentPage
                                lastPage
                                hasNextPage
                            }
                            mediaList(type: ANIME, userId: 6022064, sort: UPDATED_TIME_DESC) {
                                mediaId
                            }
                        }
                    }
                    `,
                { page: pageNumber },
                accessToken,
                function (data) {
                    setAnilistOrder([
                        ...anilistOrder,
                        ...data.data.Page.mediaList.map((m: any) => m.mediaId),
                    ]);

                    if (data.data.Page.pageInfo.hasNextPage) {
                        setPageNumber(pageNumber + 1);
                    }
                    console.log("Anilist order", data.data.Page.mediaList);
                }
            );
        } catch (e) {}
    }
    // useEffect(() => {
    //     // fetchMoreData();
    // }, [pageNumber]);

    const { animeData, refreshData } = props;

    // useEffect(() => {
    //     const serverCalls = new ServerCalls();
    //     const eventSource = new EventSource(serverCalls.getUpdatesUrl({}));

    //     eventSource.onmessage = event => {
    //         const eventData = JSON.parse(event.data);
    //         console.log("Received update:", eventData);

    //         const MyEvents = {
    //             StepsUpdated: "StepsUpdated",
    //             WatchController: "WatchController",
    //             SeriesSecondsLeft: "SeriesSecondsLeft",
    //             FileUpdated: "FileUpdated",
    //         };

    //         if (eventData.eventName == MyEvents.WatchController) {
    //             // const watchEventData = eventData.eventPayload;
    //             // const command = watchEventData.command;
    //             // if (command.indexOf("open|") == 0) {
    //             //     const url = command.split("|")[1];
    //             //     document.location.href = url;
    //             // }
    //         } else if (eventData.eventName == MyEvents.FileUpdated) {
    //             // props.refreshData();
    //         }
    //     };

    //     return () => {
    //         eventSource.close();
    //     };
    // }, []);

    useEffect(() => {}, [user.aniList?.access_token]);

    const startedAnime = animeData
        .filter(anime => getLatestWatchedEpisode(anime))
        .sort((a, b) => {
            const aLastWatchedEpisode = getLatestWatchedEpisode(a);
            const bLastWatchedEpisode = getLatestWatchedEpisode(b);

            if (!aLastWatchedEpisode || !bLastWatchedEpisode) {
                return 0;
            }

            return (
                b.watchProgress[bLastWatchedEpisode].lastUpdated -
                a.watchProgress[aLastWatchedEpisode].lastUpdated
            );
        });

    const continueWatching = startedAnime.filter(a => {
        return !(
            a.watchProgress[a.episodes[a.episodes.length - 1]] &&
            a.watchProgress[a.episodes[a.episodes.length - 1]].progress
        );
    });

    const completedAnime = startedAnime.filter(a => {
        return (
            a.watchProgress[a.episodes[a.episodes.length - 1]] &&
            a.watchProgress[a.episodes[a.episodes.length - 1]].progress
        );
    });

    console.log(completedAnime);
    const recs: Record<string, string> = {
        "15": "Eyeshield 21",
        "126": "Futakoi Alternative",
        "196": "Onegai☆Twins",
        "264": "Hajime no Ippo: Champion Road",
        "356": "Fate/stay night",
        "376": "Elfen Lied: Tooriame nite - Arui wa, Shoujo wa Ikani Shite Sono Shinjou ni Itatta ka?",
        "395": "GANTZ 2",
        "430": "Hagane no Renkinjutsushi: Shamballa wo Yuku Mono",
        "442": "NARUTO: Dai Katsugeki! Yuki Hime Ninpouchou Dattebayo!!",
        "443": "Onegai☆Teacher OVA",
        "478": "Sousei no Aquarion",
        "594": "NARUTO: Takigakure no Shitou - Ore ga Eiyuu Dattebayo!",
        "596": "Chobits: Chibits - Sumomo, Kotoko Todokeru",
        "664": "Hagane no Renkinjutsushi: Reflections",
        "665": "JoJo no Kimyou na Bouken (2000)",
        "756": "School Days",
        "761": "NARUTO: Akaki Yotsuba no Clover wo Sagase",
        "834": "BLEACH: The Sealed Sword Frenzy",
        "908": "Hagane no Renkinjutsushi: PREMIUM COLLECTION",
        "936": "NARUTO: Dai Gekitotsu! Maboroshi no Chitei Iseki Dattebayo",
        "971": "Astro Boy Tetsuwan Atom",
        "972": "Bible Black Gaiden",
        "1074": "NARUTO: Narutimate Hero 3: Tsui ni Gekitotsu! Jounin VS Genin!! Musabetsu Dairansen Taikai Kaisai!!",
        "1123": "Bouken Ou Beet Excellion",
        "1252": "Fushigi no Umi no Nadia: Original Movie",
        "1401": "Shin Bible Black",
        "1519": "BLACK LAGOON: The Second Barrage",
        "1520": "Black Jack",
        "1540": "Touch: Miss Lonely Yesterday - Are kara, Kimi wa...",
        "1546": "Negima!?",
        "1598": "Casshern",
        "1686": "BLEACH: MEMORIES OF NOBODY",
        "1735": "NARUTO: Shippuuden",
        "1762": "Arslan Senki",
        "1817": "DearS: Kin no Tama desu no?",
        "1842": "Major S3",
        "2144": "NARUTO: Dai Koufun! Mikazukijima no Animal Panic Dattebayo!",
        "2187": "Shuudan Chikan Densha",
        "2213": "Black Jack (TV)",
        "2389": "Kagaku Ninja-Tai Gatchaman",
        "2402": "Ashita no Joe",
        "2491": "Touch: Sebangou no Nai Ace",
        "2492": "Touch 2: Sayonara no Okurimono",
        "2493": "Touch 3: Kimi ga Toorisugita Ato ni - DON'T PASS ME BY",
        "2594": "Piano no Mori",
        "2682": "Aoki Densetsu Shoot! (Movie)",
        "2747": "Tetsuwan Atom",
        "2873": "Bible Black Only Version",
        "2889": "BLEACH: The DiamondDust Rebellion - Mou Hitotsu no Hyourinmaru",
        "2971": "Kyou kara Maou! R",
        "3044": "Tetsuwan Atom (1980)",
        "3323": "Kite Liberator",
        "3328": "School Days: Magical Heart☆Kokoro-chan",
        "3381": "Fushigi no Umi no Nadia Specials",
        "3759": "School Days: Valentine Days",
        "3791": "AIR GEAR Special",
        "3883": "Yu-No",
        "3918": "Resort BOIN",
        "4080": "Kyou kara Maou! 3rd Series",
        "4106": "TRIGUN: Badlands Rumble",
        "4107": "Tengen Toppa Gurren Lagann: Gurren-hen",
        "4197": "BLUE DRAGON: Tenkai no Shichi Ryuu",
        "4214": "Rosario to Vampire Capu2",
        "4246": "Koukyoushihen Eureka Seven: Pocket ga Niji de Ippai",
        "4502": "Stringendo & Accelerando ULTIMATUM: SERA",
        "4565": "Tengen Toppa Gurren Lagann: Lagann-hen",
        "4705": "Tengen Toppa Gurren Lagann: Parallel Works",
        "4726": "Druaga no Tou: the Sword of URUK",
        "4760": "Kanokon Specials",
        "4798": "Druaga no Tou: The Aegis of Uruk - Jil no Bouken",
        "4810": "Shinzou Ningen Casshern",
        "4835": "BLEACH: Fade to Black - Kimi no Na wo Yobu",
        "4975": "ChäoS;HEAd",
        "5072": "Dragonaut: The Resonance Special",
        "5114": "Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST",
        "5259": "Rance: Sabaku no Guardian",
        "5347": "Bible Black: Imari Ryoujoku Genba",
        "5667": "To LOVE-Ru OVA",
        "5760": "Dororo to Hyakkimaru",
        "5764": "Zero no Tsukaima: Princesses no Rondo - Yuuwaku no Sunahama",
        "5947": "Tengen Toppa Gurren Lagann Movie: Lagann-hen Special - Viral no Amai Yume",
        "6023": "Nogizaka Haruka no Himitsu: Purezza",
        "6127": "Toradora!: SOS!",
        "6287": "Akikan! OVA",
        "6368": "Legend of Regios",
        "6399": "Higashi no Eden: Falling Down",
        "6443": "AIKa: ZERO",
        "6489": "Zero no Tsukaima: Princesses no Rondo Picture Drama",
        "6772": "Break Blade 1: Kakusei no Toki",
        "6791": "Kanokon: Manatsu no Dai Shanikusai",
        "6922": "Fate/stay night Movie: UNLIMITED BLADE WORKS",
        "7367": "NARUTO: THE CROSS ROADS",
        "7474": "Onegai☆Teacher: Marie, Ai no Gekijou",
        "7739": "11eyes OVA",
        "7744": "Fight Ippatsu! Juuden-chan!! Specials",
        "7768": "Tantei Opera Milky Holmes",
        "7791": "K-ON!!",
        "7805": "Baka to Test to Shoukanjuu: Mondai - Christmas ni Tsuite Kotae Nasai",
        "7870": "Baka to Test to Shoukanjuu Specials",
        "8190": "Nodame Cantabile OVA 2",
        "8247": "BLEACH: Jigoku-hen",
        "8348": "Tengen Toppa Gurren Lagann: Parallel Works 2",
        "8408": "Durarara!! Specials",
        "8460": "Mirai Nikki OVA",
        "8514": "Break Blade 2: Ketsubetsu no Michi",
        "8619": "Ladies versus Butlers! Tokuten Disc Music Clip",
        "9023": "Kateikyoushi Hitman REBORN!: Mr. Rebokku no Ciao Ciao Interview",
        "9032": "Inazuma Eleven: Saikyou Gundan Ogre Shuurai",
        "9120": "Beelzebub: Hirotta Akachan wa Daimaou!?",
        "9201": "AIR GEAR: Kuro no Hane to Nemuri no Mori - Break on the Sky",
        "9203": "K-ON!!: Ura-On!!",
        "9252": "Break Blade 3: Kyoujin no Ato",
        "9366": "Kaichou wa Maid-sama!: Omake dayo!",
        "9465": "Break Blade 4: Sanka no Chi",
        "9471": "Baka to Test to Shoukanjuu: Matsuri",
        "9591": "Code Geass: Hangyaku no Lelouch R2 FLASH Flash - Kaette Kita BABA Gekijou",
        "9618": "Asobi ni Iku yo! Asobi ni Oide",
        "9656": "Kimi ni Todoke 2ND SEASON",
        "9724": "Break Blade 5: Shisen no Hate",
        "9754": "Kuragehime Eiyuu Retsuden☆",
        "9849": "Akina to Onsen de H Shiyo!",
        "9925": "Amagami SS: Imouto",
        "9982": "FAIRY TAIL OVA",
        "10092": "Break Blade 6: Doukoku no Toride",
        "10298": "Kaichou wa Maid-sama!: Goshujin-sama to Asonjao♥",
        "10391": "Kuragehime: Soreike! Amars Tankentai",
        "10418": "Deadman Wonderland: Akai Knife Tsukai",
        "10470": "GOD EATER Prologue",
        "10479": "Beelzebub: Hashire! Beel-bo Keiji!!",
        "10507": "Inazuma Eleven GO",
        "10582": "Astarotte no Omocha! EX",
        "10622": "Tengen Toppa Gurren Lagann: Ore no Gurren wa Pikka-Pika!!",
        "10647": "Ao no Exorcist: Ura Eku",
        "10659":
            "NARUTO: Soyokazeden - Naruto to Mashin to Mitsu no Onegai Dattebayo!!",
        "10765":
            "Hikaru no Go: Tokubetsu-hen - Sabaki no Ikkyoku! Inishie no Hana yo Sake!!",
        "10794": "IS: Infinite Stratos Encore - Koi ni Kogareru Sextet",
        "10834":
            "Baka to Test to Shoukanjuu: SPINOUT! Sore ga Bokura no Nichijou",
        "10845": "Manyuu Hikenchou Specials",
        "10863": "Steins;Gate: Oukoubakko no Poriomania",
        "11113": "Usagi Drop Specials",
        "11266": "Ao no Exorcist: Kuro no Iede",
        "11313": "Kimi no Iru Machi: Tasogare Kousaten",
        "11511": "Evidence",
        "11553": "Toradora!: Bentou no Gokui",
        "11577": "Steins;Gate: Fuka Ryouiki no Déjà vu",
        "11701": "Another: The Other - Inga",
        "11771": "Kuroko no Basket",
        "11813": "Shijou Saikyou no Deshi Kenichi OVA",
        "12049": "FAIRY TAIL: Houou no Miko",
        "12121": "Towa no Kizuna",
        "12239": "Manyuu Hikenchou Picture Drama",
        "12447": "Ben-To Picture Drama",
        "12503": "Mirai Nikki: Ura Mirai Nikki",
        "12673": "Papa no Iukoto wo Kikinasai!: Pokkapoka",
        "12961": "Kansen 5: THE Daybreak",
        "13055": "Sankarea (OVA)",
        "13067": "Beelzebub: Sakigake!! Beel to Shinsengumi",
        "13093": "Nazo no Kanojo X: Nazo no Natsu Matsuri",
        "13271": "HUNTER×HUNTER: Phantom Rouge",
        "13517": "Ryuugajou Nanana no Maizoukin PV",
        "13663": "To LOVE-Ru Darkness",
        "13731": "Koukyoushihen Eureka Seven: New Order",
        "13859": "Accel World: Acchel World.",
        "13939": "Accel World EX",
        "14353": "Death Billiards",
        "14647": "Tantei Opera Milky Holmes: Alternative",
        "14685": "Onegai☆Teacher: Reminiscence",
        "14753": "Hori-san to Miyamura-kun",
        "14893": "Dakara Boku wa, H ga Dekinai.: Mie Sugi! Mizugi Contest",
        "15199": "Code Geass: Boukoku no Akito 3 - Kagayakumono Ten Yori Otsu",
        "15411": "Arcana Famiglia: Capriccio - stile Arcana Famiglia",
        "15609": "Kono Naka ni Hitori, Imouto ga Iru!: Ani, Imouto, Koibito",
        "15633": "CØDE:BREAKER (OVA)",
        "15687": "Chuunibyou demo Koi ga Shitai! Lite",
        "15711": "Bakuman. Special: Deraman.",
        "15879":
            "Chuunibyou demo Koi ga Shitai!: DEPTH OF FIELD - Ai to Nikushimi Gekijou",
        "15905": "Qin Shi Mingyue: Wanli Changcheng",
        "15993": "Ginga e Kickoff!!: Natsuyasumi Special",
        "16099": "Sword Art Offline",
        "16444":
            "Mondaiji-tachi ga Isekai kara Kuru Sou desu yo?: Onsen Manyuuki",
        "16532": "Beelzebub: Kaiketsu!! Beel-bo Meitantei Suiri",
        "16636": "Kotoura-san: Haruka no Heya",
        "16644": "Soushi Souai: Junai Mellow yori",
        "16762": "Mirai Nikki: Redial",
        "16866": "Tonari no Kaibutsu-kun: Tonari no Gokudou-kun",
        "16868": "Sukitte Ii na yo.: Dareka ga",
        "16932": "Drifters (OVA)",
        "16934": "Chuunibyou demo Koi ga Shitai!: Kirameki no… Slapstick Noel",
        "17391": "Senyuu. Specials",
        "17409": "Sukitte Ii na yo. Specials",
        "17419": "Dog Days' Specials",
        "17573": "Planetarium Uchuu Kyoudai: Itten no Hikari",
        "17643": "Little Busters! Sekai no Saitou wa Ore ga Mamoru!",
        "17745": "Kakushi Dere",
        "17819": "Kyoto Animation: Suiei-hen",
        "18001": "Freezing Vibration",
        "18177": "Yowamushi Pedal: SPECIAL RIDE",
        "18397": "Shingeki no Kyojin OVA",
        "18413": "Puchitto Gargantia",
        "18441": "Blood Lad: Wagahai wa Neko de wa Nai",
        "18523": "Senyuu. 2",
        "18597": "Kanojo x Kanojo x Kanojo (2013)",
        "18799": "Take Your Way",
        "18851": "Fate/kaleid liner Prisma☆Illya: Undoukai DE Dance!",
        "18881": "Code Geass: Hangyaku no Lelouch - Kiseki no BABA Gekijou",
        "19021": "Takanashi Rikka Kai: Chuunibyou demo Koi ga Shitai! Movie",
        "19109": "Fate/kaleid liner Prisma☆Illya Specials",
        "19211": "Suisei no Gargantia OVA",
        "19363": "Gin no Saji 2",
        "19391":
            "Shingeki no Kyojin: Chimi Kyara Gekijou - Tondeke! Kunren Heidan",
        "19447": "Arata Kangatari Picture Drama",
        "19469": "Saiki Kusuo no Ψ-nan (ONA)",
        "19581": "Houseki no Kuni PV",
        "19603": "Fate/stay night: Unlimited Blade Works",
        "19671": "FrFr!: Free! short movie",
        "19759": "Ansatsu Kyoushitsu: Jump Festa 2013 Special",
        "19951": "HUNTER×HUNTER: THE LAST MISSION",
        "20021": "Sword Art Online: Extra Edition",
        "20359": "Yamada-kun to 7-nin no Majo (ONA)",
        "20365": "Another: Misaki Mei - Shizuka ni",
        "20451": "Machine-Doll wa Kizutsukanai OVA",
        "20474": "JoJo no Kimyou na Bouken: Stardust Crusaders",
        "20479":
            "Ore no Nounai Sentakushi ga, Gakuen Love Comedy wo Zenryoku de Jama Shiteiru OVA",
        "20485": "Yama no Susume: Second Season",
        "20547": "Soul Eater Not!",
        "20559": "Uchuu Kyoudai #0",
        "20561": "Uchuu Kyoudai: Apo's Dream",
        "20567": "GJ-bu@",
        "20594": "Sword Art Online II",
        "20600": "Tonari no Seki-kun OVA",
        "20603": "Kuroko no Basket: Mou Ikkai Yarimasen ka",
        "20608": "Hentai Ouji to Warawanai Neko.: Henneko BBS",
        "20614": "Free!: Eternal Summer",
        "20626": "FAIRY TAIL (2014)",
        "20630": "Terra Formars: Bugs 2-hen",
        "20651": "Hayate no Gotoku! OVA",
        "20652": "Durarara!!x2 Shou",
        "20679": "Mahouka Koukou no Rettousei: Yoku Wakaru Mahouka",
        "20691": "Shingeki no Kyojin Zenpen: Guren no Yumiya",
        "20692": "Shingeki no Kyojin Kouhen: Jiyuu no Tsubasa",
        "20695": "Sekai Seifuku: Bouryaku no Zvezda - Shin Zvezda Daisakusen",
        "20711": "Re:_HAMATORA",
        "20715": "Kimi no Iru Machi OVA",
        "20719": "Hitsugi no Chaika: AVENGING BATTLE",
        "20724": "Hitsugi no Chaika: Nerawareta Hitsugi/Yomigaeru Iseki",
        "20725": "Kuroko no Basket 3rd SEASON",
        "20731": "Kanojo ga Flag wo Oraretara OVA",
        "20738": "Tonari no Seki-kun Specials",
        "20740": "Yamada-kun to 7-nin no Majo (OVA)",
        "20741": "Date A Live Movie: Mayuri Judgement",
        "20759": "Gatchaman Crowds: Embrace",
        "20763": "Aoki Hagane no Arpeggio: Ars Nova - DC",
        "20764": "Aoki Hagane no Arpeggio: Ars Nova - Cadenza",
        "20769": "No Game No Life Specials",
        "20775": "Akame ga Kill! Gekijou",
        "20782": "Barakamon: Mijikamon",
        "20791": "Fate/stay night [Heaven's Feel] I. presage flower",
        "20808": "Yowamushi Pedal: Re:RIDE",
        "20811": "Shingeki no Kyojin Gaiden: Kuinaki Sentaku",
        "20836": "Blade & Soul Specials",
        "20844": "DIABOLIK LOVERS OVA",
        "20850": "Tokyo Ghoul √A",
        "20856": "D-Frag! OVA",
        "20860": "Taimanin Yukikaze",
        "20861": "Diamond no Ace OVA",
        "20866": "Gokukoku no Brynhildr OVA",
        "20869": "Gekkan Shoujo Nozaki-kun Mini OVA",
        "20884": "Haikyuu!!: Lev Kenzan!",
        "20896": "Kon ga Oshiete Moshi Agemasu! Maru Wakari TOKYO RAVENS",
        "20900": "Ao Haru Ride PAGE.13",
        "20902": "Daitoshokan no Hitsujikai Picture Drama",
        "20907": "Steins;Gate: Soumei Eichi no Cognitive Computing",
        "20909": "Mushibugyou OVA",
        "20915": "BROTHERS CONFLICT Special",
        "20916": "BROTHERS CONFLICT OVA",
        "20926": "Akuma no Riddle Special",
        "21007": "Ookami Shoujo to Kuro Ouji: Gishinanki – Happening kiss",
        "21039": "Shigatsu wa Kimi no Uso: MOMENTS",
        "21041": "Bokura wa Minna Kawaisou: Shiro-san to Ore",
        "21064": "Trinity Seven: Nanatsu no Taizai to Nana Madoushi",
        "21085": "Diamond no Ace: Second Season",
        "21098": "Strike the Blood: Valkyria no Oukoku-hen",
        "21104": "Nanatsu no Taizai OVA",
        "21114": "Yowamushi Pedal (Movie)",
        "21119": "Sousei no Aquarion EVOL",
        "21132": "Tokyo Ghoul: [JACK]",
        "21158": "High☆Speed!: Free! Starting Days",
        "21173": "Otome Hime",
        "21194": "Yowamushi Pedal: Re:ROAD",
        "21208": "Yankee-kun na Yamada-kun to Megane-chan to Majo",
        "21252": "GATCHAMAN CROWDS insight #0 inbound",
        "21258": "Akagami no Shirayuki-hime 2nd Season",
        "21277": "GARO: Guren no Tsuki",
        "21281": "Shingeki! Kyojin Chuugakkou",
        "21300": "Terra Formars: Revenge",
        "21303": "Ansatsu Kyoushitsu: episode:0 Deai no Jikan",
        "21305": "Overlord: Ple Ple Pleiades",
        "21313": "Akagami no Shirayuki-hime: Nandemonai Takaramono, Kono Page",
        "21314": "Tantei Opera Milky Holmes Movie: Gyakushuu no Milky Holmes",
        "21317": "Arslan Senki: Kaki Oroshi 4-Koma Manga no Short Anime",
        "21326": "Tokyo Ghoul: [PINTO]",
        "21339": "Charlotte: Tsuyoimono-tachi",
        "21348": "Haikyuu!!: VS Akaten",
        "21383": "Classroom☆Crisis 5.5: Tabi no Haji wa Uwanuri",
        "21385": "Nanatsu no Taizai: Seisen no Shirushi",
        "21386": "One Punch Man: Road to Hero",
        "21387": "BIKINI WARRIORS: Genkai Toppa, Okite-Yaburi",
        "21404": "Accel World: Infinite∞Burst",
        "21413": "Valkyrie Drive: Mermaid Mini OVA",
        "21416": "One Punch Man OVA",
        "21446": "Mini Hama",
        "21467": "Baka to Test to Shoukanjuu Ni!: Mahou Hideyoshi Hideyoshi",
        "21492":
            'Ore ga Ojou-sama Gakkou ni "Shomin Sample" Toshite Gets-Sareta Ken: Kujou-san no Doesu Soudan-Shitsu Anime-ban',
        "21496": "GANTZ:O",
        "21518": "Shokugeki no Souma: Ni no Sara",
        "21558": "D.Gray-man HALLOW",
        "21574":
            "Kono Subarashii Sekai ni Shukufuku wo!: Kono Subarashii Choker ni Shukufuku wo!",
        "21592":
            "Dimension W: W no Tobira ONLINE - Rose no wo Nayami Soudanshitsu",
        "21618": "Furueru Kuchibiru: fuzzy lips 0",
        "21624": "Steins;Gate: Kyoukaimenjou no Missing Link - Divide By Zero",
        "21634": "PRETTY×CATION THE ANIMATION",
        "21640": "Kekkai Sensen: Ousama no Restaurant no Ousama",
        "21660":
            "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka: Dungeon ni Onsen wo Motomeru no wa Machigatteiru Darou ka",
        "21678": "Ansatsu Kyoushitsu 2: Kagaijugyou-hen",
        "21684": "Mahouka Koukou no Rettousei: Hoshi wo Yobu Shoujo",
        "21687": "Soul Eater Late Show",
        "21691": "Shokugeki no Souma OVA",
        "21746": "FLCL Progressive",
        "21752": "Ginga Kikoutai Majestic Prince: Mirai e no Tsubasa",
        "21769":
            "Yahari Ore no Seishun Love Come wa Machigatteiru. Zoku: Kitto, Onnanoko wa Osatou to Spice to Suteki na Nanika de Dekiteiru",
        "21778": "Kishibe Rohan wa Ugokanai",
        "21780": "Re:Zero kara Hajimeru Kyuukei Jikan (Break Time)",
        "21798": "K SEVEN STORIES: R:B ~BLAZE~",
        "21806": "Yowamushi Pedal: SPARE BIKE",
        "21815": "Strike the Blood II",
        "21817": "Arslan Senki (TV) OVA",
        "21855": "UQ Holder!: Mahou Sensei Negima! 2",
        "21861": "Ao no Exorcist: Kyoto Fujouou-hen",
        "21864": "Koro-sensei Q!",
        "21874": "Trinity Seven Movie - Yuukyuu Toshokan to Renkinjutsu Shoujo",
        "21879": "Inazuma Eleven: Ares no Tenbin",
        "21891": "Re:Petit kara Hajimeru Isekai Seikatsu",
        "87486": "Boku no Hero Academia: Sukue! Kyuujo Kunren!",
        "87489": "Overlord: Ple Ple Pleiades - Nazarick Saidai no Kiki",
        "87538": "Shounen Maid: Onna wa Dokyou, Otoko wa Aikyou?",
        "97607": "DAYS OVA",
        "97730": "Seiren",
        "97767": "High School DxD HERO",
        "97863": "Hajimete no Gal",
        "97875": "Nanbaka 2",
        "97880": "Code Geass: Fukkatsu no Lelouch",
        "97886": "Kekkai Sensen & BEYOND",
        "97910": "DAYS: Touin Gakuen-sen!",
        "97918": "Koutetsujou no Kabaneri: Unato Kessen",
        "97936": "Masou Gakuen HxH Specials",
        "97955":
            "Ane Log: Moyako Neesan no Honpen wo Tobidashite Tomaranai Monologue Specials",
        "97985": "Koro-sensei Q! (ONA)",
        "97996":
            "Kono Subarashii Sekai ni Shukufuku wo! 2: Kono Subarashii Geijutsu ni Shukufuku wo!",
        "98034": "Saiki Kusuo no Ψ-nan 2",
        "98186": "Youjo Shenki",
        "98206": "Dance with Devils: Fortuna",
        "98225": "Inazuma Eleven: Choujigen Dream Match",
        "98384": "Bungou Stray Dogs: DEAD APPLE",
        "98452": "Donten ni Warau Gaiden: Ketsubetsu, Yamainu no Chikai",
        "98469": "Koukyoushihen Eureka Seven Hi-Evolution 1",
        "98495": "Free!: Timeless Medley - Kizuna",
        "98574": "Yi Ren Zhi Xia 2",
        "98622": "sin: Nanatsu no Taizai Zange-roku",
        "98656": "Yuuri!!! on ICE The Movie: ICE ADOLESCENCE",
        "98662": "Koutetsujou no Kabaneri Soushuuhen Zenpen: Tsudou Hikari",
        "98663": "Koutetsujou no Kabaneri Soushuuhen Kouhen: Moeru Inochi",
        "98703": "Kuroko no Basket 2 NG-shuu",
        "98766": "Honoo no Haramase Oppai ★ Ero Appli Gakuen THE ANIMATION",
        "98778": "91Days: Day 13",
        "98814": "Dimension W: Short Track",
        "98856": "Busou Shoujo Machiavellianism OVA",
        "98873": "Overlord: Fushisha no Ou",
        "98874": "Overlord: Shikkoku no Senshi",
        "98885": "Haikyuu!!: Concept no Tatakai",
        "98970": "HHH: Triple Ecchi - Bonus Episode",
        "98971":
            'Rance 01: Hikari wo Motomete THE ANIMATION - Eizou Tokuten "Leazas no Yami"',
        "98976": "Enmusubi no Youko-chan",
        "99059": "Inazuma Eleven: Outer Code",
        "99530": "Just Awake",
        "99634": "Shingeki no Kyojin: LOST GIRLS",
        "99643": "Ookami Heart",
        "99734": "Dagashi Kashi 2",
        "99796": "GARO -VANISHING LINE-",
        "100049": "Re:Zero kara Hajimeru Isekai Seikatsu OVAs",
        "100227": "Nanbaka: Shusseki Bangou no Tsuita Baka-tachi!",
        "100353": "Mob Psycho 100 REIGEN: Shirarezaru Kiseki Reinouryokusha",
        "100465": "Shingeki no Kyojin Season 2: Kakusei no Houkou",
        "100523": "Eromanga Sensei OVA",
        "100644": "Nanatsu no Bitoku",
        "100684": "Net-juu no Susume OVA",
        "100719": "BLEACH Colorful!: Gotei Juusan Yatai Daisakusen!",
        "100723": "Boku no Hero Academia THE MOVIE: Futari no Hero",
        "100748": "Ura Jutaijima",
        "100876": "Kakegurui ××",
        "100878": "Youjo Senki Movie",
        "100912": "Kujira no Kora wa Sajou ni Manabu!",
        "100979": "ACCA: 13-ku Kansatsu-ka Specials",
        "101083": "Overlord: Ple Ple Pleiades 2",
        "101102": "Ansatsu Kyoushitsu Movie: 365-Nichi no Jikan",
        "101166":
            "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka: Orion no Ya",
        "101210": "Imouto Paradise! 3 The Animation",
        "101215": "Chihayafuru 3",
        "101339":
            "Eureka Seven AO Final Episode: One More Time - Lord Don't Slow Me Down",
        "101410": "Quanzhi Gaoshou Specials",
        "101432": 'Violet Evergarden: Kitto "Ai" wo Shiru Hi ga Kuru no Darou',
        "101501": "Koi to Uso: Isshou no Koi/Koi no Kimochi",
        "101775": "Ano Hi no Kanojotachi",
        "101816": "Kuroko no Basket: Oshaberi Demo Shimasen ka",
        "101928": "Shijou Saikyou no Deshi Kenichi OVA Specials",
        "102098": "GARO: Honoo no Kokuin - HOME",
        "102167": "Yuri Plisetsky GPF in Barcelona EX “Welcome to The Madness”",
        "102309": "Megalo Box Specials",
        "102449": "Mob Psycho mini",
        "102471": "Denpa Kyoushi CM",
        "102483": "Dog Days'': Gravure Talk",
        "102498": "B: The Beginning Succession",
        "102499": "Okusama ga Seitokaichou!: Okusama Gekijou",
        "102503": "Okusama ga Seitokaichou! OVA: Okusama Gekijou",
        "102558": "Hua Jianghu: Ling Zhu",
        "102559": "Hua Jianghu: Huan Shi Men Sheng",
        "102560": "Hua Jianghu: Bei Mo Ting",
        "102599": "Huyao Xiao Hongniang: Wangquan Fugui",
        "102608": "Bakuman. 3rd Season Specials",
        "102609": "Bakuman. 2nd Season Special",
        "102651": "The Perfect World",
        "102716": "Naze Nani!? Witch Craft Works",
        "102832": "Devils’ Line: Anytime Anywhere",
        "102836": "Kuroko no Basket: Winter Cup Soushuu-hen - Namida no Saki e",
        "102883": "JoJo no Kimyou na Bouken: Ougon no Kaze",
        "102976": "Kono Subarashii Sekai ni Shukufuku wo! Kurenai Densetsu",
        "103022": "Guomin Laogong Dai Huijia 2",
        "103209": "Overlord: Ple Ple Pleiades 3",
        "103223": "Bungou Stray Dogs 3rd Season",
        "104067": "Fushigi no Umi no Nadia: Nautilus Story",
        "104170": "Asobi Asobase OVA",
        "104217": "Wotaku ni Koi wa Muzukashii OVA",
        "104286": "Oushitsu Kyoushi Heine Movie",
        "104324": "Gaikotsu Shotenin Honda-san OVA",
        "104368": "Asobi Asobase Specials",
        "104396": "91 Daze",
        "104460": "Yuru Camp△ Movie",
        "104749": "Kud Wafter",
        "104957": "Junjou Shoujo Et Cetera Specials",
        "106456": "Military! Tamatama Shoumetsu Suru Shiroki Hikari",
        "106606": "Tokyogurashi!",
        "106895": "Rokka no Yuusha Picture Drama",
        "107141": "Kigyou Senshi Arslan",
        "107175": "Cheer Danshi!! OVA",
        "107189": "Bakumatsu Rock: Mystery! Onsen Kaijiken ze yo!!",
        "107263": "Haikyuu Quest",
        "107348": "Baka to Test to Shoukanjuu Mini Anime",
        "107351": "Haikyuu!!: Tokushuu! Haru-kou Volley ni Kaketa Seishun",
        "107372": "Mahoutsukai ni Narenakatta Onnanoko no Hanashi.",
        "107506": "Tsurune: Kazemai Koukou Kyuudou-bu - Yabai",
        "107622": "Kakegurui Picture Drama",
        "107666": "Shin Chuuka Ichiban!",
        "107704": "Kawaki wo Ameku",
        "107717": "Kobayashi-san Chi no Maidragon S",
        "107764": "Koe no Katachi Specials",
        "107943": "Sayonara Gokko",
        "108040": "Radiant 2",
        "108623": "Goblin Slayer: GOBLIN'S CROWN",
        "108714": "ACCA: 13-ku Kansatsu-ka - Regards",
        "108939": "Shagahai ReLIFE Kenkyuujo Support-ka",
        "108942": "Shingeki no Kyojin: Chimi Kyara Gekijou - Rivai-han",
        "108945": "One Punch Man 2 OVA",
        "108971": "Kedamono Damono",
        "108981": "Quanzhi Gaoshou: Dianfeng Rongyao",
        "108988": "Hua Jianghu: Buliang Ren 3",
        "108992": "Mobius Dust",
        "109002":
            "Code Geass: Boukoku no Akito 2 - Hikisakareshi Yokuryuu Picture Drama",
        "109190": "Violet Evergarden Gaiden: Eien to Jidou Shuki Ningyou",
        "109191": "Dog Days'': Limone Resort Tenbou Onsen!",
        "109276": "Haru ni Ochite",
        "109800": "Qin Shi Mingyue: Tian Xing Jiu Ge 2",
        "109819":
            "Mob Psycho 100: Daiikkai Rei toka Soudansho Ian Ryokou - Kokoro Mitasu Iyashi no Tabi",
        "109945": "Attouteki Vivid Days",
        "110228": "Yamiyo",
        "110272": "Dou Hun Wei Zhi Xuan Yue Qi Yuan 2",
        "110344": "GOD EATER Reso Nantoka Gekijou",
        "110445":
            "Tsuujou Kougeki ga Zentai Kougeki de Ni-kai Kougeki no Okaasan wa Suki desu ka? OVA",
        "110465": "11eyes Picture Drama",
        "110640": "Shingeki no Kyotou",
        "110641": "Arslan Senki (TV): Fuujin Ranbu - 4-koma Gekijou",
        "110733": "Zombie Land Saga: Revenge",
        "110954": "Fight Ippatsu! Juuden-chan!! OVA",
        "111137": "WAVE!! Surfing Yappe!!",
        "111322": "Tate no Yuusha no Nariagari Season 3",
        "111730": "veil",
        "111734": "Given Movie",
        "111790": "Haikyuu!! Riku VS Kuu",
        "111852": "Date A Bullet: Dead or Bullet",
        "111909": "Hajimari no Sokudo",
        "111955": "porte",
        "112125":
            "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka II: Mujintou ni Yakusou wo Motomeru no wa Machigatteiru Darou ka",
        "112302": "Major 2nd Season 2",
        "112472":
            "Kono Yo no Hate de Koi wo Utau Shoujo YU-NO: Mugen no Heiretsu Sekai",
        "112900":
            "Code Geass: Hangyaku no Lelouch Picture Drama - Kiseki no Anniversary",
        "113359": "NOMAD: Megalo Box 2",
        "113811":
            "Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen OVA",
        "114195": "Ore wo Suki nano wa Omae dake ka yo: Oretachi no Game Set",
        "114249": "22/7: 8+3=?",
        "114562": "Xue Ying Lingzhu: Qiyu Pian",
        "114622": "Dorohedoro: Ma no Omake",
        "115178": "Wan Jie Shenzhu 2",
        "115217": "Haikyuu!! Ningyou Anime",
        "115800": "Quanzhi Fashi 4",
        "115925": "Kakushigoto PV",
        "116015":
            "Chiba Pedal: Yowamushi Pedal to Manabu Jitensha Koutsuu Anzen",
        "116328": "Runway de Waratte Mini",
        "116673": "BURN THE WITCH",
        "116674": "BLEACH: Sennen Kessen-hen",
        "116922": "Katarina Nounai Kaigi",
        "119113": "Shingeki no Kyojin: Chronicle",
        "119350": "Aku no Onna Kanbu: Full Moon Night R",
        "119548": "Seikaisuru Kado: Beyond Information",
        "119665": "Buddy Complex: Daremo Shiranai Ashita e",
        "119960": "Katarina to Manabou",
        "120150": "Bungou Stray Dogs Wan!",
        "120257": "Shingeki no Kyojin: Chimi Kyara Gekijou - Rivai-han Part 2",
        "120268": "Hua Jianghu: Gui Yexing",
        "120272": "Ling Jian Zun 4",
        "120343": "Modao Zushi Q",
        "120700": "Re:Zero kara Hajimeru Kyuukei Jikan (Break Time) 2nd Season",
        "121034": "Date A Bullet: Nightmare or Queen",
        "121035": "Saga Jihen",
        "121043": "Hensuki▽",
        "122173": "ID-0: Puchi Anime Gekijou (Quiz!! ID-0)",
        "122349": "Boku no Hero Academia: Ikinokore! Kesshi no Survival Kunren",
        "122670": "Wu Dong Qiankun 3",
        "122808": "Princess Connect! Re:Dive Season 2",
        "122922": "DRIFTERS: Special edition",
        "123464": "Kanojo, Okarishimasu Collab Mini Animation",
        "123901": "Kanojo, Okarishimasu Petit",
        "124138": "Maou-sama, Petit Retry!",
        "124140": "Sword Art Online: Progressive - Hoshinaki Yoru no Aria",
        "124194": "Fruits Basket: The Final",
        "124196": "Prayer X",
        "124410": "Kanojo, Okarishimasu 2nd Season",
        "124668": "Slimetachi no Idobata Kaigi",
        "124874": "Nanatsu no Taizai: Tsumi no Kokuhaku Dennou Grimoire!",
        "124896": "Bear Bear Bear Kuma!",
        "125261": "Tsurune: Hajimari no Issha",
        "125514": "Honda-san x Taka no Tsume",
        "125783":
            "Code Geass: Hangyaku no Lelouch Picture Drama - Kamen Kokuhaku Taikai",
        "126169": "Code Geass: Hangyaku no Lelouch DVD Magazine",
        "126659": "Boku no Hero Academia THE MOVIE: World Heroes' Mission",
        "126661":
            "Boku no Hero Academia THE MOVIE: Heroes:Rising - Epilogue Plus: Yume wo Genjitsu ni",
        "126830": "Code Geass: Dakkan no Rozé",
        "127227": "Kakushigoto: Himegoto wa Nandesuka",
        "127368":
            "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka III OVA",
        "127510": "Channel 5.5 3rd Season",
        "127688": "Mahouka Koukou no Yuutousei",
        "128306":
            "Re:Zero kara Hajimeru Kyuukei Jikan (Break Time) 2nd Season Part 2",
        "128390": "Enen no Shouboutai Mini Anime",
        "128643":
            "Yahari Ore no Seishun Love Come wa Machigatteiru. Kan: Dakara, Shishunki wa Owarazu ni, Seishun wa Tsuzuiteiku.",
        "128675": "Mashiro no Oto Mini",
        "129196":
            "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka IV: Shin Shou Meikyuu-hen",
        "129223": "Hua Jianghu: Xia Lan",
        "129868": "Bamboo Blade: Fanfu-Fufe-Fo",
        "129874": "Kimetsu no Yaiba: Mugen Ressha-hen (TV)",
        "130247": "Bamboo Blade: CM Fanfu-Fufe-Fo",
        "130354": "Wo Shi Da Shenxian 2",
        "130389": "Mahouka Koukou no Rettousei: Tsuioku-hen",
        "130590":
            "Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e Kayou II Part 2",
        "130592": "Hataraku Maou-sama!!",
        "131047": "BATEN KAITOS",
        "131078": "Nitian Xie Shen 2",
        "131573": "Jujutsu Kaisen 0",
        "131681": "Shingeki no Kyojin: The Final Season Part 2",
        "131866": "Tenchi Souzou Design-bu: Tokubetsu-hen",
        "131944": "Isekai Maou to Shoukan Shoujo no Dorei Majutsu Ω Mini Anime",
        "132321": "Dear Brave",
        "132615": "Kimi wa Tennenshoku",
        "132703": "Rokujouma no Shinryakusha!? Promotion MOVIE",
        "133514": "Koe Dake ga",
        "133845": "Overlord: Sei Oukoku-hen",
        "134081": "Xie Wang Zhui Qi: Shennü Guilai",
        "134088": "Da Zhuzai",
        "134107": "Wu Shang Shen Di 2",
        "134283": "Tunshi Xingkong 2",
        "134286": "Chuan Shu Zijiu Zhinan: Xian Meng Pian",
        "134413": "Yuru Camp△ SEASON 2 OVA",
        "135866": "Youjo Senki: Sabaku no Pasta Daisakusen",
        "136064": "Bakuten!! Movie",
        "136146": "Wan Jie Xian Zong 5",
        "136430": "VINLAND SAGA SEASON 2",
        "136880": "BEASTARS FINAL SEASON Part 1",
        "136946": "Celia-sensei no Wakuwaku Magical Kyoushitsu",
        "137726": "Quanzhi Fashi 6",
        "137728": "Dou Po Cangqiong: Nian Fan",
        "137730": "Dou Po Cangqiong: Yuanqi",
        "137735": "Quanzhi Gaoshou 3",
        "137898": "Tensai Ouji no Akaji Kokka Saisei Jutsu: Short Drama",
        "139092": "Mairimashita! Iruma-kun 3",
        "139359":
            "Otome Game no Hametsu Flag shika Nai Akuyaku Reijou ni Tensei shiteshimatta… Movie",
        "139435": "Shinigami Bocchan to Kuro Maid 2nd Season",
        "139498": "Tensei Shitara Slime Datta Ken: Guren no Kizuna-hen",
        "139630": "Boku no Hero Academia 6",
        "139754": "Shingeki no Kyojin: Chimi Kyara Gekijou - Final",
        "139825":
            "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen Season II",
        "140079": "Shimi",
        "140162": "Arifureta Itsuka",
        "140168": "Kyoukaisen",
        "140350": "Kingdom 4th Season",
        "140439": "Mob Psycho 100 III",
        "141055": "Cinderella",
        "141351": "Kakegurui Twin",
        "141352": "Nanatsu no Taizai: Ensa no Edinburgh - Zenpen",
        "141400": "Peter Grill to Kenja no Jikan: Super Extra",
        "141534":
            "Mushoku Tensei: Isekai Ittara Honki Dasu Part 2 - Eris no Goblin Toubatsu",
        "141852": "Xian Wang De Richang Shenghuo 3",
        "141878": "Meng Qi Shi Shen: Huanxi Zhui Hun",
        "141893": "Yuan Long 3",
        "142329": "Kimetsu no Yaiba: Yuukaku-hen",
        "142876": "Dr. STONE: Ryuusui",
        "143085": "Saihate no Paladin: Tetsusabi no Yama no Ou",
        "143271": "Mahouka Koukou no Rettousei 3rd Season",
        "143391": "Chiyuki no Fashion Check",
        "143393":
            "Katekyo Hitman REBORN! x ēlDLIVE SP Collaboration Mini Anime (24H)",
        "143846": "Arifureta Shokugyou de Sekai Saikyou 2nd season Special",
        "144992": "Kumichou Musume to Sewagakari Picture Drama",
        "145064": "Jujutsu Kaisen 2nd Season",
        "145902": "Ponkotsuland Saga",
        "146065": "Mushoku Tensei II: Isekai Ittara Honki Dasu",
        "146066": "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season",
        "146503": "Tensei Shitara Slime Datta Ken: Sukuwareru Ramiris",
        "146543": "Dawang Raoming 2",
        "146637": "ORIENT: Awajishima Gekitou-hen",
        "146921":
            "Arifureta Shokugyou de Sekai Saikyou: Maboroshi no Bouken to Kiseki no Kaigou",
        "147463": "Jujutsu Kaisen PV",
        "147728": "Aharen-san wa Hakarenai Mini",
        "148002": "Katarina Nounai Kaigi X",
        "148226": "Jiu Tian Xuan Di Jue 2",
        "148295": "Kakkou no Iikagen!",
        "149071": "Fanren Xiu Xian Zhuan: Zai Bie Tiannan",
        "149073": "Boku no Hero Academia 5 (ONA)",
        "149099": "Mahoutsukai Reimeiki Mini Anime",
        "149118": "Enen no Shouboutai: San no Shou",
        "150005": "Akatsuki no Requiem",
        "150075": "Kono Subarashii Sekai ni Bakuen wo!",
        "151040": "TRIGUN STAMPEDE",
        "151126":
            "Yuusha, Yamemasu: Kenshuu Ryokou wa Mokuteki wo Miushinau na",
        "151632": "Isekai Meikyuu de Harem wo OVA",
        "151898": "Overlord: Ple Ple Pleiades 4",
        "151987": "Tantei wa mou, Shindeiru. Mini Anime",
        "152001": "Peach Boy Riverside Mini Anime",
        "152677": "Tantei wa mou, Shindeiru. Season 2",
        "153406": "Kami no Tou: Tower of God 2nd Season",
        "153452": "Ousama Ranking: Yuuki no Takarabako",
        "153494": "Xingchen Bian: An Xing Jie Pian",
        "153496": "Yi Nian Yongheng: Hezong Pian",
        "153658": "Haikyuu!!: Gomi Suteba no Kessen",
        "153777": "Wan Jie Duzun 2",
        "153800": "One Punch Man 3",
        "154006": "Curry Meshi × Zombie Land Saga",
        "154037": "BLEACH: memories in the rain",
        "154164": "Violet Evergarden CM",
        "154178": "Yuusha, Yamemasu Puchi Hiroma",
        "154473": "Arifureta Shokugyou de Sekai Saikyou 3rd season",
        "154955": "Akuyaku Reijou nano de Last Boss wo Kattemimashita Mini",
        "155092": "Douluo Dalu: Nu Shi Ao Zhan",
        "155222": "Wanmei Shijie 3",
        "155348": "ROAD OF NARUTO",
        "155496": "Shinmai Renkinjutsushi no Tenpo Keiei Mini Anime",
        "155908": "Yuru Camp△ SEASON 3",
        "156131":
            "Shin no Nakama ja Nai to Yuusha no Party wo Oidasareta node, Henkyou de Slow Life suru Koto ni shimashita 2nd",
        "156631": "Sword Art Online (Original Movie)",
        "157287": "Shin Shinka no Mi Gekijou",
        "157294": "Eiyuu-ou, Bu wo Kiwameru Tame Tenseisu Mini Anime",
        "157800": "Tsukasa's♪Kitchen",
        "158925": "STORYWRITER",
        "158983": "Slimetachi no Idobata Kaigi 2",
        "159042": "Tensei Shitara Ken Deshita 2nd Season",
        "159309": "Otomege Sekai wa Mob ni Kibishii Sekai desu 2nd Season",
        "159581": "Yao Shen Ji 6",
        "159599": "Fanren Xiu Xian Zhuan: Fanren Feng Qi Tian Nan Chongzhi Ban",
        "159690":
            "Kaiko sareta Ankoku Heishi (30-dai) no Slow na Second Life SD Mini Anime",
        "160054": "Ijiranaide, Nagatoro-san 2nd Attack Mini Anime",
        "160089": "Shinmai Renkinjutsushi no Tenpo Keiei Mini Anime: Onsen",
        "160205": "Kimi wa Houkago Insomnia Special Animation PV",
        "160789": "Never Fear",
        "161802": "Tensei Shitara Slime Datta Ken: Coleus no Yume",
        "162284": "Kobayashi-san no Tsundere Kouza",
        "162285": "Tsunlise Mini",
        "162561": "NARUTO (2025)",
        "162800": "Kanojo, Okarishimasu: Date Movie",
        "162802": "Saikyou Onmyouji Mini",
        "162921": "Sousei no Aquarion: Myth of Emotions",
        "163079": "Sugar Apple Fairy Tale Part 2",
        "163132": "Horimiya: piece",
        "163134": "Re:Zero kara Hajimeru Isekai Seikatsu 3rd Season",
        "163147": "Blue Lock: EPISODE Nagi",
        "163327": "Go-toubun no Hanayome∽",
        "165066": "Shayou (Music)",
        "165931": "Niehime to Kemono no Ou Mini Anime",
        "166035": "Overlord: Ple Ple Pleiades Tokubetsu-hen",
        "166219": "Tunshi Xingkong 4",
        "166457": "Ousama Ranking Movie",
        "166610": "MASHLE: Kami Shinkakusha Kouho Senbatsu Shiken-hen",
        "166988": "Okashi na Tensei Mini Anime",
        "167151": "Sabikui Bisco 2nd Season",
        "167470": "Kyuuseishu",
        "167990": "Celia-sensei no Wakuwaku Magical Kyoushitsu season2",
        "168500": "Maou-sama, Retry! R",
        "168565": "Mellow",
        "168999":
            "Watashi no Oshi wa Akuyaku Reijou.: Rae to Claire ni Ichimon Ittou",
        "169373":
            "Higeki no Genkyou to Naru Saikyou Gedou Last Boss Joou wa Tami no Tame ni Tsukushimasu. mini",
        "169402": "Boku no Hero Academia: Yuuei Heroes Battle",
        "169440":
            "Jidou Hanbaiki ni Umarekawatta Ore wa Meikyuu wo Samayou 2nd Season",
        "169512": "Uchi no Kaisha no Chiisai Senpai no Hanashi Mini Anime",
        "169579":
            "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru 2nd Season",
        "169749": "Mattari Kaisetsu: Boushoku no Berserk",
        "169929": "Kage-Jitsu! 2nd",
        "170019":
            "Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken 2nd Season",
        "170110":
            "Isekai de Cheat Skill wo Te ni Shita Ore wa, Genjitsu Sekai wo mo Musou Suru: Level Up wa Jinsei wo Kaeta",
        "170577": "Tondemo Skill de Isekai Hourou Meshi 2",
        "170629": "Acca-kun no ACCA Kouza",
        "171026": "Paripi Koumei: Road To Summer Sonia",
        "171110": "Honzuki no Gekokujou: Ryoushu no Youjo",
        "171952": "Kage no Jitsuryokusha ni Naritakute!: Zankyou-hen",
        "172192": "Kikansha no Mahou wa Tokubetsu desu 2nd Season",
        "172258":
            "Kimi no Koto ga Dai Dai Dai Dai Daisuki na 100-nin no Kanojo 2nd Season",
        "172423": "Koshaberi Biyori ",
        "173172": "Dorohedoro (Zoku-hen)",
        "174417": "Yubisaki Petit",
        "174504": "Naze Nani Dendrogram",
        "175048": "Naze Nani!? Asterisk",
        "175914": "Yofukashi no Uta Season 2",
        "176298": "Kekkon Yubiwa Monogatari 2nd Season",
        "176314": "Sasaki to Pii-chan 2nd Season",
        "176496": "Ore dake Level Up na Ken: Season 2 - Arise from the Shadow",
        "176858":
            "Tearmoon Teikoku Monogatari: Dantoudai kara Hajimaru, Hime no Tensei Gyakuten Story Mini Anime",
        "177009": "Sekai wo Inuite",
        "177061": "Elise's Karute",
        "177062":
            "More Loop 7-kaime no Akuyaku Reijou wa, Moto Tekikoku de Jiyuu Kimama na Hanayome Seikatsu wo Mankitsu suru Mini Anime",
        "177125": "Gekai Elise Mini Drama",
        "177437": "Gekka",
        "178125": "Rokurou no Daibouken",
        "178467": "Tsuki ga Michibiku Isekai Douchuu 3rd Season",
        "179828": "Kakkou no Iinazuke Season 2",
        "179979": "Aharen-san wa Hakarenai Season 2",
        "179981": "Chiyu Mahou no Machigatta Tsukaikata 2nd Season",
        "180804": "Inazuma Eleven: Soushuuhen - Densetsu no Kickoff",
        "181440": "Aldnoah.Zero: Ame no Danshou - The Penultimate Truth",
        "181641":
            "Tokidoki Bosotto Russiago de Dereru Tonari no Alya-san Season 2",
        "182205": "Tensei Shitara Slime Datta Ken 4th Season",
        "182206": "Tensei Shitara Slime Datta Ken - Soukai no Namida-hen",
        "182300": "Tsue to Tsurugi no Wistoria Season 2",
        "182317": "Boku no Kokoro no Yabai Yatsu Movie",
        "182561": "BLEACH 20th PV",
        "182563": "Wanmei Shijie: Juchang Ban",
        "184143": "Celia-sensei no Dokidoki Interview Room",
        "184376": "Death March Kara Hajimaru Isekai Kyousoukyoku (Zoku-hen)",
        "184694": "Ore dake Level Up na Ken: ReAwakening",
        "184816": "Teenage Blue",
        "184872": "Nitian Xie Shen 2",
        "185189": "Sukicchan! Karachu",
        "185542":
            "Gaikotsu Kishi-sama, Tadaima Isekai e Odekakechuu 2nd Season",
        "185543": "Nozomanu Fushi no Boukensha 2nd Season",
        "185657": "Skip to Loafer 2nd Season",
        "185714": "Aldnoah.Zero (Re+)",
        "185736": "Vigilante: Boku no Hero Academia ILLEGALS",
        "185756": "Tensei Kizoku, Kantei Skill de Nariagaru 3rd Season",
        "185860": "Renjian Zui Deyi 2",
        "187217": "Gochuumon wa Usagi desu ka? (Shinsaku Anime)",
        "188892": "Kuroiwa Medaka ni Watashi no Kawaii ga Tsuujinai 2nd Season",
        "189123": "Ao no Hako 2nd Season",
        "189796": "Make Heroine ga Oosugiru! 2nd Season",
        "189891": "Kanchigai no Atelier Meister Mini Anime",
        "190244": "Date A Live (Shin Project)",
        "191788": "Aoashi 2nd Season",
        "194317":
            "Saikyou no Ousama, Nidome no Jinsei wa Nani wo Suru? 2nd Season",
        "194829": "Katainaka no Ossan, Kensei ni Naru 2nd Season",
        "195268":
            "Higeki no Genkyou to Naru Saikyou Gedou Last Boss Joou wa Tami no Tame ni Tsukushimasu.  Season 2",
        "195457":
            "「unravel」×『Tokyo Ghoul』TV Animation 10th Anniversary Collaboration MV",
        "195496": "Gate Season 2: Jieitai Kanoumi nite, Kaku Tatakaeri",
        "195881": "Fanren Xiu Xian Zhuan Movie",
        "196063": "Obusu ni Hanataba wo",
        "196064": "Tsuihou Shiro Madoushi Mini Anime",
        "196222":
            "Ore wa Subete wo [Parry] Suru: Gyaku Kanchigai no Sekai Saikyou wa Boukensha ni Naritai 2nd Season",
        "197824": "Isekai Nonbiri Nouka 2",
        "198373": "Ansatsu Kyoushitsu: Minna no Jikan",
    };

    var missingAnilistID = animeData.filter(
        a => !a.anilistID && !a.anilistIDConfirmed
    );

    const groups: {
        [groupName: string]: AnimeData[];
    } = {
        ...(missingAnilistID.length > 0 && {
            "Missing AniList ID": missingAnilistID,
        }),
        // Reccomended: animeData.filter(
        //     a => a.anilistID && recs[parseInt(a.anilistID)]
        // ),

        "Continue Watching": continueWatching,
        Completed: completedAnime,
        Planning: animeData.filter(a => a.watchStatus == "planning"),
        All: animeData,
    };

    return (
        <div
            style={{
                padding: "10px",
                minHeight: "10000vh",
            }}
        >
            {!user.aniList?.access_token && <AniListLoginButton />}

            {anime && (
                <ConfirmAniListMappingModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    anime={anime}
                />
            )}

            {Object.keys(groups).map(groupName => {
                const data = groups[groupName];
                return (
                    <AnimeGroup
                        key={groupName}
                        groupName={groupName}
                        data={data}
                        anilistOrder={anilistOrder}
                        refreshData={props.refreshData}
                        setAnime={setAnime}
                        setShowModal={setShowModal}
                    />
                );
            })}
        </div>
    );
}

export interface SeriesViewPageProps {
    animeData: AnimeData[];
    refreshData: () => void;
}
