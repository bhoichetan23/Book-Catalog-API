const Book = require("../models/Book");

// Create a new book
const createBook = async (bookData, userId) => {
  const { title, author, genre, publicationYear, ISBN, description } = bookData;

  // Check if ISBN already exists
  const existingBook = await Book.findOne({ ISBN });
  if (existingBook) {
    throw new Error("Book with this ISBN already exists");
  }

  // Create book
  const book = await Book.create({
    title,
    author,
    genre,
    publicationYear,
    ISBN,
    description: description || "",
    createdBy: userId,
  });

  // Populate createdBy field
  await book.populate("createdBy", "name email");

  return book;
};

// Get all books
const getAllBooks = async () => {
  const books = await Book.find()
    .populate("createdBy", "name email")
    .sort("-createdAt");

  return books;
};

// Get book by ID
const getBookById = async (bookId) => {
  const book = await Book.findById(bookId).populate("createdBy", "name email");

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

// Update a book
const updateBook = async (bookId, updateData, userId) => {
  // Find the book
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  // Check if user is the creator
  if (book.createdBy.toString() !== userId.toString()) {
    throw new Error("Not authorized to update this book");
  }

  // Check if ISBN is being updated and if it already exists
  if (updateData.ISBN && updateData.ISBN !== book.ISBN) {
    const existingBook = await Book.findOne({ ISBN: updateData.ISBN });
    if (existingBook) {
      throw new Error("Book with this ISBN already exists");
    }
  }

  // Update book
  const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
    new: true,
    runValidators: true,
  }).populate("createdBy", "name email");

  return updatedBook;
};

// Delete a book
const deleteBook = async (bookId, userId) => {
  // Find the book
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  // Check if user is the creator
  if (book.createdBy.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete this book");
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
