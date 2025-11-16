import express from "express";
import path from "path";
import { rootDir } from "../utils/path.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User's unique ID
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         username:
 *           type: string
 *           description: User's username
 *         avatarUrl:
 *           type: string
 *           format: uri
 *           description: URL to user's avatar image
 *       example:
 *         id: "user123"
 *         email: "user@example.com"
 *         username: "testuser"
 *         avatarUrl: "http://example.com/avatar.jpg"
 *     UserProfileUpdate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: New username
 *         avatarUrl:
 *           type: string
 *           format: uri
 *           description: New URL to user's avatar image
 *       example:
 *         username: "updateduser"
 *         avatarUrl: "http://example.com/new_avatar.jpg"
 *     PasswordChangeRequest:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           format: password
 *           description: User's current password
 *         newPassword:
 *           type: string
 *           format: password
 *           description: User's new password
 *       example:
 *         currentPassword: "oldpassword123"
 *         newPassword: "newstrongpassword"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and account management
 */

// 회원정보 수정 페이지
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized - User not logged in
 *   put:
 *     summary: Update current user's profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfileUpdate'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       401:
 *         description: Unauthorized - User not logged in
 */
router.get("/account", (req, res) => {
  res.sendFile(path.join(rootDir, "public/pages/user/account/account.html"));
});


/**
 * @swagger
 * /users/me/password:
 *   put:
 *     summary: Change current user's password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordChangeRequest'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad Request - Invalid input or current password mismatch
 *       401:
 *         description: Unauthorized - User not logged in
 */
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