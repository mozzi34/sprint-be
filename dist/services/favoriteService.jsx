"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = exports.postFavorite = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const postFavorite = (_a) => __awaiter(void 0, [_a], void 0, function* ({ articleCategory, articleId, userId, }) {
    const favoriteData = getFavoriteData(articleCategory, articleId);
    const articleCategoryModel = getCategory(articleCategory);
    if (articleCategoryModel === 'fleaMarket') {
        yield prisma.$transaction([
            prisma.favorite.create({
                data: Object.assign({ userId: userId }, favoriteData),
            }),
            prisma.fleaMarket.update({
                where: { id: Number(articleId) },
                data: { favoriteCount: { increment: 1 } },
            }),
        ]);
    }
    else {
        yield prisma.$transaction([
            prisma.favorite.create({
                data: Object.assign({ userId: userId }, favoriteData),
            }),
            prisma.freeBoard.update({
                where: { id: Number(articleId) },
                data: { favoriteCount: { increment: 1 } },
            }),
        ]);
    }
});
exports.postFavorite = postFavorite;
const deleteFavorite = (_a) => __awaiter(void 0, [_a], void 0, function* ({ articleCategory, articleId, userId, }) {
    const favoriteData = getFavoriteData(articleCategory, articleId);
    const articleCategoryModel = getCategory(articleCategory);
    const existingFavorite = yield prisma.favorite.findFirst({
        where: Object.assign({ userId: userId }, favoriteData),
    });
    if (!existingFavorite) {
        throw new Error('좋아요가 존재하지 않습니다');
    }
    if (articleCategoryModel === 'fleaMarket') {
        yield prisma.$transaction([
            prisma.favorite.create({
                data: Object.assign({ userId: userId }, favoriteData),
            }),
            prisma.fleaMarket.update({
                where: { id: Number(articleId) },
                data: { favoriteCount: { increment: 1 } },
            }),
        ]);
    }
    else {
        yield prisma.$transaction([
            prisma.favorite.create({
                data: Object.assign({ userId: userId }, favoriteData),
            }),
            prisma.freeBoard.update({
                where: { id: Number(articleId) },
                data: { favoriteCount: { increment: 1 } },
            }),
        ]);
    }
});
exports.deleteFavorite = deleteFavorite;
const getFavoriteData = (articleCategory, articleId) => {
    if (articleCategory === 'fleamarket') {
        return { fleaMarketId: Number(articleId) };
    }
    else {
        return { freeBoardId: Number(articleId) };
    }
};
const getCategory = (articleCategory) => {
    if (articleCategory === 'fleaMarket')
        return 'fleaMarket';
    if (articleCategory === 'freeBoard')
        return 'freeBoard';
    throw new Error('Invalid category');
};
