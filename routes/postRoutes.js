import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The post title
 *         content:
 *           type: string
 *           description: The post content
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the post was added
 *       example:
 *         id: "d5fE_asz"
 *         title: "The New Turing Omnibus"
 *         content: "An amazing book about computer science."
 *         createdAt: "2025-11-15T10:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 */

// 게시글 목록 페이지
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
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

// 게시글 상세 페이지   </head>http://localhost:3000/posts/1
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */
router.get("/posts/:id", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/post_detail/post_detail.html"));
});


// 게시글 수정 페이지
router.get("/posts/:id/edit", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/post/post_modify/post_modify.html"));
});

export default router;

