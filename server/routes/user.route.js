import { register } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.route("/register").post(register);

export default router;
