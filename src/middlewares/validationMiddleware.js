const { errorResponse } = require("../utils/responseHandler");

// Validation rules for registration
const validateRegister = [
  (req, res, next) => {
    const { username, email, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    // Username validation
    if (username.length < 3 || username.length > 30) {
      return errorResponse(res, "Username must be 3-30 characters", 400);
    }

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
      return errorResponse(res, "Please provide a valid email", 400);
    }

    // Password validation
    if (password.length < 6) {
      return errorResponse(res, "Password must be at least 6 characters", 400);
    }

    next();
  },
];

// Validation rules for login
const validateLogin = [
  (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email and password are required", 400);
    }

    next();
  },
];

// Validation rules for creating a book
const validateCreateBook = [
  (req, res, next) => {
    const { title, author, genre, publicationYear, ISBN } = req.body;

    // Check required fields
    if (!title || !author || !genre || !publicationYear || !ISBN) {
      return errorResponse(res, "All required fields must be filled", 400);
    }

    // Title validation
    if (title.length < 1 || title.length > 200) {
      return errorResponse(res, "Title must be 1-200 characters", 400);
    }

    // Author validation
    if (author.length < 2 || author.length > 100) {
      return errorResponse(res, "Author name must be 2-100 characters", 400);
    }

    // Genre validation
    const validGenres = [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Fantasy",
      "Mystery",
      "Thriller",
      "Romance",
      "Biography",
      "History",
      "Self-Help",
      "Poetry",
      "Drama",
      "Other",
    ];

    if (!validGenres.includes(genre)) {
      return errorResponse(res, "Please select a valid genre", 400);
    }

    // Publication year validation
    const currentYear = new Date().getFullYear();
    if (publicationYear < 1000 || publicationYear > currentYear) {
      return errorResponse(
        res,
        `Publication year must be between 1000 and ${currentYear}`,
        400
      );
    }

    // ISBN validation
    if (ISBN.length < 10 || ISBN.length > 17) {
      return errorResponse(res, "ISBN must be 10-17 characters", 400);
    }

    // Description validation (optional)
    if (req.body.description && req.body.description.length > 1000) {
      return errorResponse(
        res,
        "Description cannot exceed 1000 characters",
        400
      );
    }

    next();
  },
];

// Validation rules for updating a book
const validateUpdateBook = [
  (req, res, next) => {
    const { title, author, genre, publicationYear, ISBN, description } =
      req.body;

    // Check if at least one field is provided
    if (
      !title &&
      !author &&
      !genre &&
      !publicationYear &&
      !ISBN &&
      !description
    ) {
      return errorResponse(
        res,
        "At least one field must be provided for update",
        400
      );
    }

    // Validate title if provided
    if (title && (title.length < 1 || title.length > 200)) {
      return errorResponse(res, "Title must be 1-200 characters", 400);
    }

    // Validate author if provided
    if (author && (author.length < 2 || author.length > 100)) {
      return errorResponse(res, "Author name must be 2-100 characters", 400);
    }

    // Validate genre if provided
    if (genre) {
      const validGenres = [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Thriller",
        "Romance",
        "Biography",
        "History",
        "Self-Help",
        "Poetry",
        "Drama",
        "Other",
      ];

      if (!validGenres.includes(genre)) {
        return errorResponse(res, "Please select a valid genre", 400);
      }
    }

    // Validate publication year if provided
    if (publicationYear) {
      const currentYear = new Date().getFullYear();
      if (publicationYear < 1000 || publicationYear > currentYear) {
        return errorResponse(
          res,
          `Publication year must be between 1000 and ${currentYear}`,
          400
        );
      }
    }

    // Validate ISBN if provided
    if (ISBN && (ISBN.length < 10 || ISBN.length > 17)) {
      return errorResponse(res, "ISBN must be 10-17 characters", 400);
    }

    // Validate description if provided
    if (description && description.length > 1000) {
      return errorResponse(
        res,
        "Description cannot exceed 1000 characters",
        400
      );
    }

    next();
  },
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateBook,
  validateUpdateBook,
};
