import { useState, useEffect } from 'react';
import { 
  fetchItems, 
  saveItem, 
  deleteItem,
  searchRecipes,
  getRecipeDetails
} from '../api/client';

function Items() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchRecipes(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      const details = await getRecipeDetails(recipe.id);
      await saveItem({
        title: details.title,
        description: details.summary,
        imageUrl: details.image,
        source: 'spoonacular',
        recipeId: details.id,
        instructions: details.instructions,
        ingredients: details.extendedIngredients
      });
      const updatedItems = await fetchItems();
      setItems(updatedItems);
      setSearchResults([]);
      setSearchQuery('');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      const updatedItems = await fetchItems();
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="items-page">
      <h2>My Recipes</h2>
      
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results</h3>
            {searchResults.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <h4>{recipe.title}</h4>
                <button onClick={() => handleSaveRecipe(recipe)}>Save Recipe</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="saved-recipes">
        <h3>My Saved Recipes</h3>
        {items.map((item) => (
          <div key={item._id} className="recipe-card">
            <img src={item.imageUrl} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
