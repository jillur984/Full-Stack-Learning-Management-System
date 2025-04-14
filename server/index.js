import express from "express";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";

dotenv.config();

// call for database connected
connectDB();

const app = express();

// apis

app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
