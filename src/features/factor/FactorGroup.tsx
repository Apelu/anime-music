import { FactorMeal } from "./FactorMeal";
import { Nutrient, Nutrition } from "./Nutrition";

interface FactorGroupType {
    id: string;
    factorMeals: FactorMeal[];
    nutrition: {
        [nutrientName: string]: Nutrient;
    };
    ingredients: {
        name: string;
    }[];
    selected: boolean;
}
export class FactorGroup implements FactorGroupType {
    id: string;
    name: string;
    factorMeals: FactorMeal[];
    nutrition: {
        [nutrientName: string]: Nutrient;
    };
    ingredients: {
        name: string;
    }[];
    selected: boolean = false;

    constructor(factorGroup: FactorGroupType) {
        const {
            id,
            factorMeals: items,
            nutrition,
            ingredients,
            selected,
        } = factorGroup;
        this.id = id;
        this.factorMeals = items.map(item => new FactorMeal(item));
        this.nutrition = nutrition;
        this.ingredients = ingredients;
        this.selected = selected;

        console.log(factorGroup);

        this.name = this.factorMeals.map(item => item.name).join(", ");
    }

    getScore() {
        // Calculate the score of the group based on close-ness to nutrition goals
        let score = 0;
        for (const nutrientName in this.nutrition) {
            const dvPercent = this.getDVPercent(nutrientName);
            const goalType = this.getGoalType(nutrientName);

            if (goalType === Nutrition.GoalTypes.Meet) {
                if (dvPercent >= 100) {
                    const overBy = dvPercent - 100;
                    if (overBy > 20) {
                        score -= overBy;
                    } else {
                        score += 100 - dvPercent;
                    }
                } else {
                    score += 100 - dvPercent;
                }
            } else {
                score += 100 - dvPercent;
            }
        }

        return score;
    }

    toFactorMeal() {
        return new FactorMeal({
            id: this.name,
            name: this.name,
            headline: "",
            image: "",
            websiteURL: "",
            ingredients: this.ingredients,
            nutrition: this.nutrition,
            selected: this.selected,
            type: "normal",
        });
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
