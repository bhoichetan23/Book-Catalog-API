const express = require("express");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
