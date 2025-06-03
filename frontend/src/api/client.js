import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const RENDER_API_URL = import.meta.env.VITE_RENDER_API_URL || '';

// Use RENDER_API_URL in production if available
const BASE_API_URL = RENDER_API_URL ? RENDER_API_URL : API_URL;
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';

// Backend API
export const fetchItems = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const saveItem = async (item) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/api/items`, item);
    return response.data;
  } catch (error) {
    console.error('Error saving item:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${BASE_API_URL}/api/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// Spoonacular API
export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/recipes/complexSearch`, {
      params: {
        query,
        apiKey: SPOONACULAR_API_KEY,
        number: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/recipes/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting recipe details:', error);
    throw error;
  }
};
