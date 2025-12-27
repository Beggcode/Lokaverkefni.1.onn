import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type MealListItem as RecipeTypes } from '../types/RecipeTypes';

const RecipeList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState<RecipeTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
            const data = await res.json();
            setCategories(data.meals || []);
        };
        fetchCategories();
    }, []);


    const handleCategoryChange = async (category: string) => {
        setSelectedCategory(category);
        setSearchTerm(''); 

        if (!category) {
            setRecipes([]);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await res.json();
            setRecipes(data.meals || []);
        } catch (error) {
            console.error("Filter error:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        setSelectedCategory(''); 

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
            
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Retrieving recipe..."
                    style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#333', color: 'white' }}
                />
                <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>
                    Search
                </button>
            </form>

            <div style={{ marginBottom: '30px' }}>
                <select 
                    value={selectedCategory} 
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={{ 
                        padding: '10px', 
                        borderRadius: '4px', 
                        backgroundColor: '#333', 
                        color: 'white',
                        border: '1px solid #555',
                        cursor: 'pointer'
                    }}
                >
                    <option value="">Filter by Category</option>
                    {categories.map((cat) => (
                        <option key={cat.strCategory} value={cat.strCategory}>
                            {cat.strCategory}
                        </option>
                    ))}
                </select>
            </div>

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

            {!loading && recipes.length === 0 && (searchTerm || selectedCategory) && (
                <p>No recipes found. Try something else!</p>
            )}
        </div>
    );
};

export default RecipeList;