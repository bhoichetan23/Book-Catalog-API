const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      enum: [
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
      ],
    },
    publicationYear: {
      type: Number,
      required: true,
      min: 1000,
      max: new Date().getFullYear(),
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
