import { SortDirection, ViewType, ViewTypeIcons } from "@data/constants";
import { FactorGroupItem } from "@features/factor/FactorGroupItem";
import { useContext, useEffect, useState } from "react";
import { Container, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { FactorMeal } from "../features/factor/FactorMeal";
import { Nutrition } from "../features/factor/Nutrition";
import {
    DisplaySettingsActionType,
    DisplaySettingsContext,
    DisplaySettingsDispatchContext,
} from "@features/contexts/DisplaySettingsContext";
import TheUltimateDropdown, {
    TitleType,
} from "@features/ui/TheUltimateDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FactorItem } from "@features/factor/FactorItem";
import { FactorGroup } from "./../features/factor/FactorGroup";

enum MealTab {
    Meals = "Meals",
    DayMeals = "Day Meals",
    WeekMeals = "Week Meals",
}

enum SelectionTab {
    Selected = "Selected",
    Removed = "Removed",
}

export function FactorPage() {
    const [tabSelected, setTabSelected] = useState<MealTab>(MealTab.Meals);
    const [mealData, setMealData] = useState<FactorMeal[]>([]);
    const [groups, setGroups] = useState<FactorGroup[]>([]);

    const displaySettings = useContext(DisplaySettingsContext);
    const dispatchDisplaySettings = useContext(DisplaySettingsDispatchContext);

    useEffect(() => {
        // pullDataFromServer();
        // pullGroupsFromServer();
        if (dispatchDisplaySettings) {
            dispatchDisplaySettings({
                type: DisplaySettingsActionType.SetSortByOptions,
                payload: Object.values(Nutrition.Keys),
            });
        }
    }, []);

    // if (!displaySettings) {
    //     return null;
    // }

    // if (displaySettings.sortBy) {
    //     data.sort((a, b) => {
    //         const nutrientA = a.getNutrientAmount(displaySettings.sortBy);
    //         const nutrientB = b.getNutrientAmount(displaySettings.sortBy);
    //         return displaySettings.sortDirection === SortDirection.Ascending
    //             ? nutrientA - nutrientB
    //             : nutrientB - nutrientA;
    //     });

    //     groups.sort((a, b) => {
    //         const nutrientA = a.getNutrientAmount(displaySettings.sortBy);
    //         const nutrientB = b.getNutrientAmount(displaySettings.sortBy);
    //         return displaySettings.sortDirection === SortDirection.Ascending
    //             ? nutrientA - nutrientB
    //             : nutrientB - nutrientA;
    //     });
    // }

    return (
        <>
            <Container fluid className="mt-3 d-flex flex-wrap">
                <div className="d-flex ">
                    <TheUltimateDropdown
                        title="Week"
                        titleType={TitleType.Both}
                        dropdownProps={{ className: "me-3" }}
                    />
                    <ToggleButtonGroup
                        type="radio"
                        name="mealToggle"
                        defaultValue={MealTab.Meals}
                        onChange={value => {
                            setTabSelected(value);
                        }}
                        className="mb-3"
                    >
                        {Object.values(MealTab).map(tab => (
                            <ToggleButton
                                id={`tbg-radio-${tab}`}
                                value={tab}
                                variant="outline-success"
                                key={tab}
                            >
                                {tab} (
                                {tab === MealTab.Meals
                                    ? mealData.filter(
                                          (factorMeal: FactorMeal) =>
                                              factorMeal.selected
                                      ).length
                                    : tab === MealTab.DayMeals
                                    ? groups.filter(
                                          (factorGroup: FactorGroup) =>
                                              factorGroup.selected
                                      ).length
                                    : 0}
                                {" / "}
                                {tab === MealTab.Meals
                                    ? mealData.length
                                    : groups.length}
                                )
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>
                {tabSelected === MealTab.Meals && (
                    <MealsTab {...{ mealData, setMealData }} />
                )}
                {tabSelected === MealTab.DayMeals && (
                    <DayMealsTab
                        {...{
                            groups,
                            setGroups,
                        }}
                    />
                )}
            </Container>
        </>
    );
}

function MealsTab({
    mealData,
    setMealData,
}: {
    mealData: FactorMeal[];
    setMealData: (data: FactorMeal[]) => void;
}) {
    const [selectedTab, setSelectedTab] = useState<SelectionTab>(
        SelectionTab.Selected
    );
    function updateMealSelection(factorMeal: FactorMeal) {
        fetch("http://localhost:5555/api/factor/updateMealSelection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                week: 34,
                year: 2024,
                id: factorMeal.id,
                selected: !factorMeal.selected,
            }),
        }).then(response => {
            console.log(response);
            setMealData(
                mealData.map((meal: FactorMeal) => {
                    if (meal.id === factorMeal.id) {
                        meal.selected = !factorMeal.selected;
                    }
                    return meal;
                })
            );
        });
    }

    function pullDataFromServer() {
        fetch("http://localhost:5555/api/factor/getWeekMenu")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setMealData(
                    Object.keys(data).map(key => new FactorMeal(data[key]))
                );
            });
    }

    useEffect(() => {
        pullDataFromServer();
    }, []);

    return (
        <>
            <ToggleButtonGroup
                type="radio"
                name="selectionToggle"
                defaultValue={SelectionTab.Selected}
                onChange={value => {
                    setSelectedTab(value);
                }}
                className="ms-3"
            >
                {Object.values(SelectionTab).map(tab => (
                    <ToggleButton
                        id={`tbg-radio-${tab}`}
                        value={tab}
                        variant="outline-success"
                        key={tab}
                    >
                        {tab}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <Container fluid className="mt-3 d-flex flex-wrap">
                {mealData &&
                    mealData
                        .filter((factorMeal: FactorMeal) =>
                            selectedTab === SelectionTab.Selected
                                ? factorMeal.selected
                                : !factorMeal.selected
                        )
                        .map(factorMeal => (
                            <FactorItem
                                factorMeal={factorMeal}
                                updateMealSelection={updateMealSelection}
                            />
                        ))}
            </Container>
        </>
    );
}

function DayMealsTab({
    groups,
    setGroups,
}: {
    groups: FactorGroup[];
    setGroups: (data: FactorGroup[]) => void;
}) {
    const [selectedTab, setSelectedTab] = useState<SelectionTab>(
        SelectionTab.Selected
    );
    function updateGroupSelection(factorGroup: FactorGroup) {
        fetch("http://localhost:5555/api/factor/updateGroupSelection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                week: 34,
                year: 2024,
                id: factorGroup.id,
                selected: !factorGroup.selected,
            }),
        }).then(response => {
            console.log(response);
            setGroups(
                groups.map((group: FactorGroup) => {
                    if (group.id === factorGroup.id) {
                        group.selected = !factorGroup.selected;
                    }
                    return group;
                })
            );
        });
    }

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
        pullGroupsFromServer();
    }, []);

    return (
        <>
            <ToggleButtonGroup
                type="radio"
                name="selectionToggle"
                defaultValue={SelectionTab.Selected}
                onChange={value => {
                    setSelectedTab(value);
                }}
                className="ms-3"
            >
                {Object.values(SelectionTab).map(tab => (
                    <ToggleButton
                        id={`tbg-radio-${tab}`}
                        value={tab}
                        variant="outline-success"
                        key={tab}
                    >
                        {tab}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <Container fluid className="mt-3 d-flex flex-wrap">
                {groups &&
                    groups
                        .filter((factorGroup: FactorGroup) =>
                            selectedTab === SelectionTab.Selected
                                ? factorGroup.selected
                                : !factorGroup.selected
                        )
                        .map((factorGroup, index) => (
                            <FactorGroupItem
                                key={index}
                                factorGroup={factorGroup}
                                updateGroupSelection={updateGroupSelection}
                            />
                        ))}
            </Container>
        </>
    );
}
