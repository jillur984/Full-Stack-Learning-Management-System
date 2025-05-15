import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import dotenv from "dotenv";

dotenv.config();

// call for database connected
connectDB();

const app = express();

// default middleware

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// apis

app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

app.get("/api/v1/test", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "You are success Bhai",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
