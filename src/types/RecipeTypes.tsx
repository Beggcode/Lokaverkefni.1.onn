// Grunntýpa fyrir stuttar upplýsingar í lista
export interface MealListItem {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

// Týpa fyrir nákvæmar upplýsingar um uppskrift á deilisíðu
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

// Týpa fyrir svör frá API sem innihalda lista af uppskriftum
export interface MealDBResponse {
    meals: MealListItem[] | null;
}

// Týpa fyrir svör frá API sem innihalda nákvæma uppskrift
export interface RecipeDetailResponse {
    meals: RecipeDetail[] | null;
}

// Týpa fyrir einfaldan lista af flokkum eða svæðum í dropdown síu
export interface ListOption {
    strCategory?: string;
    strArea?: string;
}