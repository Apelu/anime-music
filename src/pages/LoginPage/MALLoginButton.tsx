import { Button } from "react-bootstrap";

function MALLoginButton() {
    return (
        <Button
            size="lg"
            className="text-center mb-3"
            title="Login with MyAnimeList"
            onClick={() => {
                alert("MAL Login - Coming Soon");
            }}
        >
            <img
                src="https://www.svgrepo.com/show/331489/myanimelist.svg"
                alt=""
                style={{
                    width: "64px",
                    height: "64px",
                }}
            />
        </Button>
    );
}

export default MALLoginButton;
