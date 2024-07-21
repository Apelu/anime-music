import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./App.css";
import "@assets/custom.scss";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
    faArrowDown19,
    faArrowDown91,
    faArrowDownAZ,
    faArrowDownShortWide,
    faArrowDownWideShort,
    faArrowDownZA,
    faArrowUp19,
    faArrowUp91,
    faArrowUpAZ,
    faArrowUpWideShort,
    faArrowUpZA,
    faBorderAll,
    faCircleCheck,
    faClose,
    faDragon,
    faGrip,
    faList,
    faSearch,
    faSort,
    faSortAlphaAsc,
    faSortAlphaDesc,
    faSortNumericAsc,
    faSortNumericDesc,
    faTableCells,
    faTableCellsLarge,
    faTableList,
    faUpDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { faMicrosoft, faUps } from "@fortawesome/free-brands-svg-icons";
import AnimeSubBar from "@features/anime/AnimeSubBar/index";
import { SortType, SortDirection } from "@data/constants";
import { NavBar } from "@features/ui/NavBar/NavBar";
import AnimePage from "@pages/AnimePage";

function App() {
    return (
        <main>
            <NavBar />
            <AnimeSubBar />
            <AnimePage />
        </main>
    );
}

export default App;
