import { FactorMeal } from "./FactorMeal";
import { Nutrient, Nutrition } from "./Nutrition";

interface FactorGroupType {
    id: string;
    items: FactorMeal[];
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
    items: FactorMeal[];
    nutrition: {
        [nutrientName: string]: Nutrient;
    };
    ingredients: {
        name: string;
    }[];
    selected: boolean = false;

    constructor(factorGroup: FactorGroupType) {
        const { id, items, nutrition, ingredients } = factorGroup;
        this.id = id;
        this.items = items.map(item => new FactorMeal(item));
        this.nutrition = nutrition;
        this.ingredients = ingredients;

        console.log(factorGroup);

        this.name = this.items.map(item => item.name).join(", ");
    }

    toFactorMeal() {
        return new FactorMeal({
            id: this.name,
            productCode: "",
            name: this.name,
            headline: "",
            image: "",
            websiteURL: "",
            ingredients: this.ingredients,
            nutrition: this.nutrition,
            selected: false,
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
