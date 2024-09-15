import axios from 'axios';

interface Tag {
    tag: string;
}

interface FetchTagsResponse {
    meals: {
        strTags?: string;
        [key: string]: any;
    }[];
}

const FetchTags = async (mealId: string): Promise<Tag[]> => {
    try {
        const response = await axios.get<FetchTagsResponse>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const meal = response.data.meals[0];

        const tags: Tag[] = [];

        const tagsString = meal.strTags;
        if (tagsString) {
            const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            tagsArray.forEach(tag => {
                tags.push({ tag });
            });
        }

        return tags;
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Unknown error');
    }
};

export default FetchTags;
