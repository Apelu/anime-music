import { Badge } from "react-bootstrap";
import { FactorMeal } from "./FactorMeal";

export function NutritionBadge({
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
