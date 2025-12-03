import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();

/**
 * 웹사이트 온보딩 페이지
 */
router.get("/onboarding", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/onboarding/onboarding.html"));
});

export default router;


