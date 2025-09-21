/**
 * React Component for a Dropdown with the below features:
 * -Allow for multiple selections (Selected items have faCheckCircle)
 * -Filter items by a search bar
 * -Configurable title (display label, display selected items, display label and selected items)
 */

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";

export enum TitleType {
    Label = "label",
    SelectedItems = "selectedItems",
    Both = "both",
}

export enum FilterVisibility {
    "Auto" = "auto",
    "Always" = "always",
    "Never" = "never",
}

function TheUltimateDropdown({
    titleType = TitleType.Label,
    title = "",
    selectedItems = [] as string[],
    items = [] as string[],
    handleItemClick = (item: string) => {},
    dropdownProps = {},
    toggleProps = {},
    filterVisibility = FilterVisibility.Auto,
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

    const selectedCount = selectedItems.length;
    return (
        <Dropdown {...dropdownProps}>
            <Dropdown.Toggle {...toggleProps}>
                {titleType === TitleType.Label && title}
                {titleType === TitleType.SelectedItems && (
                    <>
                        {selectedCount === 1
                            ? selectedItems[0]
                            : `[${selectedItems.join(", ")}]`}
                    </>
                )}
                {titleType === TitleType.Both && (
                    <>
                        {title}
                        {selectedCount > 0 && (
                            <>{` [${selectedItems.join(", ")}]`}</>
                        )}
                    </>
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {(filterVisibility === FilterVisibility.Always ||
                    (filterVisibility === FilterVisibility.Auto &&
                        items.length > 5)) && (
                    <FormControl
                        type="text"
                        placeholder="Filter"
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                )}

                {filterItems(items).map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        active={selectedItems.includes(item)}
                        onClick={() => handleItemClick(item)}
                    >
                        {selectedItems.includes(item) && (
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="me-2"
                            />
                        )}
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default TheUltimateDropdown;
