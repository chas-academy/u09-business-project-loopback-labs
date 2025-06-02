const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get all items
router.get('/', itemController.getItems);

// Save a new item
router.post('/', itemController.saveItem);

// Delete an item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
