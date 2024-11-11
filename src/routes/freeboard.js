import express from 'express';
import * as freeBoardController from '../controllers/freeBoardController.js';
import validateFreeBoardMiddleware from '../middlewares/validate/validateFreeBoardMiddleware.js';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FreeBoard
 *   description: 자유게시판 관련 API
 */

/**
 * @swagger
 * /freeboard:
 *   get:
 *     tags: [FreeBoard]
 *     summary: 자유게시판 게시글 목록 가져오기
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: 페이지당 게시글 수
 *         schema:
 *           type: integer
 *       - name: keyword
 *         in: query
 *         required: false
 *         description: 키워드
 *         schema:
 *           type: string
 *       - name: sort
 *         in: query
 *         required: false
 *         description: 정렬순
 *         schema:
 *           type: string
 *           enum: [recent, favorite]
 *           default: recent
 *     responses:
 *       200:
 *         description: 게시물 목록 조회
 *
 */
router.get('/', freeBoardController.getFreeBoard);

/**
 * @swagger
 * /freeboard/{id}:
 *   get:
 *     tags: [FreeBoard]
 *     summary: 특정 게시물 정보 가져오기
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 게시물 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 특정 게시물 상세 정보 반환
 *       404:
 *         description: 특정 게시물 찾을 수 없음
 */

router.get(
  '/:id',
  jwtMiddleware.verifyAccessToken,
  freeBoardController.getFreeBoardDetail
);

/**
 * @swagger
 * /freeboard/post:
 *   post:
 *     tags: [FreeBoard]
 *     summary: 자유게시판에 게시물 작성
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 게시물 제목
 *               content:
 *                 type: string
 *                 description: 게시물 내용
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 게시물 이미지 (최대 3개)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 게시물 태그 (쉼표로 구분된 문자열)
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: 게시물 작성 성공
 *       401:
 *         description: 유효하지 않은 토큰
 */

router.post(
  '/post',
  upload.array('images', 3),
  jwtMiddleware.verifyAccessToken,
  validateFreeBoardMiddleware,
  freeBoardController.postFreeBoard
);

/**
 * @swagger
 * /freeboard/{id}:
 *   patch:
 *     tags: [FreeBoard]
 *     summary: 특정 게시물 수정
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 수정할 게시물 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 게시물 제목
 *               content:
 *                 type: string
 *                 description: 게시물 내용
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 게시물 태그 (쉼표로 구분된 문자열)
 *     responses:
 *       200:
 *         description: 게시물 수정 성공
 *       404:
 *         description: 게시물 찾을 수 없음
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.patch(
  '/:id',
  upload.array('images', 3),
  jwtMiddleware.verifyAccessToken,
  jwtMiddleware.verifyFreeBoardAuth,
  validateFreeBoardMiddleware,
  freeBoardController.editFreeBoard
);

/**
 * @swagger
 * /freeboard/{id}:
 *   delete:
 *     tags: [FreeBoard]
 *     summary: 특정 게시물 삭제
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 삭제할 게시물 ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 게시물 삭제 성공
 *       404:
 *         description: 게시물 찾을 수 없음
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.delete(
  '/:id',
  jwtMiddleware.verifyAccessToken,
  jwtMiddleware.verifyFreeBoardAuth,
  freeBoardController.deleteFreeBoard
);

export default router;
