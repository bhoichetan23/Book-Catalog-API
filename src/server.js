require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const server = async () => {
  try {
    await connectDB(); // DB FIRST
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION! Shutting down...", err);
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error("DB connection failed ", err);
    process.exit(1);
  }
};

server();
