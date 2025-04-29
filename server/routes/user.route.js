import {
  getUserProfile,
  login,
  Logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(Logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;
