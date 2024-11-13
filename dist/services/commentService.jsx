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
exports.deleteComment = exports.editComment = exports.postComment = exports.getComments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getComments = (_a) => __awaiter(void 0, [_a], void 0, function* ({ cursor = '', limit = '5', articleId, articleCategory, }) {
    if (!articleId) {
        throw new Error('articleId is required'); // articleId가 없으면 에러를 던집니다.
    }
    const commentData = getCommentData(articleCategory, articleId);
    const numericLimit = limit ? Number(limit) : 5;
    const cursorValue = cursor ? Number(cursor) : null;
    const comments = yield prisma.comment.findMany(Object.assign(Object.assign({ take: numericLimit }, (cursorValue && { cursor: { id: cursorValue } })), { orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], where: Object.assign({}, commentData), include: {
            user: {
                select: {
                    nickname: true,
                    image: true,
                },
            },
        } }));
    const totalCount = yield prisma.comment.count({
        where: Object.assign({}, commentData),
    });
    return { totalCount, comments };
});
exports.getComments = getComments;
const postComment = (_a) => __awaiter(void 0, [_a], void 0, function* ({ articleId, articleCategory, content, userId, }) {
    if (!articleId) {
        throw new Error('articleId is required'); // articleId가 없으면 에러를 던집니다.
    }
    const commentData = getCommentData(articleCategory, articleId);
    const comments = yield prisma.comment.create({
        data: Object.assign({ content: content, userId: userId }, commentData),
        include: {
            user: {
                select: {
                    nickname: true,
                    image: true,
                },
            },
        },
    });
    return comments;
});
exports.postComment = postComment;
const editComment = (id, content) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield prisma.comment.update({
        where: {
            id: Number(id),
        },
        data: {
            content: content,
        },
        include: {
            user: {
                select: {
                    nickname: true,
                    image: true,
                },
            },
        },
    });
    return comments;
});
exports.editComment = editComment;
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.comment.delete({
        where: {
            id: Number(id),
        },
    });
});
exports.deleteComment = deleteComment;
const getCommentData = (articleCategory, articleId) => {
    if (articleCategory === 'fleamarket') {
        return { fleaMarketId: Number(articleId) };
    }
    else {
        return { freeBoardId: Number(articleId) };
    }
};
