import { getSortIcon, SortDirection, SortType } from "@data/constants";
import TheUltimateDropdown, {
    TitleType,
} from "@features/ui/TheUltimateDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Badge, Button, ButtonGroup, Card, Container } from "react-bootstrap";

class Nutrition {
    static Keys = {
        calories: "Calories",
        fat: "Fat",
        saturatedFat: "Saturated Fat",
        carbohydrate: "Carbohydrate",
        sugar: "Sugar",
        fiber: "Dietary Fiber",
        protein: "Protein",
        cholesterol: "Cholesterol",
        sodium: "Sodium",
    };

    static DailyValues = {
        [Nutrition.Keys.calories]: 2000,
        [Nutrition.Keys.fat]: 65,
        [Nutrition.Keys.saturatedFat]: 20,
        [Nutrition.Keys.carbohydrate]: 300,
        [Nutrition.Keys.sugar]: 50,
        [Nutrition.Keys.fiber]: 25,
        [Nutrition.Keys.protein]: 50,
        [Nutrition.Keys.cholesterol]: 300,
        [Nutrition.Keys.sodium]: 2300,
    };

    static GoalTypes = {
        Meet: "Meet",
        Below: "Below",
    };

    static DailyGoals = {
        [Nutrition.Keys.calories]: Nutrition.GoalTypes.Below,
        [Nutrition.Keys.fat]: Nutrition.GoalTypes.Below,
        [Nutrition.Keys.saturatedFat]: Nutrition.GoalTypes.Below,
        [Nutrition.Keys.carbohydrate]: Nutrition.GoalTypes.Meet,
        [Nutrition.Keys.sugar]: Nutrition.GoalTypes.Below,
        [Nutrition.Keys.fiber]: Nutrition.GoalTypes.Meet,
        [Nutrition.Keys.protein]: Nutrition.GoalTypes.Meet,
        [Nutrition.Keys.cholesterol]: Nutrition.GoalTypes.Below,
        [Nutrition.Keys.sodium]: Nutrition.GoalTypes.Below,
    };
}

interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    dvPercent: number;
}

interface FactorMealType {
    id: string;
    productCode: string;
    name: string;
    headline: string;
    image: string;
    websiteURL: string;
    nutrition: {
        [nutrientName: string]: Nutrient;
    };
    ingredients: {
        name: string;
    }[];
}

class FactorMeal implements FactorMealType {
    id: string;
    productCode: string;
    name: string;
    headline: string;
    image: string;
    websiteURL: string;
    ingredients: {
        name: string;
    }[];
    nutrition: {
        [nutrientName: string]: Nutrient;
    };

    constructor({
        id,
        productCode,
        name,
        headline,
        image,
        websiteURL,
        ingredients,
        nutrition,
    }: FactorMealType) {
        this.id = id;
        this.productCode = productCode;
        this.name = name;
        this.headline = headline;
        this.image = image;
        this.websiteURL = websiteURL;
        this.ingredients = ingredients;
        this.nutrition = nutrition;
    }

    getNutrient(nutrientName: string) {
        return this.nutrition[nutrientName];
    }

    getNutrientAmount(nutrientName: string) {
        try {
            return this.nutrition[nutrientName].amount;
        } catch (error) {
            console.error(
                `Error getting nutrient amount for ${nutrientName} in ${this.name}`,
                this.nutrition
            );
            return 0;
        }
    }

    getDV(nutrientName: string) {
        return Nutrition.DailyValues[nutrientName];
    }

    getDVPercent(nutrientName: string) {
        return Math.floor(
            (this.getNutrientAmount(nutrientName) / this.getDV(nutrientName)) *
                100
        );
    }

    getGoalType(nutrientName: string) {
        return Nutrition.DailyGoals[nutrientName];
    }

    getNutrientPercentColor(nutrientName: string) {
        const dvPercent = this.getDVPercent(nutrientName);

        if (dvPercent >= 100) {
            return "danger"; // 100+
        } else if (dvPercent > 70) {
            return this.getGoalType(nutrientName) === Nutrition.GoalTypes.Meet
                ? "success"
                : "warning"; // 71-99
        } else if (dvPercent > 30) {
            return "primary"; // 31-70
        } else {
            return this.getGoalType(nutrientName) === Nutrition.GoalTypes.Meet
                ? "warning"
                : "success"; // 0-30
        }
    }

