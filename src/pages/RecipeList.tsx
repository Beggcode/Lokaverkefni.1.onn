import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { type MealListItem as RecipeTypes } from '../types/RecipeTypes';

const RecipeList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState<RecipeTypes[]>([]);
    const [loading, setLoading] = useState(false);


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
            );
            const data = await response.json();
            setRecipes(data.meals || []); 
        } catch (error) {
            console.error("Invalid search!", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Search for recipes</h1>
            
            <form onSubmit={handleSearch} style={{ marginBottom: '30px' }}>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Retrieving recipe..."
                    style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>
                    Search
                </button>
            </form>

            {loading && <p>Searching...</p>}

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '20px' 
            }}>
                {recipes.map((recipe) => (
                    <div key={recipe.idMeal} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                        <img 
                            src={recipe.strMealThumb} 
                            alt={recipe.strMeal} 
                            style={{ width: '100%', borderRadius: '4px' }} 
                        />
                        <h3 style={{ margin: '10px 0' }}>{recipe.strMeal}</h3>
                        <Link 
                            to={`/recipes/${recipe.idMeal}`}
                            style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
                        >
                            see more
                        </Link>
                    </div>
                ))}
            </div>

            {!loading && recipes.length === 0 && searchTerm && (
                <p>No recipes found for "{searchTerm}". Try something else!</p>
            )}
        </div>
    );
};

export default RecipeList;