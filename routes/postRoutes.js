import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();

// 게시글 목록 페이지
router.get("/posts", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/postList/postList.html"));
});




///  게시글 작성 페이지
router.get("/posts/write", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/post_create/post_create.html"));
});

// 게시글 상세 페이지   </head>http://localhost:3000/posts/1
router.get("/posts/:id", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/post_detail/post_detail.html"));
});


// 게시글 수정 페이지
router.get("/posts/:id/edit", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/post_modify/post_modify.html"));
});

export default router;

