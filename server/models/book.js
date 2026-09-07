const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

module.exports = model('Book', BookSchema);