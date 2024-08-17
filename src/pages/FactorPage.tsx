import { SortDirection } from "@data/constants";
import { FactorGroupItem } from "@features/factor/FactorGroupItem";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FactorGroup } from "../features/factor/FactorGroup";
import { FactorMeal } from "../features/factor/FactorMeal";
import { Nutrition } from "../features/factor/Nutrition";

export function FactorPage() {
    const [data, setData] = useState<FactorMeal[]>([]);
    function pullDataFromServer() {
        fetch("http://localhost:5555/api/factor/getWeekMenu")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(
                    Object.keys(data).map(key => new FactorMeal(data[key]))
                );
            });
    }

    const [groups, setGroups] = useState<FactorGroup[]>([]);
    function pullGroupsFromServer() {
        fetch("http://localhost:5555/api/factor/getWeekMenuGroups")
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                setGroups(
                    Object.keys(data).map(key => new FactorGroup(data[key]))
                );
            });
    }

    useEffect(() => {
        // pullDataFromServer();
        pullGroupsFromServer();
    }, []);

    const sortByOptions = Object.values(Nutrition.Keys);
    const [displaySettings, setDisplaySettings] = useState({
        sortBy: "",
        sortDirection: SortDirection.Ascending,
    });

    if (displaySettings.sortBy) {
        data.sort((a, b) => {
            const nutrientA = a.getNutrientAmount(displaySettings.sortBy);
            const nutrientB = b.getNutrientAmount(displaySettings.sortBy);
            return displaySettings.sortDirection === SortDirection.Ascending
                ? nutrientA - nutrientB
                : nutrientB - nutrientA;
        });

        groups.sort((a, b) => {
            const nutrientA = a.getNutrientAmount(displaySettings.sortBy);
            const nutrientB = b.getNutrientAmount(displaySettings.sortBy);
            return displaySettings.sortDirection === SortDirection.Ascending
                ? nutrientA - nutrientB
                : nutrientB - nutrientA;
        });
    }

    function toggleSortDirection() {
        return () => {
            setDisplaySettings({
                ...displaySettings,
                sortDirection:
                    displaySettings.sortDirection === SortDirection.Ascending
                        ? SortDirection.Descending
                        : SortDirection.Ascending,
            });
        };
    }

    function handleSortBySelection() {
        return (selectedItem: string) => {
            setDisplaySettings({
                ...displaySettings,
                sortBy: selectedItem,
            });
        };
    }

    return (
        <>
            <Container fluid className="mt-3 d-flex flex-wrap">
                {/* {data &&
                    data.map(factorMeal => (
                        <FactorItem factorMeal={factorMeal} />
                    ))} */}
                {/* {<FactorGroupItem} */}
                {groups &&
                    groups
                        .slice(0, 10)
                        .map(factorGroup => (
                            <FactorGroupItem factorGroup={factorGroup} />
                        ))}
            </Container>
        </>
    );
}
