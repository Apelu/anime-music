import { SortDirection, ViewType, ViewTypeIcons } from "@data/constants";
import { FactorGroupItem } from "@features/factor/FactorGroupItem";
import { useContext, useEffect, useState } from "react";
import {
    Badge,
    Container,
    ToggleButton,
    ToggleButtonGroup,
} from "react-bootstrap";
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
import factor from "@features/factor";

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
                <Schedule
                    {...{
                        groups,
                        setGroups,
                    }}
                />
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
        fetch(
            `http://localhost:5555/api/factor/updateMyFactorMealSelectionsFor`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // week: 34,
                    // year: 2024,
                    id: factorMeal.id,
                    isSelected: !factorMeal.selected,
                }),
            }
        ).then(response => {
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
        fetch("http://localhost:5555/api/factor/buildMyFactorMealsFor")
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
        fetch(
            "http://localhost:5555/api/factor/updateMyFactorMealGroupSelectionsFor",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: factorGroup.id,
                    isSelected: !factorGroup.selected,
                }),
            }
        ).then(response => {
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
        fetch("http://localhost:5555/api/factor/buildMyFactorMealGroupsFor")
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                const newGroups = Object.keys(data).map(
                    key => new FactorGroup(data[key])
                );

                setGroups(newGroups);
            });
    }

    useEffect(() => {
        pullGroupsFromServer();
    }, []);

    if (!groups) return null;

    groups.sort((a: FactorGroup, b: FactorGroup) => {
        return a.getScore() - b.getScore();
    });

    const mealInGroupCount: { [mealID: string]: number } = {};
    for (const group of groups.filter(
        (factorGroup: FactorGroup) => factorGroup.selected
    )) {
        for (const meal of group.factorMeals) {
            if (mealInGroupCount[meal.id] === undefined) {
                mealInGroupCount[meal.id] = 0;
            }
            mealInGroupCount[meal.id] += 1;
        }
    }

    return (
        <>
            <ToggleButtonGroup
                type="radio"
                name="selectionToggle"
                defaultValue={SelectionTab.Selected}
                onChange={value => {
                    setSelectedTab(value);
                }}
                className="ms-3 mb-3"
            >
                {Object.values(SelectionTab).map(tab => (
                    <ToggleButton
                        id={`tbg-radio-${tab}`}
                        value={tab}
                        variant="outline-success"
                        key={tab}
                        className="mb-3"
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
                                mealInGroupCount={mealInGroupCount}
                                key={index}
                                factorGroup={factorGroup}
                                updateGroupSelection={updateGroupSelection}
                            />
                        ))}
            </Container>
        </>
    );
}

function Schedule({
    groups,
    setGroups,
}: {
    groups: FactorGroup[];
    setGroups: (data: FactorGroup[]) => void;
}) {
    if (!groups) return null;

    groups.sort((a: FactorGroup, b: FactorGroup) => {
        return a.getScore() - b.getScore();
    });

    const mealInGroupCount: { [mealID: string]: number } = {};
    for (const group of groups.filter(
        (factorGroup: FactorGroup) => factorGroup.selected
    )) {
        for (const meal of group.factorMeals) {
            if (mealInGroupCount[meal.id] === undefined) {
                mealInGroupCount[meal.id] = 0;
            }
            mealInGroupCount[meal.id] += 1;
        }
    }

    const selectedGroup = groups.filter(
        (factorGroup: FactorGroup) => factorGroup.selected
    );

    const scheduleNutritionValues = selectedGroup.reduce(
        (
            scheduleNutritionValues: { [nutrientName: string]: number },
            factorGroup: FactorGroup
        ) => {
            for (const nutrientName in factorGroup.nutrition) {
                if (scheduleNutritionValues[nutrientName] === undefined) {
                    scheduleNutritionValues[nutrientName] = 0;
                }
                scheduleNutritionValues[nutrientName] +=
                    factorGroup.nutrition[nutrientName].amount;
            }
            return scheduleNutritionValues;
        },
        {}
    );

    return (
        <>
            <Container fluid className="mt-3 d-flex flex-wrap">
                {/* Nutrition Values for Schedule */}

                <div className="d-flex flex-wrap">
                    {Object.entries(scheduleNutritionValues).map(
                        ([nutrientName, amount]) => (
                            <Badge className="me-3">
                                <small>
                                    {nutrientName}
                                    {": "}
                                </small>
                                <small>
                                    {Math.floor(
                                        (100 * amount) /
                                            (Nutrition.DailyValues[
                                                nutrientName
                                            ] *
                                                7)
                                    )}{" "}
                                </small>
                            </Badge>
                        )
                    )}
                </div>
            </Container>
        </>
    );
}
