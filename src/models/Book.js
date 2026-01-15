const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
