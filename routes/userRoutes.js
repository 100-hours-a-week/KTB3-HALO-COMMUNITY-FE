import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();

// 프로필 페이지
router.get("/account", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/user/account/account.html"));
});

// 비밀번호 변경 페이지
router.get("/password", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/user/password/password.html"));
});

export default router;