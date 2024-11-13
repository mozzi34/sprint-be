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
const jwtMiddleware_1 = __importDefault(require("../middlewares/jwtMiddleware"));
const validateCommentMiddleware_js_1 = __importDefault(require("../middlewares/validate/validateCommentMiddleware.js"));
const commentController = __importStar(require("../controllers/commentController.js"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/:articleCategory/:articleId', jwtMiddleware_1.default.verifyAccessToken, commentController.getComments);
router.post('/:articleCategory/:articleId', jwtMiddleware_1.default.verifyAccessToken, validateCommentMiddleware_js_1.default, commentController.postComment);
router.patch('/:id', jwtMiddleware_1.default.verifyAccessToken, jwtMiddleware_1.default.verifyCommentAuth, validateCommentMiddleware_js_1.default, commentController.editComment);
router.delete('/:id', jwtMiddleware_1.default.verifyAccessToken, jwtMiddleware_1.default.verifyCommentAuth, commentController.deleteComment);
exports.default = router;
