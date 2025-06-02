import { useState, useEffect } from 'react';
import { fetchItems, saveItem, deleteItem } from '../api/client';

function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    imageUrl: '',
    source: 'test'
  });

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveItem(newItem);
      const updatedItems = await fetchItems();
      setItems(updatedItems);
      setNewItem({ title: '', description: '', imageUrl: '', source: 'test' });
    } catch (error) {
      console.error('Error saving item:', error);
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
      <h2>Items</h2>
      
      <form onSubmit={handleSubmit} className="item-form">
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.imageUrl}
          onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
