import {
    faArrowLeft,
    faArrowRight,
    faClock,
    faEye,
    faPause,
    faPlay,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "react-bootstrap";

function LoginPage() {
    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center bg-info"
            style={{ height: "100vh" }}
        >
            <Button size="lg" className="text-center">
                Login with AniList
            </Button>
        </Container>
    );
}

export default LoginPage;
// return (
//     <Container
//         fluid
//         className="d-flex flex-column justify-items-center align-items-center pt-3"
//     >
//         <Button size="lg">Login</Button>

//         {/* <Card>
//             <Card.Header>
//                 <div className="d-flex justify-content-center">
//                     {[faArrowLeft, faPlay, faArrowRight].map(icon => (
//                         <FontAwesomeIcon
//                             icon={icon}
//                             size="xl"
//                             className="p-3"
//                         />
//                     ))}
//                 </div>
//             </Card.Header>
//             <Card.Body>
//                 <div
//                     className="d-flex w-100 justify-content-center
//             align-items-center p-2"
//                 >
//                     <Card>
//                         <Card.Header>Header</Card.Header>
//                         <Card.Body>
//                             <Card.Title>Card Title</Card.Title>
//                             <Card.Text>Card Text</Card.Text>
//                         </Card.Body>
//                         <Card.Footer>Footer</Card.Footer>
//                     </Card>
//                     <span style={{ width: "10px" }}></span>
//                     <Card>
//                         <Card.Header>Header</Card.Header>
//                         <Card.Body>
//                             <Card.Title>Card Title</Card.Title>
//                             <Card.Text>Card Text</Card.Text>
//                         </Card.Body>
//                         <Card.Footer>Footer</Card.Footer>
//                     </Card>
//                     <span style={{ width: "10px" }}></span>
//                     <Card>
//                         <Card.Header>Header</Card.Header>
//                         <Card.Body>
//                             <Card.Title>Card Title</Card.Title>
//                             <Card.Text>Card Text</Card.Text>
//                         </Card.Body>
//                         <Card.Footer>Footer</Card.Footer>
//                     </Card>
//                     <span style={{ width: "10px" }}></span>
//                     <Card>
//                         <Card.Header>Header</Card.Header>
//                         <Card.Body>
//                             <Card.Title>Card Title</Card.Title>
//                             <Card.Text>Card Text</Card.Text>
//                         </Card.Body>
//                         <Card.Footer>Footer</Card.Footer>
//                     </Card>
//                     <span style={{ width: "10px" }}></span>
//                     <Card>
//                         <Card.Header>Header</Card.Header>
//                         <Card.Body>
//                             <Card.Title>Card Title</Card.Title>
//                             <Card.Text>Card Text</Card.Text>
//                         </Card.Body>
//                         <Card.Footer>Footer</Card.Footer>
//                     </Card>
//                 </div>
//             </Card.Body>
//             <Card.Footer>
//                 <div className="d-flex flex-row w-100 justify-content-center">
//                     <strong> 12</strong>
//                     <FontAwesomeIcon icon={faEye} size="xl" />
//                     <div className="ms-auto">
//                         Time Left{" "}
//                         <FontAwesomeIcon icon={faClock} size="xl" />
//                     </div>
//                 </div>
//             </Card.Footer>
//         </Card> */}
//     </Container>
// );
