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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const jwtMiddleware_1 = require("./jwtMiddleware");
const prisma = new client_1.PrismaClient();
const secret = process.env.JWT_SECRET;
const AuthMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(new jwtMiddleware_1.CustomError_Class('인증 헤더가 없습니다.', 401, 401));
    }
    const [tokenType, accessToken] = authorization.split(' ');
    if (tokenType !== 'Bearer') {
        return next(new jwtMiddleware_1.CustomError_Class('지원하지 않는 인증 방식입니다.', 400, 400));
    }
    if (!accessToken) {
        return next(new jwtMiddleware_1.CustomError_Class('권한이 없습니다.', 400, 400));
    }
    jsonwebtoken_1.default.verify(accessToken, secret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(new jwtMiddleware_1.CustomError_Class('다시 로그인해 주세요.', 401, 401));
        }
        try {
            const decodedPayload = decoded;
            const user = yield prisma.user.findUnique({
                where: { id: decodedPayload === null || decodedPayload === void 0 ? void 0 : decodedPayload.userId },
            });
            if (!user) {
                return next(new jwtMiddleware_1.CustomError_Class('회원 정보가 없습니다.', 404, 404));
            }
            req.user = user;
            return next();
        }
        catch (err) {
            return next(new jwtMiddleware_1.CustomError_Class('서버 오류입니다.', 500, 500));
        }
    }));
};
exports.default = AuthMiddleware;
