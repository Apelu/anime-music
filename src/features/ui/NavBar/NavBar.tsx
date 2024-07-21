/**
 * Navigation Bar (Horizontal):
 * -Site Logo (Firebreather)
 * -Anime (Watch Sites Dropdown)
 * -Music (Playlists, Artists, Albums, Songs)
 * -Profile Image (Login, Register, Profile, Settings)
 */

import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";

export function NavBar() {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="#">
                    <FontAwesomeIcon icon={faDragon} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Anime</Nav.Link>
                        <Nav.Link href="#action1">Controller</Nav.Link>
                        <Nav.Link href="#action1">Music</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Profile"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Placeholder</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
