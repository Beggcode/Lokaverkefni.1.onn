import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { MealListItem as RecipeTypes } from '../types/RecipeTypes';

interface FullRecipe extends RecipeTypes {
    strInstructions: string;
    strArea: string;
    strCategory: string;
    strYoutube?: string;
    [key: string]: string | undefined;
}

const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<FullRecipe | null>(null);
    const [similarRecipes, setSimilarRecipes] = useState<RecipeTypes[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await res.json();
                const selectedRecipe = data.meals[0] as FullRecipe;
                setRecipe(selectedRecipe);

                const similarRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedRecipe.strCategory}`);
                const similarData = await similarRes.json();
                
                setSimilarRecipes(
                    (similarData.meals as RecipeTypes[])
                        .filter((m) => m.idMeal !== id)
                        .slice(0, 12)
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeDetail();
    }, [id]);

    if (loading) return 
    <p style={{ 
        textAlign: 'center', 
        marginTop: '50px', 
        color: '#3498db' 
        }}
    >
            
            Loading recipe...

    </p>;
    if (!recipe) return 
    <p style={{ 
        textAlign: 'center', 
        marginTop: '50px' 
        }}
    >
            
            Recipe not found.

    </p>;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    return (
        <div style={{ 
            padding: '20px', 
            maxWidth: '900px', 
            margin: '0 auto', 
            color: 'white' 
            }}
        >
            <header style={{ 
                textAlign: 'center', 
                marginBottom: '40px', 
                marginTop: '20px' 
                }}
            >
                <h1 style={{ 
                    fontSize: 'clamp(2.2rem, 8vw, 4rem)', 
                    fontWeight: '900', 
                    letterSpacing: '-1.5px',
                    lineHeight: '1',
                    marginBottom: '15px',
                    background: 'linear-gradient(to bottom, #ffffff, #bbbbbb)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textTransform: 'uppercase'
                    }}
                >
                    {recipe.strMeal}
                </h1>
                <div style={{ 
                    height: '1px', 
                    width: '120px', 
                    backgroundColor: '#3498db', 
                    margin: '0 auto 25px', 
                    }}
                >

                </div>
                <p style={{ 
                    fontSize: '1.1rem', 
                    color: '#888888ff', 
                    textTransform: 'uppercase', 
                    letterSpacing: '3px', 
                    fontWeight: '500' 
                    }}
                >
                    {recipe.strArea} • {recipe.strCategory}
                </p>
            </header>

            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ 
                width: '70%', 
                display: 'block',
                margin: '0 auto 40px auto',
                borderRadius: '25px',
                }} 
            />

            {recipe.strYoutube && (
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '40px' 
                    }}
                >
                    <a 
                        href={recipe.strYoutube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            backgroundColor: '#ff0000', 
                            color: 'white', 
                            textDecoration: 'none', 
                            padding: '12px 25px', 
                            borderRadius: '30px', 
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <span style={{ 
                            fontSize: '1.4rem' }}>▶</span> Watch on YouTube
                    </a>
                </div>
            )}

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
                gap: '20px', 
                marginBottom: '60px' 
            }}>
                <div style={{ 
                    backgroundColor: '#161616', 
                    padding: '30px', 
                    borderRadius: '20px', 
                    border: '1px solid #222',
                    height: 'fit-content'
                }}>
                    <h2 style={{ 
                        fontSize: '1.5rem', 
                        borderBottom: '2px solid #333',
                        display: 'inline-block', 
                        paddingBottom: '5px', 
                        marginBottom: '20px' 
                    }}>

                        Ingredients

                    </h2>
                    <ul style={{ 
                        paddingLeft: '20px', 
                        lineHeight: '2.2', 
                        listStyleType: 'circle',
                        margin: 0
                        }}
                    >
                        {ingredients.map((item, index) => (
                            <li key={index} style={{ color: '#ccc' }}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div style={{ 
                    backgroundColor: '#161616', 
                    padding: '30px', 
                    borderRadius: '20px', 
                    border: '1px solid #222',
                    height: 'fit-content'
                    }}
                >
                    <h2 style={{ 
                        fontSize: '1.5rem', 
                        borderBottom: '2px solid #333', 
                        display: 'inline-block',
                        paddingBottom: '5px', 
                        marginBottom: '20px' 
                        }}
                    >

                        Instructions

                    </h2>
                    <p style={{ 
                        lineHeight: '1.8', 
                        color: '#ddd', 
                        whiteSpace: 'pre-line',
                        margin: 0 
                        }}
                    >
                        {recipe.strInstructions}
                    </p>
                </div>
            </div>

            {similarRecipes.length > 0 && (
                <div style={{ 
                    marginTop: '80px', 
                    borderTop: '1px solid #333', 
                    paddingTop: '50px' 
                    }}
                >
                    <h2 style={{ 
                        textAlign: 'center', 
                        marginBottom: '40px', 
                        fontSize: '1.8rem' 
                        }}
                    >
                            
                            Similar recipes
                            
                    </h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', 
                        gap: '20px' 
                        }}
                    >
                        {similarRecipes.map((item) => (
                            <Link key={item.idMeal} to={`/recipes/${item.idMeal}`} 
                            style={{ 
                                textDecoration: 'none', 
                                color: 'inherit' 
                                }}
                            >
                                <div style={{ 
                                    borderRadius: '15px', 
                                    backgroundColor: '#1e1e1eff', 
                                    overflow: 'hidden', 
                                    border: '1px solid #333333ff', 
                                    height: '100%' 
                                    }}
                                >
                                    <img src={item.strMealThumb} alt={item.strMeal} style={{ 
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
                                            fontSize: '0.9rem', 
                                            margin: '0', 
                                            display: '-webkit-box', 
                                            WebkitLineClamp: 2, 
                                            WebkitBoxOrient: 'vertical', 
                                            overflow: 'hidden', 
                                            fontWeight: '600' 
                                            }}
                                        >{item.strMeal}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail;