import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type RecipeDetail as RecipeTypes } from '../types/RecipeTypes';

const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<RecipeTypes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const getRecipe = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();

                if (data.meals) {
                    setRecipe(data.meals[0]);
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

    if (loading) return <p>Loading...</p>;
    if (!recipe) return null;

    // aðgreina hráefni og mælingar í lista
    const ingredients = [];
    const recipeData = (recipe as unknown) as Record<string, string | null>;
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipeData[`strIngredient${i}`];
        const measure = recipeData[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                name: ingredient,
                measure: measure || '',
            });
        }
    }

    return (
        <div className="recipe-container"
        style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px' }} >

            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} 
                 alt={recipe.strMeal} 
                 className="recipe-image"
                 style={{ width: '100%', borderRadius: '8px' }} 
            />
            <p><strong>Category:</strong> {recipe.strCategory}</p>
            <p><strong>Country:</strong> {recipe.strArea}</p>
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((item, index) => (
                    <li key={index}>
                        {item.measure} - {item.name}
                    </li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <p style={{ whiteSpace: 'pre-line' }}>
                {recipe.strInstructions}
            </p>
        </div>
    );
};

export default RecipeDetail;