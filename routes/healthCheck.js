import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";
import { ok } from "assert";

const router = express.Router();



router.get("/health", (req, res) => {
  res.status(200).json({ message: "ok" });
});