const API_URL = 'http://localhost:5001/api';

export const fetchItems = async () => {
  try {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const saveItem = async (item) => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to save item');
    }
    return response.json();
  } catch (error) {
    console.error('Error saving item:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
    return response.json();
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
