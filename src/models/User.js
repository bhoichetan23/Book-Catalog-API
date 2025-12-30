import mongoose from "mongoose";

export default mongoose.model(
  "User",
  mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
  })
);
