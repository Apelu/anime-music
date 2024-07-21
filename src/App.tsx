import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./App.css";
import "./custom.scss";

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
import { AnimeSubBar } from "./components/AnimeSubBar";
import { SortType, SortDirection } from "./utils/constants";
// Site Planning:

/**
 * Navigation Bar (Horizontal):
 * -Site Logo (Firebreather)
 * -Anime (Watch Sites Dropdown)
 * -Music (Playlists, Artists, Albums, Songs)
 * -Profile Image (Login, Register, Profile, Settings)
 */

function NavBar() {
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
                        <Nav.Link href="#action1">Sites</Nav.Link>
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

/**
 * Sub Bar (Horizontal):
 * -Search Bar (Search)
 * -Sort (Sort) / Order (Ascending, Descending)
 * -Group By Status [True/False]
 * -Filter (...)
 * -View (Grid, List)
 */
function SubBar({ mode }: { mode: string }) {
    if (mode === "anime") {
        return <AnimeSubBar />;
    } else if (mode === "music") {
        return <MusicSubBar />;
    } else {
        return <div>Invalid Mode</div>;
    }
}

function MusicSubBar() {
    return null;
}

export function SubBarSort({
    sortType,
    sortOrder,
    flipSortOrder,
}: {
    sortType: SortType;
    sortOrder: SortDirection;
    flipSortOrder: () => void;
}) {
    const iconMapping = {
        [SortDirection.Ascending + "|" + SortType.Alphabetical]: faArrowUpZA,
        [SortDirection.Descending + "|" + SortType.Alphabetical]: faArrowDownAZ,
        [SortDirection.Ascending + "|" + SortType.Numeric]: faArrowUp91,
        [SortDirection.Descending + "|" + SortType.Numeric]: faArrowDown91,
    };
    return (
        <Button variant="outline-success" onClick={flipSortOrder}>
            <FontAwesomeIcon icon={iconMapping[sortOrder + "|" + sortType]} />
        </Button>
    );
}

function MultiSelectFilterDropdown({
    title = "Multi-Filter",
}: {
    title?: string;
}) {
    const [filterText, setFilterText] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
    };

    const handleItemClick = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(
                selectedItems.filter(selectedItem => selectedItem !== item)
            );
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const filterItems = (items: string[]) => {
        return items.filter(item =>
            item.toLowerCase().includes(filterText.toLowerCase())
        );
    };

    const dropdownItems = [
        "Title",
        "Score",
        "Progress",
        "Last Updated",
        "Last Added",
        "Start Date",
        "Completed Date",
    ];

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <FormControl
                    type="text"
                    placeholder="Filter"
                    value={filterText}
                    onChange={handleFilterChange}
                />
                {filterItems(dropdownItems).map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        active={selectedItems.includes(item)}
                        onClick={() => handleItemClick(item)}
                    >
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export function FilterDropdown({
    title = "Filter",
    dropdownItems,
    handleSelectItem,
}: {
    title?: string;
    dropdownItems: string[];
    handleSelectItem: (item: string) => void;
}) {
    const [filterText, setFilterText] = useState("");

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
    };

    const filterItems = (items: string[]) => {
        return items.filter(item =>
            item.toLowerCase().includes(filterText.toLowerCase())
        );
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <FormControl
                    type="text"
                    placeholder="Filter"
                    value={filterText}
                    onChange={handleFilterChange}
                />
                {filterItems(dropdownItems).map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => handleSelectItem(item)}
                    >
                        {title == item && (
                            <FontAwesomeIcon icon={faCircleCheck} />
                        )}{" "}
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export function SubBarViewAs() {
    enum ViewType {
        Grid,
        List,
    }
    const [selectedView, setSelectedView] = useState(ViewType.Grid);

    return (
        <ButtonGroup aria-label="View As" className="ms-auto">
            <Button
                variant={
                    selectedView == ViewType.Grid
                        ? "success"
                        : "outline-success"
                }
                onClick={() => setSelectedView(ViewType.Grid)}
            >
                <FontAwesomeIcon icon={faGrip} /> Card
            </Button>

            <Button
                variant={
                    selectedView == ViewType.List
                        ? "success"
                        : "outline-success"
                }
                onClick={() => setSelectedView(ViewType.List)}
            >
                <FontAwesomeIcon icon={faTableList} /> List
            </Button>
        </ButtonGroup>
    );
}

function SubBarOrderBy() {
    const dropdownItemsMap: { [key: string]: SortType } = {
        Title: SortType.Alphabetical,
        Score: SortType.Numeric,
        Progress: SortType.Numeric,
        "Last Updated": SortType.Numeric,
        "Last Added": SortType.Numeric,
        "Start Date": SortType.Numeric,
        "Completed Date": SortType.Numeric,
    };
    const dropdownItems = Object.keys(dropdownItemsMap);
    const [sorting, setSorting] = useState({
        sortBy: dropdownItems[0],
        sortOrder: SortDirection.Ascending,
        sortType: dropdownItemsMap[dropdownItems[0]],
    });

    const { sortBy, sortOrder, sortType } = sorting;

    return (
        <div>
            <div style={{ display: "flex" }}>
                <FilterDropdown
                    title={sortBy}
                    dropdownItems={dropdownItems}
                    handleSelectItem={item => {
                        setSorting({
                            sortBy: item,
                            sortOrder: sorting.sortOrder,
                            sortType: dropdownItemsMap[item],
                        });
                    }}
                />
                <SubBarSort
                    sortOrder={sortOrder}
                    sortType={sortType}
                    flipSortOrder={() => {
                        setSorting({
                            ...sorting,
                            sortOrder:
                                sorting.sortOrder === SortDirection.Ascending
                                    ? SortDirection.Descending
                                    : SortDirection.Ascending,
                        });
                    }}
                />
            </div>
        </div>
    );
}

function SubBarGroupBy() {
    const dropdownItems = ["None", "Status", "Last Updated"];
    const [groupBy, setGroupBy] = useState(dropdownItems[0]);
    return (
        <div>
            <div style={{ display: "flex" }}>
                <FilterDropdown
                    title={groupBy}
                    dropdownItems={dropdownItems}
                    handleSelectItem={item => {
                        setGroupBy(item);
                    }}
                />
                {/* <SubBarSort
                    sortOrder={sortOrder}
                    sortType={sortType}
                    flipSortOrder={() => {
                        setSorting({
                            ...sorting,
                            sortOrder:
                                sorting.sortOrder === SortOrder.Ascending
                                    ? SortOrder.Descending
                                    : SortOrder.Ascending,
                        });
                    }}
                /> */}
            </div>
        </div>
    );
}

//  Pages:

/**
 * Anime Page:
 * -Retrieves Anime Data from API
 * -Displays Anime Data in Grid or List View
 */

/**
 * Music Page:
 * -Retrieves Music Data from API
 * -Displays in Video view or Audio view
 */

/**
 * Profile Page:
 * -Displays User Profile Data
 * -Edit Profile Data
 *
 */

function App() {
    return (
        <main>
            <NavBar />
            <SubBar mode="anime" />
            <Container className="pt-4 pb-3">
                {/* Example of Card Grid React Bootstrap (20 items) */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {Array.from(Array(20).keys()).map(index => (
                        <div className="col" key={index}>
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/150"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Card title {index + 1}
                                    </h5>
                                    <p className="card-text">
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        Go somewhere
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
}

export function OrderDirectionButton({
    sortType,
    sortDirection,
    handleFlipDirection,
    className,
}: {
    sortType: SortType;
    sortDirection: SortDirection;
    handleFlipDirection: () => void;
    className?: string;
}) {
    const iconMap = {
        [SortType.Alphabetical]: {
            [SortDirection.Ascending]: faArrowUpZA,
            [SortDirection.Descending]: faArrowDownZA,
        },
        [SortType.Numeric]: {
            [SortDirection.Ascending]: faArrowUp91,
            [SortDirection.Descending]: faArrowDown91,
        },
        [SortType.Other]: {
            [SortDirection.Ascending]: faArrowDownWideShort,
            [SortDirection.Descending]: faArrowUpWideShort,
        },
    };

    return (
        <Button variant={"secondary"} onClick={handleFlipDirection}>
            <FontAwesomeIcon icon={iconMap[sortType][sortDirection]} />
        </Button>
    );
}

function OrderDirectionButtonTestCases() {
    const [testCases, updateTestCases] = useState([
        {
            sortType: SortType.Alphabetical,
            sortDirection: SortDirection.Ascending,
        },
        {
            sortType: SortType.Alphabetical,
            sortDirection: SortDirection.Descending,
        },
        { sortType: SortType.Numeric, sortDirection: SortDirection.Ascending },
        { sortType: SortType.Numeric, sortDirection: SortDirection.Descending },
        { sortType: SortType.Other, sortDirection: SortDirection.Ascending },
        { sortType: SortType.Other, sortDirection: SortDirection.Descending },
    ]);

    return (
        <>
            OrderDirectionButton Test Cases:
            <div>
                {testCases.map((testCase, index) => (
                    <OrderDirectionButton
                        key={index}
                        sortType={testCase.sortType}
                        sortDirection={testCase.sortDirection}
                        handleFlipDirection={() => {
                            const newTestCases = [...testCases];
                            newTestCases[index].sortDirection =
                                newTestCases[index].sortDirection ===
                                SortDirection.Ascending
                                    ? SortDirection.Descending
                                    : SortDirection.Ascending;
                            updateTestCases(newTestCases);
                        }}
                    />
                ))}
            </div>
        </>
    );
}

export default App;
