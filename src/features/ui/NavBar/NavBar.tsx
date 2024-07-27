/**
 * Navigation Bar (Horizontal):
 * -Site Logo (Firebreather)
 * -Anime (Watch Sites Dropdown)
 * -Music (Playlists, Artists, Albums, Songs)
 * -Profile Image (Login, Register, Profile, Settings)
 */

import { Paths } from "@features/routing/routes";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FirebaseTest } from "./../../../pages/FirebaseTest";

export function NavBar() {
    interface User {
        profileImageUrl: string;
        // Add other properties as needed
    }

    const [loggedInUser, setLoggedInUser] = useState<User | null>({
        profileImageUrl:
            "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b6022064-o8AALZTxaDZK.png",
    });
    return (
        <Navbar expand="lg" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Toggle></Navbar.Toggle>
                <Navbar.Brand href="/">
                    <FontAwesomeIcon icon={faDragon} />
                </Navbar.Brand>

                <Navbar.Collapse>
                    {loggedInUser ? (
                        <Nav className="ms-auto me-auto my-2 my-lg-0">
                            <Nav.Link as={Link} to={Paths.Anime}>
                                Anime
                            </Nav.Link>
                            <Nav.Link as={Link} to={Paths.Controller}>
                                Controller
                            </Nav.Link>
                            <Nav.Link as={Link} to={Paths.Music}>
                                Music
                            </Nav.Link>
                            <Nav.Link as={Link} to={Paths.Features}>
                                Features
                            </Nav.Link>
                            {/* <Nav.Link as={Link} to={Paths.FirebaseTest}>
                                FirebaseTest
                            </Nav.Link> */}
                            {/* Add Profile */}
                            <Nav.Link as={Link} to={Paths.Profile}>
                                Profile
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <Button>Login with AniList</Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
