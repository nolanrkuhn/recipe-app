import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const RecipeSearch = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const searchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/recipes', {
                params: { query }
            });
            setRecipes(response.data.results);
        } catch (error) {
            console.error('Error fetching recipes', error);
        }
    };

    return (
        <div>
            <h1>Recipe Search</h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for a recipe..." 
            />
            <button onClick={searchRecipes}>Search</button>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const RecipeDetails = ({ id }) => {
    return <h2>Recipe Details for ID: {id}</h2>;
};

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <Routes>
                <Route path="/" element={<RecipeSearch />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
