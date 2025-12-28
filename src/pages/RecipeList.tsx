import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type MealListItem as RecipeTypes } from '../types/RecipeTypes';


const RecipeList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState<RecipeTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [areas, setAreas] = useState<{ strArea: string }[]>([]);
    const [selectedArea, setSelectedArea] = useState('');
    

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [catRes, areaRes] = await Promise.all([
                    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
                    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
                ]);
                const catData = await catRes.json();
                const areaData = await areaRes.json();
                
                setCategories(catData.meals || []);
                setAreas(areaData.meals || []);
            } catch (error) {
                console.error("Error fetching filter lists:", error);
            }
        };
        fetchFilters();
    }, []);

    const handleCategoryChange = async (category: string) => {
        setSelectedCategory(category);
        setSelectedArea('');
        setSearchTerm('');

        if (!category) return;

        setLoading(true);
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await res.json();
            setRecipes(data.meals || []);
        } catch (error) {
            console.error("Category filter error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAreaChange = async (area: string) => {
        setSelectedArea(area);
        setSelectedCategory('');
        setSearchTerm('');

        if (!area) return;

        setLoading(true);
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
            const data = await res.json();
            setRecipes(data.meals || []);
        } catch (error) {
            console.error("Area filter error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        
        setSelectedCategory(''); 
        setSelectedArea('');

        setLoading(true);
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
            );
            const data = await response.json();
            setRecipes(data.meals || []); 
        } catch (error) {
            console.error("Search error:", error);
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
                    placeholder="Search recipes..."
                    style={{ padding: '10px', width: '300px', borderRadius: '4px', backgroundColor: '#333', color: 'white', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>
                    Search
                </button>
            </form>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <select 
                    value={selectedCategory} 
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#333', color: 'white', border: '1px solid #555' }}
                >
                    <option value="">Filter by Category</option>
                    {categories.map((cat) => (
                        <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
                    ))}
                </select>

                <select 
                    value={selectedArea} 
                    onChange={(e) => handleAreaChange(e.target.value)}
                    style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#333', color: 'white', border: '1px solid #555' }}
                >
                    <option value="">Filter by Country</option>
                    {areas.map((area) => (
                        <option key={area.strArea} value={area.strArea}>{area.strArea}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Loading results...</p>}

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '20px' 
            }}>
                {recipes.map((recipe) => (
                    <div key={recipe.idMeal} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', borderRadius: '4px' }} />
                        <h3 style={{ margin: '10px 0' }}>{recipe.strMeal}</h3>
                        <Link to={`/recipes/${recipe.idMeal}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                            see more
                        </Link>
                    </div>
                ))}
            </div>

            {!loading && recipes.length === 0 && (searchTerm || selectedCategory || selectedArea) && (
                <p>No recipes found. Try a different search or filter!</p>
            )}
        </div>
    );
};

export default RecipeList;