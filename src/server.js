import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // DB must connect first
  app.listen(PORT, () => console.log("Server Running on " + PORT));
};

startServer();
