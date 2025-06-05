import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../api/client";
import "./RecipeDetail.css";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await getRecipeDetails(id);
        setRecipe({
          title: details.title,
          description: details.summary,
          imageUrl: details.image,
          instructions: details.instructions,
          ingredients: details.extendedIngredients.map((i) => i.name),
          time: details.readyInMinutes,
          servings: details.servings,
        });
      } catch (err) {
        setError("Failed to fetch recipe details");
        console.error("Error fetching recipe details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  // Function to sanitize and render HTML content
  const renderHTML = (html) => {
    if (!html) return null;
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  if (loading) {
    return <div className="loading">Loading recipe details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!recipe) {
    return <div>No recipe selected</div>;
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-container">
        <div className="recipe-header">
          <h2>{recipe.title}</h2>
          <div className="recipe-meta">
            <p>Time: {recipe.time} minutes</p>
            <p>Servings: {recipe.servings}</p>
          </div>
        </div>
        <div className="recipe-content">
          <div className="recipe-image">
            <img src={recipe.imageUrl} alt={recipe.title} />
          </div>
          <div className="recipe-info">
            <div className="recipe-description">
              <h3>Description</h3>
              <p>{renderHTML(recipe.description)}</p>
            </div>
            <div className="recipe-ingredients">
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="recipe-instructions">
              <h3>Instructions</h3>
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
