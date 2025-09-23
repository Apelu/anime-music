import { Button } from "react-bootstrap";

function AniListLoginButton() {
    const clientID = document.location.href.includes(
        "https://anime-track.netlify.app/"
    )
        ? 15774
        : 15485;

    return (
        <Button
            size="lg"
            className="text-center mb-3 d-flex align-items-center"
            title="Login with AniList"
            href={`https://anilist.co/api/v2/oauth/authorize?client_id=${clientID}&response_type=token`}
        >
            <img
                src="https://anilist.co/img/icons/icon.svg"
                alt=""
                style={{
                    width: "64px",
                    height: "64px",
                }}
            />
        </Button>
    );
}

export default AniListLoginButton;
