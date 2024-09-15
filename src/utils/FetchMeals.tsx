import axios from 'axios';

interface Meal {
    idMeal: string;
    strMeal: string;
}

interface FetchMealsResponse {
    meals: Meal[];
}

interface FetchMealsResult {
    topMeals: Meal[];
    mealEdge: any;
}

const FetchMeals = async (category: string): Promise<FetchMealsResult> => {
    try {

        const response = await axios.get<FetchMealsResponse>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const meals = response.data.meals;

        const filteredMeals = meals.length >= 5 ? meals.slice(0, 5) : meals

        const mealEdge = {
            id: `me-1`,
            source: 'option-1',
            target: 'meal-' + filteredMeals[2].idMeal,
            type: 'default',
            markerEnd: 'url(#arrow)',
        };

        return {
            topMeals: filteredMeals,
            mealEdge,
        };
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Unknown error');
    }
};

export default FetchMeals;
