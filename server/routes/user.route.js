import {
  getUserProfile,
  login,
  register,
} from "../controllers/user.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(isAuthenticated, getUserProfile);

export default router;
