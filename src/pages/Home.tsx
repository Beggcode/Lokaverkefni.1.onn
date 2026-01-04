import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { type MealListItem as RecipeTypes } from '../types/RecipeTypes';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState<RecipeTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [areas, setAreas] = useState<{ strArea: string }[]>([]);
    const [selectedArea, setSelectedArea] = useState('');
    
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const fetchDefaultRecipes = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            const data = await res.json();
            setRecipes(data.meals || []);
        } catch (error) {
            console.error("Error fetching default recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initializeHomeData = async () => {
            setLoading(true);
            try {
                const [catRes, areaRes, initialRecipesRes] = await Promise.all([
                    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
                    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
                    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
                ]);

                const catData = await catRes.json();
                const areaData = await areaRes.json();
                const recipeData = await initialRecipesRes.json();

                setCategories(catData.meals || []);
                setAreas(areaData.meals || []);
                setRecipes(recipeData.meals || []);
            } catch (error) {
                console.error("Error initializing home data:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeHomeData();
    }, []);

    const handleCategoryChange = async (category: string) => {
        setSelectedCategory(category);
        setSelectedArea('');
        setSearchTerm('');

        if (!category) {
            fetchDefaultRecipes();
            return;
        }

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

        if (!area) {
            fetchDefaultRecipes();
            return;
        }

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
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            const data = await response.json();
            setRecipes(data.meals || []); 
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
            <h1 style={{ textAlign: 'center', color: '#fff' }}>Search for recipes</h1>
            
            <form onSubmit={handleSearch} style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipes..."
                    style={{ padding: '10px', width: '300px', borderRadius: '4px', backgroundColor: '#333', color: 'white', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#444', color: 'white' }}>
                    Search
                </button>
            </form>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
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

            {loading && <p style={{ textAlign: 'center', margin: '40px', color: '#888' }}>Loading results...</p>}

            {!loading && recipes.length > 0 && (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                    gap: '20px' 
                }}>
                    {recipes.map((recipe) => (
                        <div 
                            key={recipe.idMeal} 
                            style={{ 
                                border: '1px solid #444', 
                                borderRadius: '12px', 
                                padding: '15px', 
                                textAlign: 'center',
                                backgroundColor: '#1e1e1e',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', borderRadius: '8px' }} />
                            <h3 style={{ margin: '15px 0', fontSize: '1.2rem', color: '#fff' }}>{recipe.strMeal}</h3>
                            <Link 
                                to={`/recipes/${recipe.idMeal}`} 
                                style={{ 
                                    textDecoration: 'none', 
                                    color: '#3498db', 
                                    fontWeight: 'bold',
                                    border: '1px solid #3498db',
                                    padding: '5px 15px',
                                    borderRadius: '20px',
                                    display: 'inline-block'
                                }}
                            >
                                see more
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {!loading && recipes.length === 0 && (searchTerm || selectedCategory || selectedArea) && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                    <p style={{ fontSize: '1.2rem' }}>No recipes found. Try a different search!</p>
                </div>
            )}
        </div>
    );
};

export default Home;