import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import type { StylesConfig } from 'react-select';
import type { MealListItem as RecipeTypes } from '../types/RecipeTypes';

interface SelectOption {
    value: string;
    label: string;
}

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState<RecipeTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [areas, setAreas] = useState<{ strArea: string }[]>([]);
    const [selectedArea, setSelectedArea] = useState('');
    
    const { pathname } = useLocation();

    const customStyles: StylesConfig<SelectOption, false> = {
        control: (base) => ({
            ...base,
            backgroundColor: '#1a1a1a',
            borderColor: '#444',
            minHeight: '45px',
            borderRadius: '10px',
            boxShadow: 'none',
            '&:hover': { borderColor: '#3498db' }
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#1a1a1a',
            border: '1px solid #444',
            zIndex: 9999
        }),
        option: (base, state) => ({
            ...base,
            padding: '12px',
            fontSize: '14px',
            backgroundColor: state.isSelected ? '#3498db' : state.isFocused ? '#333' : '#1a1a1a',
            color: 'white',
            cursor: 'pointer',
        }),
        singleValue: (base) => ({ ...base, color: 'white' }),
        input: (base) => ({ ...base, color: 'white' }),
        placeholder: (base) => ({ ...base, color: '#888' }),
    };

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
        <div style={{ 
            padding: '0 20px 20px 20px', 
            maxWidth: '1200px', 
            margin: '0 auto', 
            color: 'white' 
            }}
        >
            <h1 style={{ 
                textAlign: 'center', 
                margin: '30px 0', 
                fontSize: '1.8rem',
                WebkitTextStroke: '0.4px #36acfbff',
                }}
            >

                    Table for one, panic for everyone.
                    
            </h1>
            
            <form onSubmit={handleSearch} style={{ 
                marginBottom: '25px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px', 
                alignItems: 'center' 
                }}
            >
                <input 
                    type="text" 
                    inputMode="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Searching for recipe..."
                    style={{ 
                        padding: '14px', 
                        width: '100%', 
                        maxWidth: '400px', 
                        borderRadius: '10px', 
                        backgroundColor: '#141414', 
                        color: 'white', 
                        border: '1px solid #444', 
                        fontSize: '16px' 
                    }}
                />

                <button type="submit" style={{ 
                    padding: '14px', 
                    width: '100%', 
                    maxWidth: '400px', 
                    borderRadius: '10px', 
                    border: 'none', 
                    backgroundColor: '#3498db', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    cursor: 'pointer', 
                    fontSize: '16px' 
                    }}
                >

                    Search

                </button>

            </form>

            <div style={{ 
                position: 'sticky', 
                top: '0px',
                zIndex: 1000, 
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '20px 0',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(18, 18, 18, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
                }}
            >
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '10px',
                    width: '100%',
                    maxWidth: '400px',
                    padding: '0 20px'
                    }}
                >
                    <Select<SelectOption, false>
                        options={[
                            { value: '', label: 'Categories' },
                            ...categories.map(cat => ({ value: cat.strCategory, label: cat.strCategory }))
                        ]}
                        value={selectedCategory ? { 
                            value: selectedCategory, 
                            label: selectedCategory } 
                            : 
                            { value: '', label: 'Categories' }}
                        onChange={(newValue) => handleCategoryChange(newValue?.value || '')}
                        styles={customStyles}
                        isSearchable={false}
                    />

                    <Select<SelectOption, false>
                        options={[
                            { value: '', label: 'Country' },
                            ...areas.map(area => ({ value: area.strArea, label: area.strArea }))
                        ]}
                        value={selectedArea ? { 
                            value: selectedArea, label: selectedArea } 
                            :
                            { value: '', label: 'Country' }}
                        onChange={(newValue) => handleAreaChange(newValue?.value || '')}
                        styles={customStyles}
                        isSearchable={false}
                    />

                </div>
                
                {!loading && (
                    <p style={{ 
                        fontSize: '0.75rem', 
                        color: '#888', 
                        textAlign: 'center', 
                        margin: '8px 0 0 0', 
                        fontWeight: '500' 
                        }}
                    >
                        Showing {recipes.length} recipes
                        {selectedCategory && ` in ${selectedCategory}`}
                        {selectedArea && ` from ${selectedArea}`}
                    </p>
                )}

            </div>

            {loading && <p style={{ 
                textAlign: 'center', 
                color: '#3498db', 
                marginTop: '40px' }}>Loading...
                        </p>}

            {!loading && recipes.length > 0 && (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
                    gap: '15px', 
                    marginTop: '10px' 
                    }}
                >

                    {recipes.map((recipe) => (
                        <Link key={recipe.idMeal} to={`/recipes/${recipe.idMeal}`} style={{ 
                            textDecoration: 'none', 
                            color: 'inherit' 
                            }}
                        >
                            <div style={{ 
                                borderRadius: '15px', 
                                backgroundColor: '#1e1e1e', 
                                overflow: 'hidden', 
                                border: '1px solid #333', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                height: '100%' 
                                }}
                            >
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ 
                                    width: '100%', 
                                    aspectRatio: '1/1', 
                                    objectFit: 'cover' 
                                    }} 
                                />
                                <div style={{ 
                                    padding: '12px', 
                                    textAlign: 'center' 
                                    }}
                                >
                                    <h3 style={{ 
                                        margin: '0', 
                                        fontSize: '0.9rem', 
                                        fontWeight: '500', 
                                        display: '-webkit-box', 
                                        WebkitLineClamp: 2, 
                                        WebkitBoxOrient: 'vertical', 
                                        overflow: 'hidden', 
                                        lineHeight: '1.3' }}>{recipe.strMeal}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;