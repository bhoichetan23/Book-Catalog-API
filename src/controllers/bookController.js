const { successResponse, errorResponse } = require("../utils/responseHandler");
const bookService = require("../services/bookService");

// Create a new book
const createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body, req.user._id);

    console.log("New book created:", {
      bookId: book._id,
      title: book.title,
      createdBy: req.user._id,
    });

    return successResponse(res, book, "Book created successfully", 201);
  } catch (error) {
    console.error("Create book error:", error);

    if (error.message.includes("already exists")) {
      return errorResponse(res, error.message, 400);
    }

    return errorResponse(res, "Failed to create book");
  }
};

// View all books
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();

    console.log("Books retrieved:", { count: books.length });

    return successResponse(res, books, "Books retrieved successfully");
  } catch (error) {
    console.error("Get all books error:", error);
    return errorResponse(res, "Failed to retrieve books");
  }
};

// View book by ID
const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    console.log("Book retrieved:", { bookId: book._id });

    return successResponse(res, book, "Book retrieved successfully");
  } catch (error) {
    console.error("Get book by ID error:", error);

    if (error.message === "Book not found") {
      return errorResponse(res, error.message, 404);
    }

    return errorResponse(res, "Failed to retrieve book");
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const book = await bookService.updateBook(
      req.params.id,
      req.body,
      req.user._id
    );

    console.log("Book updated:", { bookId: book._id, updatedBy: req.user._id });

    return successResponse(res, book, "Book updated successfully");
  } catch (error) {
    console.error("Update book error:", error);

    if (error.message === "Book not found") {
      return errorResponse(res, error.message, 404);
    }

    if (
      error.message.includes("Not authorized") ||
      error.message.includes("already exists")
    ) {
      return errorResponse(res, error.message, 400);
    }

    return errorResponse(res, "Failed to update book");
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id, req.user._id);

    console.log("Book deleted:", {
      bookId: req.params.id,
      deletedBy: req.user._id,
    });

    return successResponse(res, null, "Book deleted successfully");
  } catch (error) {
    console.error("Delete book error:", error);

    if (error.message === "Book not found") {
      return errorResponse(res, error.message, 404);
    }

    if (error.message.includes("Not authorized")) {
      return errorResponse(res, error.message, 403);
    }

    return errorResponse(res, "Failed to delete book");
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
