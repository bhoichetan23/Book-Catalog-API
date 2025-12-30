import mongoose from "mongoose";

export default mongoose.model(
  "Book",
  mongoose.Schema({
    title: String,
    author: String,
    description: String,
  })
);
