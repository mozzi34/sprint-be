import express from 'express';
import { PrismaClient } from '@prisma/client';
import * as userController from '../controllers/userController.js';
import * as validateUserMiddleware from '../middlewares/validate/validateUserMiddleware.js';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import cookieParser from 'cookie-parser';

const router = express.Router();
const prisma = new PrismaClient();

router.use(cookieParser());

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관련 API
 */

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [Users]
 *     summary: 사용자 목록 가져오기
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
 *         description: 페이지당 사용자 수
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 사용자 목록 반환
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [Users]
 *     summary: 특정 사용자 상세 정보 가져오기
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 사용자 상세 정보 반환
 *       404:
 *         description: 사용자 찾을 수 없음
 */
router.get('/:id', userController.getUserDetail);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: 특정 사용자 정보 수정
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정된 사용자 정보 반환
 *       404:
 *         description: 사용자 찾을 수 없음
 */

router.patch('/:id', userController.editUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: 특정 사용자 삭제
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *         type: string
 *     responses:
 *       204:
 *         description: 사용자 삭제 성공
 *       404:
 *         description: 사용자 찾을 수 없음
 */
router.delete('/:id', userController.deleteUser);

/**
 * @swagger
 * /user/auth/refresh-token:
 *   post:
 *     tags: [Users]
 *     summary: 리프레시 토큰을 사용한 엑세스 토큰 재발급
 *     responses:
 *       200:
 *         description: 새 엑세스 토큰 반환
 *       401:
 *         description: 인증 실패
 */
router.post(
  '/auth/refresh-token',
  jwtMiddleware.verifyRefreshToken,
  userController.updateRefreshToken
);

/**
 * @swagger
 * /user/auth/login:
 *   post:
 *     tags: [Users]
 *     summary: 사용자 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               encryptedPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공 및 토큰 반환
 *       401:
 *         description: 로그인 실패
 */

router.post(
  '/auth/login',
  validateUserMiddleware.validateLogin,
  userController.loginUser
);

/**
 * @swagger
 * /user/auth/signup:
 *   post:
 *     tags: [Users]
 *     summary: 사용자 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               nickname:
 *                 type: string
 *               encryptedPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 요청
 */

router.post(
  '/auth/signup',
  validateUserMiddleware.validateUser,
  userController.createUser
);

export default router;
