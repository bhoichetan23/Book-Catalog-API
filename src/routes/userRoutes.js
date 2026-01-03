const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validationMiddleware");

// Public routes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

// Protected routes
router.get("/me", protect, getMe);

module.exports = router;
