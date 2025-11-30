import express from "express";
import authRouter from "./auth.js";
import postRouter from "./post.js";
import userRouter from "./user.js";

const router = express.Router();

/**
 * 라우터 통합 설정
 */

// 인증 관련 라우트 (/auth/*)
router.use("/auth", authRouter);

// 게시글 관련 라우트 (/posts/*)
router.use("/posts", postRouter);

// 사용자 관련 라우트 (/users/*)
router.use("/users", userRouter);

export default router;
