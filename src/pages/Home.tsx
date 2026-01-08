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
            console.error(error);
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
                console.error(error);
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
            console.error(error);
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
            console.error(error);
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
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Search for recipes</h1>
            
            <form onSubmit={handleSearch} style={{ marginBottom: '25px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipes..."
                    style={{ padding: '12px', width: '100%', maxWidth: '400px', borderRadius: '8px', backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #444' }}
                />
                <button type="submit" style={{ padding: '12px 25px', borderRadius: '8px', border: 'none', backgroundColor: '#3498db', color: 'white', fontWeight: 'bold' }}>
                    Search
                </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                <select 
                    value={selectedCategory} 
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: '10px', backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #444', fontSize: '1rem' }}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
                    ))}
                </select>

                <select 
                    value={selectedArea} 
                    onChange={(e) => handleAreaChange(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: '10px', backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #444', fontSize: '1rem' }}
                >
                    <option value="">All Countries</option>
                    {areas.map((area) => (
                        <option key={area.strArea} value={area.strArea}>{area.strArea}</option>
                    ))}
                </select>
            </div>

            {loading && <p style={{ textAlign: 'center', color: '#3498db' }}>Loading...</p>}

            {!loading && recipes.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
                    {recipes.map((recipe) => (
                        <div key={recipe.idMeal} style={{ borderRadius: '15px', backgroundColor: '#1e1e1e', overflow: 'hidden', border: '1px solid #333' }}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%' }} />
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>{recipe.strMeal}</h3>
                                <Link to={`/recipes/${recipe.idMeal}`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold', border: '2px solid #3498db', padding: '8px 20px', borderRadius: '25px', display: 'inline-block' }}>
                                    View Recipe
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;