import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import validateCommentMiddleware from '../middlewares/validate/validateCommentMiddleware.js';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: 댓글 관련 API
 */

/**
 * @swagger
 * /comment/{articleCategory}/{articleId}:
 *   get:
 *     tags: [Comment]
 *     summary:  특정 게시물 댓글 목록 가져오기
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: articleCategory
 *         in: query
 *         required: true
 *         description: 게시물 카테고리
 *         schema:
 *           type: string
 *           enum: [freeboard, fleamarket]
 *           default: freeboard
 *       - name: articleId
 *         in: query
 *         required: true
 *         description: 게시물 아이디
 *         schema:
 *           type: integer
 *       - name: cursor
 *         in: query
 *         required: false
 *         description: 커서
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: 페이지당 게시글 수
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시물 목록 조회
 *
 */
router.get(
  '/:articleCategory/:articleId',
  jwtMiddleware.verifyAccessToken,
  commentController.getComments
);

/**
 * @swagger
 * /comment/{articleCategory}/{articleId}:
 *   post:
 *     tags: [Comment]
 *     summary:  특정 게시물 댓글 달기
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: articleCategory
 *         in: query
 *         required: true
 *         description: 게시물 카테고리
 *         schema:
 *           type: string
 *           enum: [freeboard, fleamarket]
 *           default: freeboard
 *       - name: articleId
 *         in: query
 *         required: true
 *         description: 게시물 아이디
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 댓글 작성 성공
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.post(
  '/:articleCategory/:articleId',
  jwtMiddleware.verifyAccessToken,
  validateCommentMiddleware,
  commentController.postComment
);

/**
 * @swagger
 * /comment/{id}:
 *   patch:
 *     tags: [Comment]
 *     summary:  댓글 수정
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: 댓글 아이디
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 댓글 수정 성공
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.patch(
  '/:id',
  jwtMiddleware.verifyAccessToken,
  jwtMiddleware.verifyCommentAuth,
  validateCommentMiddleware,
  commentController.editComment
);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     tags: [Comment]
 *     summary:  댓글 삭제
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: 댓글 아이디
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 댓글 삭제 성공
 *       404:
 *         description: 게시물 찾을 수 없음
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.delete(
  '/:id',
  jwtMiddleware.verifyAccessToken,
  jwtMiddleware.verifyCommentAuth,
  commentController.deleteComment
);

export default router;
