/**
 * Navigation Bar (Horizontal):
 * -Site Logo (Firebreather)
 * -Anime (Watch Sites Dropdown)
 * -Music (Playlists, Artists, Albums, Songs)
 * -Profile Image (Login, Register, Profile, Settings)
 */

import { userStorageKey, useUserData } from "@features/contexts/UserContext";
import { Paths } from "@features/routing/routes";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Container,
    Dropdown,
    DropdownDivider,
    Nav,
    Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <Navbar
            expand="lg"
            data-bs-theme="dark"
            style={{ backgroundColor: "transparent" }}
        >
            <Container fluid className="d-flex">
                <Navbar.Toggle></Navbar.Toggle>
                <ProfileDropdown isInvisible={true} />

                <Navbar.Collapse>
                    <Nav className="ms-auto me-auto my-2 my-lg-0">
                        <Nav.Link as={Link} to={Paths.Anime}>
                            Anime
                        </Nav.Link>
                        <Nav.Link as={Link} to={Paths.LocalAnime}>
                            LocalAnime
                        </Nav.Link>
                        <Nav.Link as={Link} to={Paths.Music}>
                            Music
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <ProfileDropdown />
            </Container>
        </Navbar>
    );
}

function ProfileDropdown({ isInvisible }: { isInvisible?: boolean }) {
    const userData = useUserData();
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
                        Profile ({userData.username})
                    </Nav.Link>
                </Dropdown.Item>
                {/* <Dropdown.Item>
                    <Nav.Link as={Link} to={Paths.BackgroundLibrary}>
                        My Backgrounds (Saved, Library)
                    </Nav.Link>
                </Dropdown.Item> */}
                <DropdownDivider />
                <Dropdown.Item>
                    <Nav.Link as={Link} to={Paths.WatchController}>
                        Watch Controller
                    </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Nav.Link as={Link} to={Paths.Controller}>
                        Download Queue
                    </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Nav.Link as={Link} to={Paths.Features}>
                        Features
                    </Nav.Link>
                </Dropdown.Item>

                <DropdownDivider />
                <Dropdown.Item
                    onClick={() => {
                        localStorage.removeItem(userStorageKey);
                        window.location.reload();
                    }}
                >
                    Log out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NavBar;
