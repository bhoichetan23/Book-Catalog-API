const express = require("express");
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { protect } = require("../middlewares/authMiddleware");
const {
  validateCreateBook,
  validateUpdateBook,
} = require("../middlewares/validationMiddleware");

// Public routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Protected routes (require authentication)
router.post("/", protect, validateCreateBook, createBook);
router.put("/:id", protect, validateUpdateBook, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
