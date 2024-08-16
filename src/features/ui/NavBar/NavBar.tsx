/**
 * Navigation Bar (Horizontal):
 * -Site Logo (Firebreather)
 * -Anime (Watch Sites Dropdown)
 * -Music (Playlists, Artists, Albums, Songs)
 * -Profile Image (Login, Register, Profile, Settings)
 */

import { Paths } from "@features/routing/routes";
import {
    faDragon,
    faImage,
    faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    Button,
    Container,
    Dropdown,
    DropdownButton,
    DropdownDivider,
    Nav,
    Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

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
        <Navbar
            expand="lg"
            data-bs-theme="dark"
            // bg="dark"
            style={{ backgroundColor: "transparent" }}
        >
            <Container fluid className="d-flex">
                <Navbar.Toggle></Navbar.Toggle>
                <ProfileDropdown isInvisible={true} />

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
                        </Nav>
                    ) : (
                        <Button>Login with AniList</Button>
                    )}
                </Navbar.Collapse>
                <ProfileDropdown />
            </Container>
        </Navbar>
    );
}

function ProfileDropdown({ isInvisible }: { isInvisible?: boolean }) {
    return (
        <Dropdown className={isInvisible ? "invisible" : ""}>
            <Dropdown.Toggle
                style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                }}
            >
                <FontAwesomeIcon icon={faDragon} />
            </Dropdown.Toggle>

            <Dropdown.Menu
                align={{ lg: "end" }}
                style={{ zIndex: 99999999999999999 }}
            >
                <Dropdown.Item>
                    <Nav.Link as={Link} to={Paths.Profile}>
                        Profile
                    </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Nav.Link as={Link} to={Paths.BackgroundLibrary}>
                        My Backgrounds (Saved, Library)
                    </Nav.Link>
                </Dropdown.Item>
                <DropdownDivider />
                <Dropdown.Item>
                    <Nav.Link as={Link} to={Paths.Features}>
                        Features
                    </Nav.Link>
                </Dropdown.Item>

                <DropdownDivider />
                <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NavBar;
