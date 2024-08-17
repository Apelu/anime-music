import { Card, Popover, OverlayTrigger } from "react-bootstrap";
import { FactorGroup } from "./FactorGroup";
import { FactorMeal } from "./FactorMeal";
import { Nutrition } from "./Nutrition";
import { NutritionBadge } from "./NutritionBadge";

export function FactorGroupItem({ factorGroup }: { factorGroup: FactorGroup }) {
    return (
        <Card
            style={{
                flex: 1,
                minWidth: "300px",
            }}
            className="m-1 bg-info"
        >
            <Card.Body>
                <div>
                    <div>
                        {factorGroup.items.map((factorMeal: FactorMeal) => {
                            const popover = (
                                <Popover id="popover-basic">
                                    <Popover.Header>
                                        {factorMeal.name} ({factorMeal.headline}
                                        )
                                    </Popover.Header>
                                    <Popover.Body>
                                        <div>
                                            <div>
                                                <NutritionBadge
                                                    nutrientName={
                                                        Nutrition.Keys.fat
                                                    }
                                                    factorMeal={factorMeal}
                                                />
                                                <NutritionBadge
                                                    nutrientName={
                                                        Nutrition.Keys
                                                            .saturatedFat
                                                    }
                                                    factorMeal={factorMeal}
                                                />
                                                <NutritionBadge
                                                    nutrientName={
                                                        Nutrition.Keys
                                                            .carbohydrate
                                                    }
                                                    factorMeal={factorMeal}
                                                />
                                                <NutritionBadge
                                                    nutrientName={
                                                        Nutrition.Keys.protein
                                                    }
                                                    factorMeal={factorMeal}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <NutritionBadge
                                                    nutrientName={
                                                        Nutrition.Keys
                                                            .cholesterol
                                                    }
                                                    factorMeal={factorMeal}
                                                />
                                                <NutritionBadge
                                                    nutrientName={
                                                        Nutrition.Keys.sodium
                                                    }
                                                    factorMeal={factorMeal}
                                                />
                                                <NutritionBadge
                                                    nutrientName={
                                                        Nutrition.Keys.sugar
                                                    }
                                                    factorMeal={factorMeal}
                                                />
                                                <NutritionBadge
                                                    nutrientName={
                                                        Nutrition.Keys.fiber
                                                    }
                                                    factorMeal={factorMeal}
                                                />
                                            </div>
                                        </div>
                                    </Popover.Body>
                                </Popover>
                            );
                            return (
                                <OverlayTrigger
                                    placement="bottom"
                                    trigger={["hover", "focus"]}
                                    overlay={popover}
                                >
                                    <a
                                        href={factorMeal.websiteURL}
                                        target="_blank"
                                    >
                                        <img
                                            loading="lazy"
                                            src={factorMeal.image}
                                            alt={factorMeal.name}
                                            style={{
                                                objectFit: "cover",
                                                maxWidth: "50%",
                                            }}
                                            className="rounded"
                                        />
                                    </a>
                                </OverlayTrigger>
                            );
                        })}
                    </div>
                    <div className="text-center">
                        <div>
                            <div>
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.fat}
                                    factorMeal={factorGroup.toFactorMeal()}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.saturatedFat}
                                    factorMeal={factorGroup.toFactorMeal()}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.carbohydrate}
                                    factorMeal={factorGroup.toFactorMeal()}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.protein}
                                    factorMeal={factorGroup.toFactorMeal()}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.cholesterol}
                                    factorMeal={factorGroup.toFactorMeal()}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.sodium}
                                    factorMeal={factorGroup.toFactorMeal()}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.sugar}
                                    factorMeal={factorGroup.toFactorMeal()}
                                />
                                <NutritionBadge
                                    nutrientName={Nutrition.Keys.fiber}
                                    factorMeal={factorGroup.toFactorMeal()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="d-flex flex-column bg-secondary text-center">
                <div className="d-flex flex-column">
                    {/* <ItemName factorMeal={factorGroup.toFactorMeal()} /> */}
                    {factorGroup.items.map(factorMeal => (
                        <>
                            <span
                                style={{
                                    display: "-webkit-box",
                                    maxWidth: "400px",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={`${factorMeal.name}\n(${factorMeal.headline})`}
                            >
                                {factorMeal.name}
                            </span>
                        </>
                    ))}
                </div>
                <NutritionBadge
                    nutrientName={Nutrition.Keys.calories}
                    factorMeal={factorGroup.toFactorMeal()}
                />
            </Card.Footer>
        </Card>
    );
}
