const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Register a new user
const registerUser = async (userData) => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("User with this email or username already exists");
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
  });

  // Generate token
  const token = generateToken(user._id);

  // Prepare user data (exclude password)
  const userResponse = {
    _id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };

  return {
    user: userResponse,
    token,
  };
};

// Login user
const loginUser = async (email, password) => {
  // Check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check password
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate token
  const token = generateToken(user._id);

  // Prepare user data (exclude password)
  const userResponse = {
    _id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };

  return {
    user: userResponse,
    token,
  };
};

// Get user by ID
const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
