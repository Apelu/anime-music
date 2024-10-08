import { useState } from "react";
import { ListGroup } from "react-bootstrap";

interface Sender {
    address: string;
}

interface Label {
    name: string;
    autoApplyTo: Sender[];
}

function ControllerPage() {
    const html = getHTML();
    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");
    const novel: Partial<{
        title: string;
        coverImage: string;
        infoPage: string;
        readingStatus: string;
        readingChapterTitle: string;
        readingChapterPage: string;
        latestChapterTitle: string;
        latestChapterReleased: string;
        lastUpdated: string;
        lastRefreshed: string;
    }> = {
        title: (
            document.querySelector(
                "#chapter > div > div > a.novel-title"
            ) as HTMLElement | null
        )?.innerText,
    };

    return <h1></h1>;
    // return (
    //     <>
    //         <div
    //             style={{
    //                 position: "absolute",
    //                 top: "0",
    //                 left: "0",
    //                 width: "100%",
    //                 zIndex: 9999,
    //                 pointerEvents: "none",
    //             }}
    //         >
    //             <div
    //                 style={{
    //                     backgroundColor: "rgba(219, 84, 97,0.7)",
    //                     color: "rgba(248, 249, 250,0.9)",
    //                     textAlign: "center",
    //                     width: "fit-content",
    //                     borderRadius: "5px",
    //                     padding: "8px",
    //                     marginLeft: "auto",
    //                     marginRight: "auto",
    //                 }}
    //             >
    //                 <div
    //                     style={{
    //                         display: "flex",
    //                         justifyContent: "space-between",
    //                         alignItems: "center",
    //                     }}
    //                 >
    //                     <small>
    //                         <small>
    //                             <small>
    //                                 Eps 9 - Episode 9 - February 22, 2024
    //                                 <br></br>5 Videos Left
    //                             </small>
    //                         </small>
    //                     </small>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );
    // const [labels, setLabels] = useState([
    //     {
    //         name: "Capital One",
    //         autoApplyTo: [
    //             {
    //                 address: "capitalone@notification.capitalone.com",
    //             },
    //         ],
    //     },
    // ]);
    // const [senders, setSenders] = useState([]);

    // return (
    //     <div className="d-flex text-center">
    //         <div className="w-100 p-1">
    //             <h3>Labels</h3>
    //             <input className="form-control mb-2" />
    //             <ListGroup>
    //                 {labels.map((label: Label) => (
    //                     <ListGroup.Item key={label.name}>
    //                         {label.name}
    //                         <small>
    //                             <small>
    //                                 {label.autoApplyTo.map((sender: Sender) => (
    //                                     <div key={sender.address}>
    //                                         {sender.address}
    //                                     </div>
    //                                 ))}
    //                             </small>
    //                         </small>
    //                     </ListGroup.Item>
    //                 ))}
    //             </ListGroup>
    //         </div>
    //         <div className="w-100 p-1">
    //             <h3>Senders</h3>
    //             <input className="form-control mb-2" />
    //             <ListGroup>
    //                 {senders.map((sender: Sender) => (
    //                     <ListGroup.Item key={sender.address}>
    //                         {sender.address}
    //                     </ListGroup.Item>
    //                 ))}
    //             </ListGroup>
    //         </div>
    //     </div>
    // );
}

export default ControllerPage;

