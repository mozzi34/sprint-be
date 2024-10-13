import * as favoriteService from '../services/favoriteService.js';
import redis from 'redis';

const redisClient = redis.createClient();

export const postFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;

    const user = await favoriteService.postFavorite(id, userId);
    res.status(200).json({ message: '좋아요가 추가되었습니다.' });
  } catch (error) {
    next(error);
  }
};

export const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;

    const user = await favoriteService.deleteFavorite(id, userId);
    res.status(204).json({ message: '좋아요가 삭제됐습니다.' });
  } catch (error) {
    next(error);
  }
};
