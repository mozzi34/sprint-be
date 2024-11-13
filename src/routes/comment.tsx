import express from 'express';
import jwtMiddleware from '../middlewares/jwtMiddleware';
import validateCommentMiddleware from '../middlewares/validate/validateCommentMiddleware.js';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();

router.get(
  '/:articleCategory/:articleId',
  jwtMiddleware.verifyAccessToken,
  commentController.getComments
);

router.post(
  '/:articleCategory/:articleId',
  jwtMiddleware.verifyAccessToken,
  validateCommentMiddleware,
  commentController.postComment
);

router.patch(
  '/:id',
  jwtMiddleware.verifyAccessToken,
  jwtMiddleware.verifyCommentAuth,
  validateCommentMiddleware,
  commentController.editComment
);

router.delete(
  '/:id',
  jwtMiddleware.verifyAccessToken,
  jwtMiddleware.verifyCommentAuth,
  commentController.deleteComment
);

export default router;
