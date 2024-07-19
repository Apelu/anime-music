import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
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
    faArrowUp19,
    faArrowUp91,
    faArrowUpAZ,
    faArrowUpZA,
    faClose,
    faSearch,
    faSortAlphaAsc,
    faSortAlphaDesc,
    faSortNumericAsc,
    faSortNumericDesc,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";

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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
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

function SubBarSearch() {
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    return (
        <Form className="d-flex pt-3 pb-3">
            {isSearching && (
                <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    className="me-2"
                />
            )}
            <Button
                variant={"outline-success"}
                onClick={() => setIsSearching(!isSearching)}
            >
                <FontAwesomeIcon icon={isSearching ? faClose : faSearch} />
            </Button>
        </Form>
    );
}

enum SortOrder {
    Ascending,
    Descending,
}
enum SortType {
    Alphabetical,
    Numeric,
}

function SubBarSort({
    sortType,
    sortOrder,
    flipSortOrder,
}: {
    sortType: SortType;
    sortOrder: SortOrder;
    flipSortOrder: () => void;
}) {
    const iconMapping = {
        [SortOrder.Ascending + "|" + SortType.Alphabetical]: faArrowUpZA,
        [SortOrder.Descending + "|" + SortType.Alphabetical]: faArrowDownAZ,
        [SortOrder.Ascending + "|" + SortType.Numeric]: faArrowUp91,
        [SortOrder.Descending + "|" + SortType.Numeric]: faArrowDown91,
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

function FilterDropdown({ title = "Filter" }: { title?: string }) {
    const [filterText, setFilterText] = useState("");
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
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
                    <Dropdown.Item key={index}>{item}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

function SubBarOrderBy() {
    return <FilterDropdown title="Last Update" />;
}

function AnimeSubBar() {
    const [sortOrder, setSortOrder] = useState(SortOrder.Ascending);

    return (
        <Container fluid className="bg-info">
            <SubBarSearch />
            <SubBarSort
                sortOrder={sortOrder}
                sortType={SortType.Numeric}
                flipSortOrder={() =>
                    setSortOrder(
                        sortOrder === SortOrder.Ascending
                            ? SortOrder.Descending
                            : SortOrder.Ascending
                    )
                }
            />
            <SubBarOrderBy />
        </Container>
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
        </main>
    );
}

export default App;
