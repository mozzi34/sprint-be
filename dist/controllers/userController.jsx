"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateRefreshToken = exports.loginUser = exports.createUser = exports.deleteUser = exports.editUser = exports.getUserDetail = exports.getUsers = void 0;
const userService = __importStar(require("../services/userService.js"));
const redis_1 = __importDefault(require("redis"));
const redisClient = redis_1.default.createClient();
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUsers();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUserDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getUserDetail(id);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserDetail = getUserDetail;
const editUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.editUser(id, req);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.editUser = editUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield userService.deleteUser(id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.createUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, encryptedPassword } = req.body;
    try {
        const user = yield userService.loginUser(email, encryptedPassword);
        const accessToken = userService.createToken(user, 'newToken');
        const refreshToken = userService.createToken(user, 'refresh');
        // redisClient.set(user.id, refreshToken, 'EX', 7 * 24 * 60 * 60);
        yield userService.updateUser(user.id, { refreshToken });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.status(201).json({ accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const updateRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { refreshToken } = req.cookies;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        const { newAccessToken, newRefreshToken } = yield userService.refreshToken(userId, refreshToken);
        yield userService.updateUser(userId, { refreshToken: newRefreshToken });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.status(201).json({ newAccessToken });
    }
    catch (error) {
        return next(error);
    }
});
exports.updateRefreshToken = updateRefreshToken;
