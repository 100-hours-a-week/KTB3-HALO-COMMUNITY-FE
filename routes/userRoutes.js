import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();


router.get("/account", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/user/account/account.html"));
});


router.get("/password", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/user/password/password.html"));
});




// 회원정보 수정 페이지

router.get("/account", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/user/account/account.html"));
});



router.get("/password", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/user/password/password.html"));
});



export default router;