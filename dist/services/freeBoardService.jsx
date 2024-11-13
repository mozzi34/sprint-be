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
exports.deleteFreeBoard = exports.editFreeBoard = exports.postFreeBoard = exports.getFreeBoardDetail = exports.getFreeBoard = void 0;
const client_1 = require("@prisma/client");
const error_1 = require("../utils/error");
const prisma = new client_1.PrismaClient();
const getFreeBoard = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, limit, keyword, sort, }) {
    const offset = (Number(page || 0) - 1) * Number(limit);
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
    const articles = yield prisma.freeBoard.findMany({
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
            favorite: {
                select: {
                    userId: true,
                },
            },
        },
        orderBy,
        skip: offset,
        take: Number(limit),
    });
    const total = yield prisma.freeBoard.count({
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
        articles,
    };
});
exports.getFreeBoard = getFreeBoard;
const getFreeBoardDetail = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield prisma.freeBoard.findUnique({
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
    if (!article) {
        (0, error_1.createError)('게시물이 존재하지 않습니다', 404, 404);
    }
    return article;
});
exports.getFreeBoardDetail = getFreeBoardDetail;
const postFreeBoard = (title, content, tags, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield prisma.freeBoard.create({
        data: {
            title: title,
            content: content,
            tags,
            userId,
        },
    });
    return article;
});
exports.postFreeBoard = postFreeBoard;
const editFreeBoard = (title, content, id) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield prisma.freeBoard.update({
        where: { id: Number(id) },
        data: { title, content },
    });
    return article;
});
exports.editFreeBoard = editFreeBoard;
const deleteFreeBoard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.freeBoard.delete({
        where: {
            id: Number(id),
        },
    });
});
exports.deleteFreeBoard = deleteFreeBoard;
