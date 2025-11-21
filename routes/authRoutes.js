import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();



router.get("/auth/login", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/auth/login/login.html"));
});



router.get("/auth/signup", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/auth/signup/signup.html"));
});

export default router;
