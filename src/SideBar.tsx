import {
    faDragon,
    faHouse,
    faList,
    faMusic,
    faTable,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function SideBar() {
    const [isOpen, setOpen] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState("black");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [itemBackgroundColor, setItemBackgroundColor] = useState("yellow");
    const [itemTextColor, setItemTextColor] = useState("red");
    const [selectedItemBackgroundColor, setSelectedItemBackgroundColor] =
        useState("green");
    const [selectedItemTextColor, setSelectedItemTextColor] =
        useState("orange");

    const sideBarSettings = {
        backgroundColor,
        backgroundImage,
        itemBackgroundColor,
        itemTextColor,
        selectedItemBackgroundColor,
        selectedItemTextColor,
    };

    return (
        <SideBarContainer sideBarSettings={sideBarSettings}>
            <SideBarHeader isOpen={isOpen} sideBarSettings={sideBarSettings} />
            <hr className="mt-2" />
            <SideBarBody isOpen={isOpen} sideBarSettings={sideBarSettings} />
            <hr />
            <SideBarFooter isOpen={isOpen} sideBarSettings={sideBarSettings} />
        </SideBarContainer>
    );
}

function SideBarContainer({
    children,
    sideBarSettings,
}: {
    children: React.ReactNode;
    sideBarSettings: {
        backgroundColor: string;
        backgroundImage: string;
        itemBackgroundColor: string;
        itemTextColor: string;
        selectedItemBackgroundColor: string;
        selectedItemTextColor: string;
    };
}) {
    return (
        <div
            className="p-2"
            style={{
                backgroundColor: sideBarSettings.backgroundColor,
                width: "fit-content",
                height: "100vh",
            }}
        >
            {children}
        </div>
    );
}

function SideBarHeader({
    isOpen,
    sideBarSettings,
}: {
    isOpen: boolean;
    sideBarSettings: {
        backgroundColor: string;
        backgroundImage: string;
        itemBackgroundColor: string;
        itemTextColor: string;
        selectedItemBackgroundColor: string;
        selectedItemTextColor: string;
    };
}) {
    return (
        <div className="d-flex flex-column align-items-center">
            <a href="/">
                <FontAwesomeIcon icon={faDragon} className="bi" />
                {isOpen && <span className="ms-2">Anime Music</span>}
            </a>
        </div>
    );
}

function SideBarBodyItem({
    icon,
    text,
    selected,
    link,
    isOpen,
    sideBarSettings,
}: {
    icon: any;
    text: string;
    selected: boolean;
    link: string;
    isOpen: boolean;
    sideBarSettings: {
        backgroundColor: string;
        backgroundImage: string;
        itemBackgroundColor: string;
        itemTextColor: string;
        selectedItemBackgroundColor: string;
        selectedItemTextColor: string;
    };
}) {
    return (
        <li className="nav-item">
            <a
                href="#"
                className={`nav-link ${selected ? "active" : ""}`}
                aria-current="page"
            >
                <FontAwesomeIcon icon={icon} className="bi" />
                {isOpen && <span className="ms-2">{text}</span>}
            </a>
        </li>
    );
}

function SideBarBody({
    isOpen,
    sideBarSettings,
}: {
    isOpen: boolean;
    sideBarSettings: {
        backgroundColor: string;
        backgroundImage: string;
        itemBackgroundColor: string;
        itemTextColor: string;
        selectedItemBackgroundColor: string;
        selectedItemTextColor: string;
    };
}) {
    return (
        <>
            <ul className="nav nav-pills flex-column mb-auto">
                <SideBarBodyItem
                    icon={faHouse}
                    text="Home"
                    selected={true}
                    link="#"
                    isOpen={isOpen}
                    sideBarSettings={sideBarSettings}
                />

                <SideBarBodyItem
                    icon={faMusic}
                    text="Music"
                    selected={false}
                    link="#"
                    isOpen={isOpen}
                    sideBarSettings={sideBarSettings}
                />

                <SideBarBodyItem
                    icon={faTable}
                    text="Orders"
                    selected={false}
                    link="#"
                    isOpen={isOpen}
                    sideBarSettings={sideBarSettings}
                />

                <SideBarBodyItem
                    icon={faList}
                    text="Products"
                    selected={false}
                    link="#"
                    isOpen={isOpen}
                    sideBarSettings={sideBarSettings}
                />

                <SideBarBodyItem
                    icon={faUser}
                    text="Customers"
                    selected={false}
                    link="#"
                    isOpen={isOpen}
                    sideBarSettings={sideBarSettings}
                />
            </ul>
        </>
    );
}

function SideBarFooter({
    isOpen,
}: {
    isOpen: boolean;
    sideBarSettings: {
        backgroundColor: string;
        backgroundImage: string;
        itemBackgroundColor: string;
        itemTextColor: string;
        selectedItemBackgroundColor: string;
        selectedItemTextColor: string;
    };
}) {
    return (
        <div className="dropdown">
            <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                />
                {isOpen && <strong>mdo</strong>}
            </a>
            <ul
                className="dropdown-menu dropdown-menu-dark text-small shadow"
                aria-labelledby="dropdownUser1"
            >
                <li>
                    <a className="dropdown-item" href="#">
                        New project...
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Settings
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Profile
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        Sign out
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
