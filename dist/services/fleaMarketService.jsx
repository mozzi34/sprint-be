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
exports.editFleaMarket = exports.postFleaMarket = exports.deleteFleaMarket = exports.getFleaMarketDetail = exports.getFleaMarket = void 0;
const client_1 = require("@prisma/client");
const error_1 = require("../utils/error");
const prisma = new client_1.PrismaClient();
const getFleaMarket = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, limit, keyword, sort, userId, }) {
    const offset = (page - 1) * limit;
    let orderBy;
    if (sort === 'recent') {
        orderBy = [{ createdAt: 'desc' }, { id: 'desc' }];
    }
    else {
        orderBy = [
            { favoriteCount: 'desc' },
            { createdAt: 'desc' },
            { id: 'desc' },
        ];
    }
    const articles = yield prisma.fleaMarket.findMany({
        where: Object.assign({}, (keyword
            ? {
                OR: [
                    { title: { contains: keyword, mode: 'insensitive' } },
                    { content: { contains: keyword, mode: 'insensitive' } },
                ],
            }
            : {})),
        include: {
            user: {
                select: {
                    nickname: true,
                    image: true,
                },
            },
            comment: {
                select: {
                    id: true,
                },
            },
            favorite: true,
        },
        orderBy,
        skip: offset,
        take: Number(limit),
    });
    const articlesWithIsLiked = articles.map((article) => {
        var _a, _b;
        const isLiked = userId
            ? (_b = (_a = article.favorite) === null || _a === void 0 ? void 0 : _a.some((fav) => fav.userId === userId)) !== null && _b !== void 0 ? _b : false
            : false;
        return Object.assign(Object.assign({}, article), { isLiked });
    });
    const total = yield prisma.fleaMarket.count({
        where: Object.assign({}, (keyword
            ? {
                OR: [
                    { title: { contains: keyword, mode: 'insensitive' } },
                    { content: { contains: keyword, mode: 'insensitive' } },
                ],
            }
            : {})),
    });
    return {
        total,
        totalPages: Math.ceil(total / limit),
        data: articlesWithIsLiked,
    };
});
exports.getFleaMarket = getFleaMarket;
const getFleaMarketDetail = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield prisma.fleaMarket.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            user: {
                select: {
                    nickname: true,
                    image: true,
                },
            },
            favorite: {
                select: {
                    userId: true,
                },
            },
        },
    });
    const isLiked = userId
        ? article === null || article === void 0 ? void 0 : article.favorite.some((fav) => fav.userId === userId)
        : false;
    if (!article) {
        (0, error_1.createError)('게시물이 존재하지 않습니다', 404, 404);
    }
    return { article, isLiked };
});
exports.getFleaMarketDetail = getFleaMarketDetail;
const deleteFleaMarket = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.fleaMarket.delete({
        where: {
            id: Number(id),
        },
    });
});
exports.deleteFleaMarket = deleteFleaMarket;
const postFleaMarket = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, content, price, tags, userId, req, }) {
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];
    const tagsArray = tags ? tags.split(',') : [];
    const article = yield prisma.fleaMarket.create({
        data: {
            title: title,
            content: content,
            price: Number(price),
            tags: tagsArray,
            images: imagePaths,
            userId: userId,
        },
    });
    return article;
});
exports.postFleaMarket = postFleaMarket;
const editFleaMarket = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, content, price, tags, id, req, }) {
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];
    const tagsArray = tags ? tags.split(',') : [];
    const article = yield prisma.fleaMarket.update({
        where: { id: Number(id) },
        data: {
            title: title,
            content: content,
            price: Number(price),
            tags: tagsArray,
            images: imagePaths,
        },
    });
    return article;
});
exports.editFleaMarket = editFleaMarket;
