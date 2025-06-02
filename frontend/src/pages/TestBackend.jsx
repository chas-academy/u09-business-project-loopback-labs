import { useState, useEffect } from 'react';
import { 
  fetchItems, 
  saveItem, 
  deleteItem
} from '../api/client';

function TestBackend() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    externalId: Date.now().toString(),
    title: 'Test Recipe',
    description: 'This is a test recipe',
    imageUrl: 'https://via.placeholder.com/300',
    source: 'test'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      setError(err.message);
      console.error('Backend Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testSaveItem = async () => {
    setLoading(true);
    setError(null);
    try {
      await saveItem(newItem);
      fetchBackendData();
    } catch (err) {
      setError(err.message);
      console.error('Save Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testDeleteItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteItem(id);
      fetchBackendData();
    } catch (err) {
      setError(err.message);
      console.error('Delete Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-backend">
      <h2>Testing Backend and MongoDB</h2>

      <div className="test-actions">
        <button onClick={fetchBackendData} disabled={loading}>
          {loading ? 'Testing...' : 'Test Fetch'}
        </button>
        <button onClick={testSaveItem} disabled={loading}>
          {loading ? 'Testing...' : 'Test Save'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="test-results">
        <h3>Current Items:</h3>
        <div className="items-list">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <button onClick={() => testDeleteItem(item._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestBackend;
