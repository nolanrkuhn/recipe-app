const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.SPOONACULAR_API_KEY;

// Route to fetch recipes
app.get('/recipes', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: { query, apiKey: API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipes' });
    }
});

// Route to fetch recipe details
app.get('/recipe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: { apiKey: API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipe details' });
    }
});

app.listen(5050, () => console.log('Server running on port 5050'));
