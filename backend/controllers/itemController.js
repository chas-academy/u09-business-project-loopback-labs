const Item = require('../models/Item');

// Get all saved items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save a new item
exports.saveItem = async (req, res) => {
  const { externalId, title, description, imageUrl, source } = req.body;

  try {
    const item = new Item({
      externalId,
      title,
      description,
      imageUrl,
      source
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
