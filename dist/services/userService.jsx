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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.refreshToken = exports.updateUser = exports.loginUser = exports.createUser = exports.deleteUser = exports.editUser = exports.getUserDetail = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("redis"));
const error_1 = require("../utils/error");
const prisma = new client_1.PrismaClient();
const redisClient = redis_1.default.createClient();
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findMany({
        include: {
            Favorite: true,
        },
    });
    return user;
});
exports.getUsers = getUsers;
const getUserDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUniqueOrThrow({
        include: {
            fleaMarket: true,
            freeBoard: true,
            Favorite: true,
        },
        where: { id },
    });
    return user;
});
exports.getUserDetail = getUserDetail;
const editUser = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.update({
        where: { id },
        data: req.body,
    });
    return user;
});
exports.editUser = editUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.delete({
        where: { id },
    });
});
exports.deleteUser = deleteUser;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma.user.findUnique({
        where: { email: user.email },
    });
    if (existingUser) {
        (0, error_1.createError)('가입된 이메일이 존재합니다.', 442, 442);
    }
    const hashedPassword = yield hashingPassword(user.encryptedPassword);
    const createdUser = yield prisma.user.create({
        data: {
            email: user.email,
            nickname: user.nickname,
            encryptedPassword: hashedPassword,
        },
    });
    return filterSensitiveUserData(createdUser);
});
exports.createUser = createUser;
const loginUser = (email, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        (0, error_1.createError)('가입된 이메일이 없습니다.', 401, 401);
    }
    yield verifyPassword(encryptedPassword, user === null || user === void 0 ? void 0 : user.encryptedPassword);
    return filterSensitiveUserData(user);
});
exports.loginUser = loginUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { id: id },
        data,
    });
});
exports.updateUser = updateUser;
const refreshToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user || user.refreshToken !== refreshToken) {
        (0, error_1.createError)('권한이 없습니다.', 401, 401);
    }
    const newAccessToken = (0, exports.createToken)(user, 'newToken');
    const newRefreshToken = (0, exports.createToken)(user, 'refresh');
    // redisClient.set(user.id, newRefreshToken, 'EX', 7 * 24 * 60 * 60);
    return { newAccessToken, newRefreshToken };
});
exports.refreshToken = refreshToken;
const createToken = (user, type) => {
    const payload = { userId: user.id };
    const options = {
        expiresIn: type === 'refresh' ? '2w' : '1h',
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
};
exports.createToken = createToken;
const filterSensitiveUserData = (user) => {
    const { encryptedPassword, refreshToken } = user, rest = __rest(user, ["encryptedPassword", "refreshToken"]);
    return rest;
};
const hashingPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        (0, error_1.createError)('비밀번호는 필수입니다.', 400, 400);
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
const verifyPassword = (inputPassword, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = yield bcryptjs_1.default.compare(inputPassword, savedPassword);
    if (!isValid) {
        (0, error_1.createError)('비밀번호가 틀렸습니다.', 401, 401);
    }
});
// const oauthCreateOrUpdate = async (provider, providerId, email, name)=> {
//   const user = await userRepository.createOrUpdate(
//     provider,
//     providerId,
//     email,
//     name
//   );
//   return filterSensitiveUserData(user);
// }
