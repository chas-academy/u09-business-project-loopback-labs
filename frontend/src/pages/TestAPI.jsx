import { useState, useEffect } from 'react';
import { searchRecipes } from '../api/client';

function TestAPI() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchRecipes('pizza');
      setRecipes(results);
      console.log('Recipes:', results);
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <div className="test-api">
      <h2>Testing API</h2>
      <button onClick={testAPI} disabled={loading}>
        {loading ? 'Testing...' : 'Test API'}
      </button>
      
      {error && <div className="error">{error}</div>}

      <div className="results">
        <h3>Results:</h3>
        <pre>{JSON.stringify(recipes, null, 2)}</pre>
      </div>
    </div>
  );
}

export default TestAPI;
