import { BackgroundItem, BackgroundKey } from "@features/background/constants";
import { Container } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

function BackgroundLibrary() {
    const { backgroundItems } = useOutletContext() as {
        backgroundItems: BackgroundItem[];
    };
    console.log({ items: backgroundItems });
    return (
        <Container className="bg-info w-100 h-100 d-flex flex-wrap justify-content-center">
            {/* {backgroundItems.map(item => (
                <video
                    className="p-2 bg-dark"
                    width={"50%"}
                    src={item[BackgroundKey.Url]}
                    poster={item[BackgroundKey.Poster]}
                />
            ))} */}
        </Container>
    );
}

// function BackgroundContainer() {
//     return
// }
export default BackgroundLibrary;
