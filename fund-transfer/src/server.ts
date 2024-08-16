// src/server.ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import transferRoute from "./routes/transfer";
import authRoute from "./routes/auth";

dotenv.config();

const app = express();
const PORT = (process.env.PORT as string) || 3000;

app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api", transferRoute);
app.use("/api", authRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
