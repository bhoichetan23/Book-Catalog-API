const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");

const protect = (req, res, next) => {
  try {
    let token;

    // 1️⃣ Try header first (Postman Bearer)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ If not in header, try cookie
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return errorResponse(res, "Not authorized, token missing", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return errorResponse(res, "Invalid token", 401);
    }
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, "Token has expired", 401);
    }
    return errorResponse(res, "Authentication failed", 401);
  }
};

module.exports = { protect };
