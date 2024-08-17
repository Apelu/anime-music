import { Card } from "react-bootstrap";
import { FactorMeal } from "./FactorMeal";
import { Nutrition } from "./Nutrition";
import { NutritionBadge } from "./NutritionBadge";

const COL_1_WIDTH = 75;
const COL_2_WIDTH = 100 - COL_1_WIDTH;
const COL_2_1_WIDTH = 35;
const COL_2_2_WIDTH = COL_2_1_WIDTH;
const COL_2_3_WIDTH = 100 - COL_2_1_WIDTH * 2;
export function FactorItem({ factorMeal }: { factorMeal: FactorMeal }) {
    const isFavorite = true;

    return (
        <Card
            style={{
                flex: 1,
                minWidth: "300px",
            }}
            className="m-1 bg-info"
        >
            <Card.Body>
                <div className="d-flex flex-column align-items-center">
                    <a href={factorMeal.websiteURL} target="_blank">
                        <img
                            loading="lazy"
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
            <Card.Footer className="d-flex flex-column bg-secondary">
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

export function ItemName({ factorMeal }: { factorMeal: FactorMeal }) {
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
