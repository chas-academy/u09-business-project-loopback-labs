const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: String,
    source: {
      type: String,
      required: true,
    },
    recipeId: String,
    instructions: String,
    ingredients: [String],
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Recipe', recipeSchema);
