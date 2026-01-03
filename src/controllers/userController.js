const { successResponse, errorResponse } = require("../utils/responseHandler");
const authService = require("../services/userService");

const registerUser = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    console.log("New user registered:", {
      userId: result.user._id,
      email: result.user.email,
    });

    return successResponse(res, result, "User registered successfully", 201);
  } catch (error) {
    console.error("Registration error:", error);

    if (error.message.includes("already exists")) {
      return errorResponse(res, error.message, 400);
    }

    return errorResponse(res, "Registration failed");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    const token = result.token; // JWT token

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // dev me false
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: result.user._id,
        email: result.user.email,
      },
    });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: "Login failed" });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user._id);

    return successResponse(
      res,
      { user },
      "User profile retrieved successfully"
    );
  } catch (error) {
    console.error("Get profile error:", error);

    if (error.message === "User not found") {
      return errorResponse(res, error.message, 404);
    }

    return errorResponse(res, "Failed to get user profile");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
