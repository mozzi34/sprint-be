import { PrismaClient } from '@prisma/client';

interface LikeValues {
  articleCategory: string;
  articleId: string;
  userId: string | undefined;
}

type CategoryModel = 'fleaMarket' | 'freeBoard';

const prisma = new PrismaClient();

export const postFavorite = async ({
  articleCategory,
  articleId,
  userId,
}: LikeValues) => {
  const favoriteData = getFavoriteData(articleCategory, articleId);
  const articleCategoryModel = getCategory(articleCategory);

  if (articleCategoryModel === 'fleaMarket') {
    await prisma.$transaction([
      prisma.favorite.create({
        data: {
          userId: userId,
          ...favoriteData,
        },
      }),
      prisma.fleaMarket.update({
        where: { id: Number(articleId) },
        data: { favoriteCount: { increment: 1 } },
      }),
    ]);
  } else {
    await prisma.$transaction([
      prisma.favorite.create({
        data: {
          userId: userId,
          ...favoriteData,
        },
      }),
      prisma.freeBoard.update({
        where: { id: Number(articleId) },
        data: { favoriteCount: { increment: 1 } },
      }),
    ]);
  }
};

export const deleteFavorite = async ({
  articleCategory,
  articleId,
  userId,
}: LikeValues) => {
  const favoriteData = getFavoriteData(articleCategory, articleId);
  const articleCategoryModel = getCategory(articleCategory);

  const existingFavorite = await prisma.favorite.findFirst({
    where: {
      userId: userId,
      ...favoriteData,
    },
  });

  if (!existingFavorite) {
    throw new Error('좋아요가 존재하지 않습니다');
  }

  if (articleCategoryModel === 'fleaMarket') {
    await prisma.$transaction([
      prisma.favorite.create({
        data: {
          userId: userId,
          ...favoriteData,
        },
      }),
      prisma.fleaMarket.update({
        where: { id: Number(articleId) },
        data: { favoriteCount: { increment: 1 } },
      }),
    ]);
  } else {
    await prisma.$transaction([
      prisma.favorite.create({
        data: {
          userId: userId,
          ...favoriteData,
        },
      }),
      prisma.freeBoard.update({
        where: { id: Number(articleId) },
        data: { favoriteCount: { increment: 1 } },
      }),
    ]);
  }
};

const getFavoriteData = (articleCategory: string, articleId: string) => {
  if (articleCategory === 'fleamarket') {
    return { fleaMarketId: Number(articleId) };
  } else {
    return { freeBoardId: Number(articleId) };
  }
};

const getCategory = (articleCategory: string): CategoryModel => {
  if (articleCategory === 'fleaMarket') return 'fleaMarket';
  if (articleCategory === 'freeBoard') return 'freeBoard';
  throw new Error('Invalid category');
};
