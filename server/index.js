import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";

dotenv.config();

// call for database connected
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
