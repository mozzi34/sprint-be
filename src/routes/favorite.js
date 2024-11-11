import express from 'express';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import * as favoriteController from '../controllers/favoriteController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: 게시물 좋아요 관련 API
 */

/**
 * @swagger
 * /favorite/{articleCategory}/{articleId}:
 *   post:
 *     tags: [Favorite]
 *     summary: 게시글에 좋아요 누르기
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
 *     responses:
 *       201:
 *         description: 좋아요 완료
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.post(
  '/:articleCategory/:articleId',
  jwtMiddleware.verifyAccessToken,
  favoriteController.postFavorite
);

/**
 * @swagger
 * /favorite/{articleCategory}/{articleId}:
 *   delete:
 *     tags: [Favorite]
 *     summary: 게시글에 좋아요 취소하기
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
 *     responses:
 *       204:
 *         description: 좋아요 삭제 성공
 *       404:
 *         description: 게시물 찾을 수 없음
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.delete(
  '/:articleCategory/:articleId',
  jwtMiddleware.verifyAccessToken,
  favoriteController.deleteFavorite
);

export default router;
