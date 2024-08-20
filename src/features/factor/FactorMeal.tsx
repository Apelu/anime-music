import { Nutrient, Nutrition } from "./Nutrition";

interface FactorMealType {
    id: string;
    name: string;
    headline: string;
    image: string;
    websiteURL: string;
    selected: boolean;
    type: "normal" | "breakfast";
    nutrition: {
        [nutrientName: string]: Nutrient;
    };
    ingredients: {
        name: string;
    }[];
}

export class FactorMeal implements FactorMealType {
    id: string;
    name: string;
    headline: string;
    image: string;
    websiteURL: string;
    selected: boolean;
    type: "normal" | "breakfast";
    nutrition: {
        [nutrientName: string]: Nutrient;
    };
    ingredients: {
        name: string;
    }[];

    constructor({
        id,
        name,
        headline,
        image,
        websiteURL,
        selected,
        type,
        nutrition,
        ingredients,
    }: FactorMealType) {
        this.id = id;
        this.name = name;
        this.headline = headline;
        this.image = image;
        this.websiteURL = websiteURL;
        this.selected = selected;
        this.type = type;
        this.nutrition = nutrition;
        this.ingredients = ingredients;
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
