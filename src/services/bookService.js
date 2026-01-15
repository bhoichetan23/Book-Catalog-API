const Book = require("../models/Book");

// Create a new book
const createBook = async (bookData) => {
  const { title, author, genre, price, inStock } = bookData;

  // Check if book with same title and author already exists
  const existingBook = await Book.findOne({ title, author });
  if (existingBook) {
    throw new Error("Book with this title and author already exists");
  }

  // Create book
  const book = await Book.create({
    title,
    author,
    genre,
    price,
    inStock,
  });
  return book;
};

// Get all books
const getAllBooks = async () => {
  const books = await Book.find().sort("-createdAt");

  return books;
};

// Get book by ID
const getBookById = async (bookId) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

// Update a book
const updateBook = async (bookId, updateData) => {
  // Find the book
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  // Update book
  const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedBook;
};

// Delete a book
const deleteBook = async (bookId) => {
  // Find the book
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  // Delete book
  await Book.findByIdAndDelete(bookId);

  return { success: true };
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
