import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar: React.FC = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <FontAwesomeIcon
                    icon={faDragon}
                    style={{ marginRight: "8px" }}
                />
                Anime Music
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#contact">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
