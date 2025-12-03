import express from "express";
import authRouter from "./authRoutes.js";
import postRouter from "./postRoutes.js";
import userRouter from "./userRoutes.js";
import onboardingRouter from "./onboardingRoutes.js";

const router = express.Router();

/**
 * 라우터 통합 설정
 */

// 온보딩 페이지 라우트 (/onboarding) - 가장 먼저 체크
router.use("/", onboardingRouter);

// 인증 관련 라우트 (/auth/*)
router.use("/auth", authRouter);

// 게시글 관련 라우트 - 직접 경로 사용
router.use("/", postRouter);

// 사용자 관련 라우트 (/users/*)
router.use("/users", userRouter);

export default router;
