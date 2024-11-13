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
exports.CustomError_Class = void 0;
const express_jwt_1 = require("express-jwt");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const secret = process.env.JWT_SECRET;
class CustomError_Class extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = this.constructor.name;
    }
}
exports.CustomError_Class = CustomError_Class;
const verifyAccessToken = (0, express_jwt_1.expressjwt)({
    secret,
    algorithms: ['HS256'],
});
const verifyRefreshToken = (0, express_jwt_1.expressjwt)({
    secret: secret,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.refreshToken,
});
const verifyFleaMarketAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: fleaMarketId } = req.params;
    try {
        const fleaMarketArticle = yield prisma.fleaMarket.findUnique({
            where: {
                id: Number(fleaMarketId),
            },
        });
        if (!fleaMarketArticle) {
            const error = new Error('중고게시글이 없습니다.');
            if (error instanceof CustomError_Class) {
                error.code = 404;
                error.status = 404;
                throw error;
            }
        }
        if ((fleaMarketArticle === null || fleaMarketArticle === void 0 ? void 0 : fleaMarketArticle.userId) !== req.auth.userId) {
            const error = new Error('권한이 없습니다.');
            if (error instanceof CustomError_Class) {
                error.code = 403;
                error.status = 403;
                throw error;
            }
        }
        return next();
    }
    catch (error) {
        return next(error);
    }
});
const verifyFreeBoardAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: freeBoardId } = req.params;
    try {
        const freeBoardArticle = yield prisma.freeBoard.findUnique({
            where: {
                id: Number(freeBoardId),
            },
        });
        if (!freeBoardArticle) {
            const error = new Error('자유게시판에 글이 없습니다.');
            if (error instanceof CustomError_Class) {
                error.code = 404;
                error.status = 404;
                throw error;
            }
        }
        if ((freeBoardArticle === null || freeBoardArticle === void 0 ? void 0 : freeBoardArticle.userId) !== req.auth.userId) {
            const error = new Error('권한이 없습니다.');
            if (error instanceof CustomError_Class) {
                error.code = 403;
                error.status = 403;
                throw error;
            }
        }
        return next();
    }
    catch (error) {
        return next(error);
    }
});
const verifyCommentAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: commentId } = req.params;
    try {
        const comment = yield prisma.comment.findUnique({
            where: {
                id: Number(commentId),
            },
        });
        if (!comment) {
            const error = new Error('댓글이 없습니다.');
            if (error instanceof CustomError_Class) {
                error.code = 404;
                error.status = 404;
                throw error;
            }
        }
        if ((comment === null || comment === void 0 ? void 0 : comment.userId) !== req.auth.userId) {
            const error = new Error('권한이 없습니다.');
            if (error instanceof CustomError_Class) {
                error.code = 403;
                error.status = 403;
                throw error;
            }
        }
        return next();
    }
    catch (error) {
        return next(error);
    }
});
exports.default = {
    verifyAccessToken,
    verifyRefreshToken,
    verifyFleaMarketAuth,
    verifyCommentAuth,
    verifyFreeBoardAuth,
};
