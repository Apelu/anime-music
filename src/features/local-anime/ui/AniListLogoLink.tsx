function AniListLogoLink({ aniListID }: { aniListID: number }) {
    return (
        <span>
            <a href={`https://anilist.co/anime/${aniListID}`} target="_blank">
                <img
                    loading="lazy"
                    src={"https://anilist.co/img/logo_al.png"}
                    alt="?"
                    style={{ width: "20px" }}
                />
            </a>
        </span>
    );
}

export default AniListLogoLink;
