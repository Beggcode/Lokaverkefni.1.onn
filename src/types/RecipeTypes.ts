// Types for recipe data
export interface MealListItem {
    idMeal: string;
    strMeal: string;
    strMealThumb: string; // Thumb = Thumbnail
}

// tegund fyrir nákvæmari upplýsingar um uppskrift
export interface RecipeDetail {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strYoutube?: string;
    [key: string]: string | undefined; 
}

// tegund fyrir category
export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

// svar sem inniheldur lista af meals
export interface MealDBResponse<T> {
    meals: T[] | null;
}

// svar sem inniheldur lista af categories
export interface CategoryDBResponse {
    categories: Category[];
}