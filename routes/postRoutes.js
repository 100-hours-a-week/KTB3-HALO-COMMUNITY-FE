import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();


router.get("/posts", (req, res) => {
  // This route currently serves an HTML page.
  // For an API, you would fetch data from a database and return JSON.
  // Example:
  // const posts = db.getPosts();
  // res.json(posts);
  res.sendFile(path.join(rootDir, "public/pages/post/postList/postList.html"));
});





///  게시글 작성 페이지
router.get("/posts/write", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/post_create/post_create.html"));
});

router.get("/posts/:id", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/post_detail/post_detail.html"));
});

// 게시글 수정 페이지
router.get("/posts/:id/edit", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/post_modify/post_modify.html"));
});

export default router;

