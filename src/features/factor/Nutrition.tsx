export class Nutrition {
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
export interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    dvPercent: number;
}
