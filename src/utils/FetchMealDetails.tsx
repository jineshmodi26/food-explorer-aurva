import axios from 'axios';

interface Ingredient {
    name: string;
    measure: string;
}

export interface MealDetails {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string[] | null;
    strYoutube: string;
    ingredients: Ingredient[];
    source: string | null;
}

interface FetchMealDetailsResponse {
    meals: {
        idMeal: string;
        strMeal: string;
        strCategory: string;
        strArea: string;
        strInstructions: string;
        strMealThumb: string;
        strTags: string | null;
        strYoutube: string;
        strSource: string | null;
        [key: string]: any;
    }[];
}

const FetchMealDetails = async (mealId: string): Promise<MealDetails> => {
    try {
        const response = await axios.get<FetchMealDetailsResponse>(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const meal = response.data.meals[0];

        const ingredients: Ingredient[] = [];

        for (let i = 1; i <= 20; i++) {
            const ingredientName = meal[`strIngredient${i}`];
            const ingredientMeasure = meal[`strMeasure${i}`];

            if (ingredientName && ingredientName.trim() !== '') {
                ingredients.push({
                    name: ingredientName,
                    measure: ingredientMeasure ? ingredientMeasure.trim() : '',
                });
            }
        }

        const tags = meal.strTags ? meal.strTags.split(',') : null;

        return {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strCategory: meal.strCategory,
            strArea: meal.strArea,
            strInstructions: meal.strInstructions,
            strMealThumb: meal.strMealThumb,
            strTags: tags,
            strYoutube: meal.strYoutube,
            ingredients,
            source: meal.strSource,
        };
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Unknown error');
    }
};

export default FetchMealDetails;
