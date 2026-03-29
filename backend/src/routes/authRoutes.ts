import express from "express";
import { googleLogin, login, register } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);

export default router;