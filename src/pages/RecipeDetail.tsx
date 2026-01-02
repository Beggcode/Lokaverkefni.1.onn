import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { type RecipeDetail as RecipeTypes } from '../types/RecipeTypes';

type RecipeSummary = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<RecipeTypes | null>(null);
    const [similarRecipes, setSimilarRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSimilar = async (category: string) => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                const data = await res.json();
                const filtered = (data.meals as RecipeSummary[])
                    ?.filter((m: RecipeSummary) => m.idMeal !== id)
                    .slice(0, 4) || [];
                setSimilarRecipes(filtered);
            } catch (err) {
                console.error("Error fetching similar recipes:", err);
            }
        };

        const getRecipe = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();

                if (data.meals && data.meals.length > 0) {
                    const currentRecipe = data.meals[0] as RecipeTypes;
                    setRecipe(currentRecipe);
                    fetchSimilar(currentRecipe.strCategory);
                    window.scrollTo(0, 0);
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getRecipe();
        }
    }, [id, navigate]);

    if (loading) return <div>Loading...</div>;
    if (!recipe) return null;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        // Fixed: Use indexed access on recipe now that the type supports it
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                name: ingredient,
                measure: measure || '',
            });
        }
    }

    return (
        <div className="recipe-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', borderRadius: '12px' }} />
            
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((item, index) => (
                    <li key={index}>{item.measure} - {item.name}</li>
                ))}
            </ul>

            <h2>Instructions</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{recipe.strInstructions}</p>

            {/* Fixed: strYoutube is now recognized by the type */}
            {recipe.strYoutube && (
                <div style={{ marginTop: '20px' }}>
                    <a href={recipe.strYoutube} target="_blank" rel="noreferrer">Watch Video</a>
                </div>
            )}

            <hr />

            <h2>Similar Recipes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {similarRecipes.map((s) => (
                    <Link key={s.idMeal} to={`/recipes/${s.idMeal}`}>
                        <img src={s.strMealThumb} alt={s.strMeal} style={{ width: '100%' }} />
                        <p>{s.strMeal}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecipeDetail;