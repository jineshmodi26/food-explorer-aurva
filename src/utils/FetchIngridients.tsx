import axios from 'axios';

interface Ingredient {
  name: string;
  measure: string;
}

interface FetchIngredientsResponse {
  meals: {
    idMeal: string;
    strMeal: string;
    [key: string]: any;
  }[];
}

const FetchIngredients = async (mealId: string): Promise<Ingredient[]> => {
  try {
    const response = await axios.get<FetchIngredientsResponse>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
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

    return ingredients.length >= 5 ? ingredients.slice(0, 5) : ingredients
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Unknown error');
  }
};

export default FetchIngredients;
