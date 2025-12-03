import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();



router.get("/login", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/auth/login/login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/auth/signup/signup.html"));
});

export default router;
