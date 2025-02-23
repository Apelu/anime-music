import { MyLocalServer } from "@features/api/server";
import { useUserData } from "@features/contexts/UserContext";
import { useEffect, useState } from "react";
import { Badge, Container } from "react-bootstrap";

export function LocalAnimeHome() {
    const user = useUserData();

    // TODO: GET User Lists (Continue Watching, ...)

    // TODO: Pull Data For Each List
    return (
        <Container>
            <h1
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    textAlign: "center",
                }}
            ></h1>
            <AnimeContainer title="Continue Watching" />
        </Container>
    );
}

interface AnimeContainerProps {
    title: string;
}

function AnimeContainer({ title }: AnimeContainerProps) {
    const user = useUserData();
    const [data, setData] = useState([]);
    function pullData() {
        MyLocalServer.pullUserAnimeList(user.id, title)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        pullData();
    }, []);
    // Pull Data based on container settings

    return (
        <Container
            fluid
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                margin: 0,
                padding: 0,
            }}
        >
            <h2 className="bg-primary p-2" style={{ textAlign: "center" }}>
                {title} <Badge bg="info">{data.length}</Badge>
            </h2>

            {/* {data.map((anime) => {
                return <div>{JSON.stringify(anime)}</div>
            })} */}
        </Container>
    );
}