    getNutrientUnit(nutrientName: string) {
        return this.nutrition[nutrientName].unit;
    }
}

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

    useEffect(() => {
        pullDataFromServer();
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
            <div className="mt-3 d-flex flex-column text-center align-items-center">
                Sort By
                <ButtonGroup className="me-2">
                    <TheUltimateDropdown
                        dropdownProps={{
                            as: ButtonGroup,
                        }}
                        toggleProps={{
                            variant: "primary",
                        }}
                        title={"Sort By"}
                        titleType={TitleType.Both}
                        selectedItems={[displaySettings.sortBy]}
                        items={sortByOptions}
                        handleItemClick={handleSortBySelection()}
                    />

                    <Button
                        variant={"secondary"}
                        onClick={toggleSortDirection()}
                    >
                        <FontAwesomeIcon
                            icon={getSortIcon(
                                SortType.Numeric,
                                displaySettings.sortDirection
                            )}
                        />
                    </Button>
                </ButtonGroup>
            </div>

            {data && (
                <Container fluid className="mt-3 d-flex flex-wrap">
                    {data.map(factorMeal => (
                        <FactorItem factorMeal={factorMeal} />
                    ))}
                </Container>
            )}
        </>
    );
}

const COL_1_WIDTH = 75;
const COL_2_WIDTH = 100 - COL_1_WIDTH;
const COL_2_1_WIDTH = 35;
const COL_2_2_WIDTH = COL_2_1_WIDTH;
const COL_2_3_WIDTH = 100 - COL_2_1_WIDTH * 2;
function FactorItem({ factorMeal }: { factorMeal: FactorMeal }) {
    const isFavorite = true;

    return (
        <Card
            style={{
                flex: 1,
                minWidth: "300px",
            }}
        >
            <Card.Body>
                <div className="d-flex flex-column align-items-center">
                    <a href={factorMeal.websiteURL} target="_blank">
                        <img
                            src={factorMeal.image}
                            alt={factorMeal.name}
                            style={{
                                objectFit: "cover",
                                maxWidth: "100%",
                                width: "300px",
                                height: "300px",
                            }}
                            className="rounded"
                        />
                    </a>
                    <div className="text-center">
                        <div>
                            <div>
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.fat}
                                    factorMeal={factorMeal}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.saturatedFat}
                                    factorMeal={factorMeal}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.carbohydrate}
                                    factorMeal={factorMeal}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.protein}
                                    factorMeal={factorMeal}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.cholesterol}
                                    factorMeal={factorMeal}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.sodium}
                                    factorMeal={factorMeal}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.sugar}
                                    factorMeal={factorMeal}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.fiber}
                                    factorMeal={factorMeal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="d-flex flex-column">
                <div className="d-flex">
                    <ItemName factorMeal={factorMeal} />
                    <div
                        // style={{ width: `${COL_2_WIDTH}%` }}
                        className="d-flex flex-column justify-content-around"
                    >
                        {/* <TheUltimateDropdown
                            title="Rating"
                            titleType={TitleType.SelectedItems}
                            selectedItems={["None"]}
                            items={["None", "Bad", "Okay", "Good", "Great"]}
                            toggleProps={{
                                className: "w-100",
                                size: "sm",
                                variant: "success",
                            }}
                        /> */}
                        {/* <div className="d-flex align-items-center text-center w-100">
                            <div
                                style={{
                                    width: `${COL_2_1_WIDTH}%`,
                                }}
                            >
                                <FontAwesomeIcon icon={faAdd} size={"xl"} />
                            </div>
                            <div
                                style={{
                                    width: `${COL_2_2_WIDTH}%`,
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isFavorite ? faHeart : faHeartCirclePlus
                                    }
                                    className={
                                        isFavorite
                                            ? "text-danger"
                                            : "text-primary"
                                    }
                                    title={
                                        isFavorite
                                            ? "Remove from Favorites"
                                            : "Add to Favorites"
                                    }
                                    size={"xl"}
                                />
                            </div>
                            <div
                                style={{
                                    width: `${COL_2_3_WIDTH}%`,
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faEllipsisV}
                                    size={"xl"}
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
            </Card.Footer>
        </Card>
    );
}

function ItemName({ factorMeal }: { factorMeal: FactorMeal }) {
    return (
        <div
            style={
                {
                    // width: `${COL_1_WIDTH}%`,
                }
            }
        >
            <div
                style={{
                    display: "-webkit-box",
                    maxWidth: "400px",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                title={`${factorMeal.name}\n(${factorMeal.headline})`}
            >{`${factorMeal.name}\n(${factorMeal.headline})`}</div>
            <div className="text-center">
                <NutritionBadge
                    nutrientName={Nutrition.Keys.calories}
                    factorMeal={factorMeal}
                />
            </div>
        </div>
    );
}

function NutritionBadge({
    nutrientName,
    factorMeal,
}: {
    nutrientName: string;
    factorMeal: FactorMeal;
}) {
    return (
        <Badge
            bg={factorMeal.getNutrientPercentColor(nutrientName)}
            className="me-1"
        >
            {`${nutrientName}: ${factorMeal.getDVPercent(nutrientName)}%`}
        </Badge>
    );
}