function getHTML() {
    return `
    <html><head>
    <title>Strongest Necromancer Of Heaven's Gate #Chapter 1 Prologue - Read Strongest Necromancer Of Heaven's Gate Chapter 1 Prologue Online - All Page - Novel Bin</title>
    <meta property="og:title" content="Strongest Necromancer Of Heaven's Gate #Chapter 1 Prologue - Read Strongest Necromancer Of Heaven's Gate Chapter 1 Prologue Online - All Page - Novel Bin">
    <meta itemprop="name" content="Strongest Necromancer Of Heaven's Gate #Chapter 1 Prologue - Read Strongest Necromancer Of Heaven's Gate Chapter 1 Prologue Online - All Page - Novel Bin">
    <meta name="description" itemprop="description" content="Read Strongest Necromancer Of Heaven's Gate Chapter 1 Prologue Online 2024. Strongest Necromancer Of Heaven's Gate #Chapter 1 Prologue in one page for Free">
    <meta property="og:description" content="Read Strongest Necromancer Of Heaven's Gate Chapter 1 Prologue Online 2024. Strongest Necromancer Of Heaven's Gate #Chapter 1 Prologue in one page for Free">
    <meta itemprop="description" content="Read Strongest Necromancer Of Heaven's Gate Chapter 1 Prologue Online 2024. Strongest Necromancer Of Heaven's Gate #Chapter 1 Prologue in one page for Free">
    <meta name="keywords" content="read Strongest Necromancer Of Heaven's Gate issue Chapter 1 Prologue online, free Strongest Necromancer Of Heaven's Gate Chapter 1 Prologue, read Strongest Necromancer Of Heaven's Gate  Novel online">
    <meta property="og:keywords" content="read Strongest Necromancer Of Heaven's Gate issue Chapter 1 Prologue online, free Strongest Necromancer Of Heaven's Gate Chapter 1 Prologue, read Strongest Necromancer Of Heaven's Gate  Novel online">
    <meta property="og:url" content="https://novelbjn.phieuvu.com/book/strongest-necromancer-of-heavens-gate/chapter-1-prologue">
    <link rel="canonical" href="https://novelbjn.phieuvu.com/book/strongest-necromancer-of-heavens-gate/chapter-1-prologue">
    <meta property="og:type" content="website">
    <meta name="referrer" content="origin-when-cross-origin">
    <meta property="og:image" content="https://novelbjn.phieuvu.com/media/novel/strongest-necromancer-of-heavens-gate.jpg">
    <meta property="og:locale" content="us">
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="/img/favicon.ico?v=1.68" type="image/x-icon">
    <link rel="icon" type="image/png" href="/img/favicon.ico?v=1.68">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta http-equiv="x-dns-prefetch-control" content="on">
    <meta http-equiv="Content-Language" content="en">
    <meta name="copyright" content="Copyright © 2024 Novel Bin">
    <meta name="Author" content="Novel 2024">
    <link rel="preload" href="/fonts/RobotoCondensed-Regular.woff" as="font" crossorigin="anonymous">
    <link rel="preload" href="/fonts/glyphicons-halflings-regular.woff2" as="font" crossorigin="anonymous">
    <link rel="sitemap" type="application/xml" title="Sitemap" href="https://novelbjn.phieuvu.com/sitemap-index.xml">

    <link href="/css/style.min.css?v=1.28" rel="stylesheet" type="text/css">
    <meta name="csrf-token" content="fsq3hITZ-a8Hw-3m1BaYUEjNAS53FYIAz8mg">
    <meta name="main_site" content="false">
    <meta name="sub_site" content="true">
    <script type="text/javascript">
        const ajaxUrl = 'https://novelbjn.phieuvu.com/ajax';
        const csrf = "fsq3hITZ-a8Hw-3m1BaYUEjNAS53FYIAz8mg";
        const appInfo = {};
    </script>
    <link rel="manifest" href="/manifest.json">

    <script type="text/javascript" src="/js/app.min.js?v=1.686868"></script>
    <script type="text/javascript" src="/js/scripts.min.js?v=1.2828686815"></script>

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.min.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.lazy/1.7.9/jquery.lazy.plugins.min.js"></script>

    <script async="" data-cfasync="false" src="https://cdn.pubfuture-ad.com/v2/unit/pt.js" type="text/javascript"></script>
<script async="" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>


<!-- Google tag (gtag.js) -->
<script async="" src="https://www.googletagmanager.com/gtag/js?id=G-15YCML7VSC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-15YCML7VSC');
</script>
    
</head>

<body>
    <style>
    .off_app {
        display: none;
    }
    #span {
        opacity: 0;
    }
</style>
<div id="wrapper">
    <header class="header" style="display: block">
        <div class="navbar navbar-default navbar-static-top" role="navigation" id="nav">
            <div class="container">
                <div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="sr-only">Show menu</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                    <h5>
                    <a class="header-logo" href="https://novelbin.com/?novel_id=strongest-necromancer-of-heavens-gate&amp;chapter_id=chapter-1-prologue" title="Read Novel Online Full">
                    <img src="/img/logo.png" alt="Read Novel Online Full">
                            Novel Bin 
                        </a>
                    </h5>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="control nav navbar-nav ">
                        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" title=""><span class="glyphicon glyphicon-list"></span> Novel List <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="https://novelbin.com/sort/latest" title="Latest Release">Latest Release</a></li>
                                <li><a href="https://novelbin.com/sort/top-hot-novel" title="Hot Novel">Hot Novel</a></li>
                                <li><a href="https://novelbin.com/sort/top-view-novel" title="Completed Novel">Completed Novel</a></li>
                                <li><a href="https://novelbin.com/sort/top-view-novel" title="Most Popular">Most Popular</a></li>
                                <li><a target="_blank" href="/store" title="NovelBin Store">Store </a></li>
                            </ul>
                        </li>
                        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" title=""><span class="glyphicon glyphicon-list"></span> Genre <span class="caret"></span></a>
                            <div class="dropdown-menu multi-column">
                                <div class="row">
                                    <div class="col-md-4">
                                        <ul class="dropdown-menu">
                                            <li><a href="https://novelbin.com/genre/action" title="Action">Action</a></li>
                                            <li><a href="https://novelbin.com/genre/adult" title="Adult">Adult</a></li>
                                            <li><a href="https://novelbin.com/genre/adventure" title="Adventure">Adventure</a></li>
                                            <li><a href="https://novelbin.com/genre/anime-&amp;-comics" title="Anime &amp; comics">Anime &amp; comics</a></li>
                                            <li><a href="https://novelbin.com/genre/comedy" title="Comedy">Comedy</a></li>
                                            <li><a href="https://novelbin.com/genre/drama" title="Drama">Drama</a></li>
                                            <li><a href="https://novelbin.com/genre/eastern" title="Eastern">Eastern</a></li>
                                            <li><a href="https://novelbin.com/genre/ecchi" title="Ecchi">Ecchi</a></li>
                                            <li><a href="https://novelbin.com/genre/fanfiction" title="Fanfiction">Fanfiction</a></li>
                                            <li><a href="https://novelbin.com/genre/fantasy" title="Fantasy">Fantasy</a></li>
                                            <li><a href="https://novelbin.com/genre/game" title="Game">Game</a></li>
                                            <li><a href="https://novelbin.com/genre/gender-bender" title="Gender bender">Gender bender</a></li>
                                            <li><a href="https://novelbin.com/genre/harem" title="Harem">Harem</a></li>
                                            <li><a href="https://novelbin.com/genre/historical" title="Historical">Historical</a></li>
                                            <li><a href="https://novelbin.com/genre/horror" title="Horror">Horror</a></li>
                                            <li><a href="https://novelbin.com/genre/isekai" title="Isekai">Isekai</a></li>
                                            <li><a href="https://novelbin.com/genre/josei" title="Josei">Josei</a></li>
                                            <li><a href="https://novelbin.com/genre/lgbt+" title="Lgbt+">Lgbt+</a></li>
                                        </ul>
                                    </div>
                                    <div class="col-md-4">
                                        <ul class="dropdown-menu">
                                            <li><a href="https://novelbin.com/genre/litrpg" title="Litrpg">Litrpg</a></li>
                                            <li><a href="https://novelbin.com/genre/magic" title="Magic">Magic</a></li>
                                            <li><a href="https://novelbin.com/genre/magical-realism" title="Magical realism">Magical realism</a></li>
                                            <li><a href="https://novelbin.com/genre/martial-arts" title="Martial arts">Martial arts</a></li>
                                            <li><a href="https://novelbin.com/genre/mature" title="Mature">Mature</a></li>
                                            <li><a href="https://novelbin.com/genre/mecha" title="Mecha">Mecha</a></li>
                                            <li><a href="https://novelbin.com/genre/modern-life" title="Modern life">Modern life</a></li>
                                            <li><a href="https://novelbin.com/genre/movies" title="Movies">Movies</a></li>
                                            <li><a href="https://novelbin.com/genre/mystery" title="Mystery">Mystery</a></li>
                                            <li><a href="https://novelbin.com/genre/other" title="Other">Other</a></li>
                                            <li><a href="https://novelbin.com/genre/psychological" title="Psychological">Psychological</a></li>
                                            <li><a href="https://novelbin.com/genre/realistic-fiction" title="Realistic fiction">Realistic fiction</a></li>
                                            <li><a href="https://novelbin.com/genre/reincarnation" title="Reincarnation">Reincarnation</a></li>
                                            <li><a href="https://novelbin.com/genre/romance" title="Romance">Romance</a></li>
                                            <li><a href="https://novelbin.com/genre/school-life" title="School life">School life</a></li>
                                            <li><a href="https://novelbin.com/genre/sci-fi" title="Sci-fi">Sci-fi</a></li>
                                            <li><a href="https://novelbin.com/genre/seinen" title="Seinen">Seinen</a></li>
                                            <li><a href="https://novelbin.com/genre/shoujo" title="Shoujo">Shoujo</a></li>
                                        </ul>
                                    </div>
                                    <div class="col-md-4">
                                        <ul class="dropdown-menu">
                                            <li><a href="https://novelbin.com/genre/shoujo-ai" title="Shoujo ai">Shoujo ai</a></li>
                                            <li><a href="https://novelbin.com/genre/shounen" title="Shounen">Shounen</a></li>
                                            <li><a href="https://novelbin.com/genre/shounen-ai" title="Shounen ai">Shounen ai</a></li>
                                            <li><a href="https://novelbin.com/genre/slice-of-life" title="Slice of life">Slice of life</a></li>
                                            <li><a href="https://novelbin.com/genre/smut" title="Smut">Smut</a></li>
                                            <li><a href="https://novelbin.com/genre/sports" title="Sports">Sports</a></li>
                                            <li><a href="https://novelbin.com/genre/supernatural" title="Supernatural">Supernatural</a></li>
                                            <li><a href="https://novelbin.com/genre/system" title="System">System</a></li>
                                            <li><a href="https://novelbin.com/genre/tragedy" title="Tragedy">Tragedy</a></li>
                                            <li><a href="https://novelbin.com/genre/tv" title="Tv">Tv</a></li>
                                            <li><a href="https://novelbin.com/genre/urban" title="Urban">Urban</a></li>
                                            <li><a href="https://novelbin.com/genre/urban-life" title="Urban life">Urban life</a></li>
                                            <li><a href="https://novelbin.com/genre/video-games" title="Video games">Video games</a></li>
                                            <li><a href="https://novelbin.com/genre/war" title="War">War</a></li>
                                            <li><a href="https://novelbin.com/genre/wuxia" title="Wuxia">Wuxia</a></li>
                                            <li><a href="https://novelbin.com/genre/xianxia" title="Xianxia">Xianxia</a></li>
                                            <li><a href="https://novelbin.com/genre/xuanhuan" title="Xuanhuan">Xuanhuan</a></li>
                                            <li><a href="https://novelbin.com/genre/yaoi" title="Yaoi">Yaoi</a></li>
                                        </ul>
                                    </div>
                                    <div class="col-md-4">
                                        <ul class="dropdown-menu">
                                            <li><a href="https://novelbin.com/genre/yuri" title="Yuri">Yuri</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="dropdown" id="options" style="display: list-item;"><a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="glyphicon glyphicon-cog"></span>
                                Options <span class="caret"></span></a>
                            <div class="dropdown-menu dropdown-menu-right settings">
                                <form class="form-horizontal">
                                    <div class="form-group form-group-sm"><label class="col-sm-2 col-md-5 control-label" for="option-background">Background</label>
                                        <div class="col-sm-5 col-md-7"><select class="form-control" id="option-background">
                                                <option value="#F4F4F4">Light gray</option>
                                                <option value="#E9EBEE">Light blue</option>
                                                <option value="#F4F4E4">Light yellow</option>
                                                <option value="#EAE4D3">Sepia</option>
                                                <option value="#D5D8DC">Dark blue</option>
                                                <option value="#FAFAC8">Dark yellow</option>
                                                <option value="#EFEFAB">Wood grain</option>
                                                <option value="#FFF">White</option>
                                                <option value="#232323">Dark</option>
                                            </select></div>
                                    </div>
                                    <div class="form-group form-group-sm"><label class="col-sm-2 col-md-5 control-label" for="option-font-family">Font family</label>
                                        <div class="col-sm-5 col-md-7"><select class="form-control" id="option-font-family">
                                                <option value="'Palatino Linotype', sans-serif">Palatino Linotype</option>
                                                <option value="Bookerly, sans-serif">Bookerly</option>
                                                <option value="Minion, sans-serif">Minion</option>
                                                <option value="'Segoe UI', sans-serif">Segoe UI</option>
                                                <option value="Roboto, sans-serif">Roboto</option>
                                                <option value="'Roboto Condensed', sans-serif">Roboto Condensed</option>
                                                <option value="'Patrick Hand', sans-serif">Patrick Hand</option>
                                                <option value="'Noticia Text', sans-serif">Noticia Text</option>
                                                <option value="'Times New Roman', sans-serif">Times New Roman</option>
                                                <option value="Verdana, sans-serif">Verdana</option>
                                                <option value="Tahoma, sans-serif">Tahoma</option>
                                                <option value="Arial, sans-serif">Arial</option>
                                            </select></div>
                                    </div>
                                    <div class="form-group form-group-sm"><label class="col-sm-2 col-md-5 control-label" for="option-font-size">Font size</label>
                                        <div class="col-sm-5 col-md-7"><select class="form-control" id="option-font-size">
                                                <option value="16px">16</option>
                                                <option value="18px">18</option>
                                                <option value="20px">20</option>
                                                <option value="22px">22</option>
                                                <option value="24px">24</option>
                                                <option value="26px">26</option>
                                                <option value="28px">28</option>
                                                <option value="30px">30</option>
                                                <option value="32px">32</option>
                                                <option value="34px">34</option>
                                                <option value="36px">36</option>
                                                <option value="38px">38</option>
                                                <option value="40px">40</option>
                                            </select></div>
                                    </div>
                                    <div class="form-group form-group-sm"><label class="col-sm-2 col-md-5 control-label" for="option-line-height">Line height</label>
                                        <div class="col-sm-5 col-md-7"><select class="form-control" id="option-line-height">
                                                <option value="100%">100%</option>
                                                <option value="120%">120%</option>
                                                <option value="140%">140%</option>
                                                <option value="160%">160%</option>
                                                <option value="180%">180%</option>
                                                <option value="200%">200%</option>
                                            </select></div>
                                    </div>
                                    <div class="form-group form-group-sm"><label class="col-sm-2 col-md-5 control-label">Full frame</label>
                                        <div class="col-sm-5 col-md-7"><label class="radio-inline" for="fluid-yes"><input type="radio" name="fluid-switch" id="fluid-yes" value="yes">
                                                Yes</label><label class="radio-inline" for="fluid-no"><input type="radio" name="fluid-switch" id="fluid-no" value="no" checked=""> No</label>
                                        </div>
                                    </div>
                                    <div class="form-group form-group-sm"><label class="col-sm-2 col-md-5 control-label">No
                                            line break</label>
                                        <div class="col-sm-5 col-md-7"><label class="radio-inline" for="onebreak-yes"><input type="radio" name="onebreak-switch" id="onebreak-yes" value="yes">
                                                Yes</label><label class="radio-inline" for="onebreak-no"><input type="radio" name="onebreak-switch" id="onebreak-no" value="no" checked="">
                                                No</label></div>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                    <form class="navbar-form navbar-right" action="/search">
                        <div class="input-group search-holder"><input class="form-control" id="search-input" type="search" name="keyword" placeholder="Search Novel...">
                            <div class="input-group-btn"><button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button></div>
                        </div>
                        <div class="list-group list-search-res hide"></div>
                    </form>
                </div>
            </div>
        </div>
    </header>    <main id="container" class=" " style="background-color: #F4F4F4">
        <div class="navbar-breadcrumb" style="display: block">

            <div class="container breadcrumb-container">
                <ol class="breadcrumb" itemscope="" itemtype="http://schema.org/BreadcrumbList">
                    <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem"><a href=""><span class="glyphicon glyphicon-home"></span></a><a itemprop="item" href="https://novelbin.com/" title="Novel Bin"><span itemprop="name">Novel</span></a>
                        <meta itemprop="position" content="1">
                    </li>
                    <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem" class="">
                        <h1><a class="novel-link" itemprop="item" href="https://novelbin.com/b/strongest-necromancer-of-heavens-gate?novel_id=strongest-necromancer-of-heavens-gate&amp;chapter_id=chapter-1-prologue" title="Strongest Necromancer Of Heaven's Gate"><span itemprop="name">Strongest Necromancer Of Heaven's Gate</span></a></h1>
                        <meta itemprop="position" content="2">
                    </li>
                    <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem" class="active"><a itemprop="item" href="https://novelbjn.phieuvu.com/book/strongest-necromancer-of-heavens-gate/chapter-1-prologue" title="Chapter 1 Prologue"><span itemprop="name">
                                Chapter 1 Prologue</span></a>
                        <meta itemprop="position" content="3">
                    </li>
                </ol>
            </div>
        </div>
        <div class="container">
            <div class="alert alert-purple" role="alert">
                <button id="turn_off_noti" type="button" class="close" data-dismiss="alert" aria-hidden="true">
                    ×</button>
                <span class="glyphicon glyphicon-certificate"></span>
<span class="glyphicon glyphicon-certificate"></span>
<span class="glyphicon glyphicon-certificate"></span>
Dear readers! Donate here: <a style="    color: #428bca;
    font-weight: bold;" target="_blank" href="https://plisio.net/donate/Hwcdy_J5"> https://plisio.net/donate/Hwcdy_J5 </a> for support our team translate more chapters !
            </div>
        </div>

        <div id="chapter" class="chapter container">

            <div class="row">
                <div class="col-xs-12"><a class="novel-title" href="https://novelbin.com/b/strongest-necromancer-of-heavens-gate" title="Strongest Necromancer Of Heaven's Gate">Strongest Necromancer Of Heaven's Gate</a>
                    <h2><a class="chr-title" href="https://novelbjn.phieuvu.com/book/strongest-necromancer-of-heavens-gate/chapter-1-prologue" title="Chapter 1 Prologue"><span class="chr-text">
                                Chapter 1 Prologue</span></a></h2>
                    <hr class="chr-start"><a class="btn btn-responsive btn-success toggle-nav-open "><span class="glyphicon glyphicon-menu-up"></span></a>
                    <div class="chr-nav" id="chr-nav-top">
                        <div class="btn-group">
                            <a disabled="" class="btn btn-success" href="" id="prev_chap">

                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span class="hidden-xs">Prev Chapter</span></a>

                            <button type="button" class="btn btn-success chr-jump"><span class="glyphicon glyphicon-list-alt"></span></button>

                            <a title="Chapter 2 Character Creation [Part 1]" href="https://novelbjn.phieuvu.com/book/strongest-necromancer-of-heavens-gate/chapter-2-character-creation-part-1" class="btn btn-success" id="next_chap">

                                <span class="hidden-xs">Next Chapter</span>
                                <span class="glyphicon glyphicon-chevron-right"></span></a>
                        </div>
                    </div>
                    <hr class="chr-end">
                    <div id="chr-content" class="chr-c" style="font-family: Arial, sans-serif, serif; font-size: 18px; line-height: 160%; margin-top: 15px;">


                        <div id="pf-10311-1"><script>window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: "66b4e3c40939a022784366eb", id: "pf-10311-1"})</script></div>
                        <div></div>

                        <p><span id="span"></span></p><p><span id="span"></span></p><p><span id="span"></span>"I see things others can't."</p><p><span id="span"></span>A blazing inferno raged across the capital city that once stood on the continent for thousands of years.</p><p><span id="span"></span>"Hear things others don't."</p><div id="pf-10364-1"><script>window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: "66b9b2575d6f5a59dab6ff6d", id: "pf-10364-1"})</script></div><p><span id="span"></span>The sound of warcries, curses, and dying screams spread across the entire city as the invaders mercilessly attacked anything and everything in their path.</p><p><span id="span"></span>"Shed tears when others won't."</p><p><span id="span"></span>The sound of babies and children wailing in their mother's arms could be heard everywhere, as their parents desperately looked for a safe place to hide in order to save themselves from the one-sided massacre that was happening around them.</p><p><span id="span"></span>"And fight when others don't."</p><p><span id="span"></span>A red-headed boy looked at the vast hordes of monsters that were about to destroy everything he held dear in his life. Even so, he walked towards them fearlessly as several men and women marched alongside him.<sub> </sub></p><div id="pf-10365-1"><script>window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: "66b9b26799ef0d23774745a8", id: "pf-10365-1"})</script></div><p><span id="span"></span>"I seek the monsters you fear the most," The Half-Elf said softly as he raised his hand, summoning countless Undead to fight for his side. "I chase the nightmares that plague your sweetest dreams."</p><p><span id="span"></span>"I walk in the darkness so that others may see the light. I fight the creatures that threaten this world with all my might."</p><p><span id="span"></span>A giant bone dragon landed in front of the Half-Elf and bowed its head in respect. The red-headed boy patted its head before jumping on its back, preparing to fight alongside his Undead Legion.</p><p><span id="span"></span>With one mighty flap of its tattered wings, the bone dragon soared towards the sky and uttered a deafening roar of defiance. Its Master stood straight on its back like a sword, looking at the countless monsters that were slowly advancing in his direction.</p><p><span id="span"></span> "In a world where my existence has long been forgotten…" The Half-Elf stated as his bone dragon opened its mouth to unleash its Dragon Breath.</p><p><span id="span"></span>"I will let you know the error of the path you have trodden!"</p><p><span id="span"></span>Occasionally missing content, please report errors in time.</p>




                        <div id="pf-10366-1"><script>window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: "66b9b27899ef0d23774745cd", id: "pf-10366-1"})</script></div>

                    </div>
                    <hr class="chr-end">
                    <div class="chr-nav" id="chr-nav-bottom">
                        <div class="btn-group">
                            <a disabled="" class="btn btn-success" href="" id="prev_chap">

                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span class="hidden-xs">Prev Chapter</span></a>

                            <button style="color: #fff;background-color: #5cb85c;border-color: #4cae4c;" type="button" class="btn btn-success chr-jump"><span class="glyphicon glyphicon-list-alt"></span></button>

                            <a title="Chapter 2 Character Creation [Part 1]" href="https://novelbjn.phieuvu.com/book/strongest-necromancer-of-heavens-gate/chapter-2-character-creation-part-1" class="btn btn-success" id="next_chap">

                                <span class="hidden-xs">Next Chapter</span>
                                <span class="glyphicon glyphicon-chevron-right"></span></a>
                        </div>
                    </div>
                    <div class="text-center">
                        <a class="btn btn-warning" id="chr-error" data-chr-id="866261"><span class="glyphicon glyphicon-exclamation-sign"></span> Report
                            chapter
                        </a>
                        <a class="btn btn-info" id="chr-comment">
                            <span class="glyphicon glyphicon-comment"></span> Comments
                        </a>
                    </div>
                    <div class="bg-info text-center visible-md visible-lg box-notice">
                        Tip: You can use left, right, A and D keyboard keys to browse between chapters.
                    </div>
                    <div class="text-center">
                           
                    </div>

                    
                    <div class="comments">
                        <div class="row" id="fb-comment-chapter" style="display: none">
                            <div id="disqus_thread"></div>
                            <script>
                                var disqus_config = function () {
                                    this.page.url = 'https://novelbin.com/b/strongest-necromancer-of-heavens-gate';
                                    this.page.identifier = 'strongest-necromancer-of-heavens-gate';
                                };

                                $chapterComment = $('#fb-comment-chapter');

                                function toggleChapterComment() {
                                    if ($chapterComment.is(":hidden")) {

                                        (function () { // DON'T EDIT BELOW THIS LINE
                                            var d = document, s = d.createElement('script');
                                            s.src = 'https://webnovel-3.disqus.com/embed.js';
                                            s.setAttribute('data-timestamp', +new Date());
                                            (d.head || d.body).appendChild(s);
                                        })();

                                    }
                                    $chapterComment.toggle();
                                }

                                
                                setTimeout(function () {

                                    const paragraphss = $("p");

                                    paragraphss.each(function () {
                                        const original11Content = $(this).html();
                                        const updated11Content = original11Content.replace("", "<span id="span"></span>");
                                        $(this).html(updated11Content);
                                    });
                                }, 600000);
                                
                            </script>
                            <noscript>Please enable JavaScript to view the <a
                                    href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer ">
        <div class="container">
            <div class="hidden-xs col-sm-5"><strong>Novel Bin</strong>
                Read light novel, web novel, korean novel and chinese novel online for free.
                You can find hundreds of english translated light novel, web novel, korean novel and chinese novel which are
                daily updated!
                Read novels online, read light novel online, read online free, free light novel online.
                <p><span id="span"></span>&nbsp;</p>
            </div>
            <ul class="col-xs-12 col-sm-7 list-unstyled">
                <li class="text-right pull-right"><a href="https://novelbin.com/contact" title="Contact">Contact</a> -
                    <a href="https://novelbin.com/privacy-policy" title="ToS">ToS</a> -
                    <a href="/sitemap-0.xml" target="_blank" title="sitemap">Sitemap</a> -
                    <a href="https://plisio.net/donate/Hwcdy_J5" target="_blank" title="donate">Donate</a>
    
                    <a class="backtop" href="#" rel="nofollow" title=""><span class="glyphicon glyphicon-upload"></span>
                    </a>
                </li>
            </ul>
        </div>
    </footer></div>

<script type="text/javascript">
    const novel = {
        id: 'strongest-necromancer-of-heavens-gate',
        name: 'Strongest Necromancer Of Heaven&#x27;s Gate',
        url: 'https://novelbin.com/b/strongest-necromancer-of-heavens-gate',
    };
    const chapter = {
        id: 'chapter-1-prologue',
        name: 'Chapter 1 Prologue',
        url: 'https://novelbjn.phieuvu.com/book/strongest-necromancer-of-heavens-gate/chapter-1-prologue',
        chapter_id: 'chapter-1-prologue'
    };

    $(document).ready(function () {
      //  
        chapterDetail(novel, chapter);
        $('#chr-comment').on('click', toggleChapterComment);
        turnOffNotify();
    });
</script>
    <script>
        $(document).ready(function () {
            $('.lazy').Lazy({
                placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            });
        });
    </script>


</body></html>
    `;
}
