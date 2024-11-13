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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const userController = __importStar(require("../controllers/userController.js"));
const validateUserMiddleware = __importStar(require("../middlewares/validate/validateUserMiddleware.js"));
const jwtMiddleware_js_1 = __importDefault(require("../middlewares/jwtMiddleware.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.use((0, cookie_parser_1.default)());
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserDetail);
router.patch('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);
// 리프레시 토큰을 사용한 엑세스토큰 재발급
router.post('/auth/refresh-token', jwtMiddleware_js_1.default.verifyRefreshToken, userController.updateRefreshToken);
//로그인
router.post('/auth/login', validateUserMiddleware.validateLogin, userController.loginUser);
// 회원가입
router.post('/auth/signup', validateUserMiddleware.validateUser, userController.createUser);
exports.default = router;
