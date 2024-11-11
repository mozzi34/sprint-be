import express from 'express';
import * as notificationController from '../controllers/notificationController.js';

const router = express.Router();

// 알림 조회
router.get(
  '/users/:userId/notifications',
  notificationController.getNotifications
);

// 알림 읽음 처리
router.put('/notifications/:id/read', notificationController.markAsRead);

export default router;

// 특정 사용자의 알림을 조회
// includeRead 쿼리 파라미터로 읽은 알림 포함 여부를 제어 가능
// GET /api/users/:userId/notifications?includeRead=false:

// 특정 알림을 읽음처리
// PUT /api/notifications/:id/read:

// 사용 예시 : challengeService.js 내부
//
// import * as notificationService from './notificationService';
//
// const updateChallengeStatus = async (challengeId, newStatus) => {
//
//  (로직 본문..)
//
//   await notificationService.createNotification(
//     userId,
//     'CHALLENGE_STATUS',
//     `챌린지 상태가 ${newStatus}로 변경되었습니다.`,
//     null,
//     challengeId
//   );
// };
//
// 형태로 사용 가능
