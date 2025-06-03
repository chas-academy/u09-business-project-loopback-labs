import { useState, useEffect } from "react";
import {
  fetchRecipes,
  saveRecipe,
  deleteRecipe,
  searchRecipes,
  getRecipeDetails,
} from "../api/client";
import "./Recipes.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Failed to fetch recipes");
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await searchRecipes(searchQuery);
      setSearchResults(results);
      setError(null);
    } catch (err) {
      setError("Failed to search recipes");
      console.error("Error searching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    setLoading(true);
    setError(null);
    try {
      const details = await getRecipeDetails(recipe.id);
      await saveRecipe({
        externalId: `spoonacular_${recipe.id}`,
        title: details.title,
        description: details.summary,
        imageUrl: details.image,
        source: "spoonacular",
        recipeId: details.id,
        instructions: details.instructions,
        ingredients: details.extendedIngredients.map((i) => i.name),
      });

      const data = await fetchRecipes();
      setRecipes(data);
      setSearchResults([]);
      setSearchQuery("");
      setSuccessMessage("Recipe saved successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError("Failed to save recipe");
      console.error("Error saving recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await deleteRecipe(id);
      const data = await fetchRecipes();
      setRecipes(data);
      setSuccessMessage("Recipe deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError("Failed to delete recipe");
      console.error("Error deleting recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipes-page">
      <h2>My Recipes</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !searchQuery.trim()}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results</h3>
            <div className="recipe-grid">
              {searchResults.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-image"
                  />
                  <h4>{recipe.title}</h4>
                  <p className="recipe-summary">
                    {recipe.summary || "No summary available"}
                  </p>
                  <button
                    onClick={() => handleSaveRecipe(recipe)}
                    disabled={loading}
                    className="save-button"
                  >
                    {loading ? "Saving..." : "Save Recipe"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="saved-recipes">
        <h3>My Saved Recipes</h3>
        {recipes.length === 0 ? (
          <p>No recipes saved yet. Try searching for some recipes!</p>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="recipe-card">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="recipe-image"
                />
                <h4>{recipe.title}</h4>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-details">
                  <p>Source: {recipe.source}</p>
                  <p>
                    Ingredients:{" "}
                    {recipe.ingredients?.join(", ") ||
                      "No ingredients available"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  disabled={loading}
                  className="delete-button"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
