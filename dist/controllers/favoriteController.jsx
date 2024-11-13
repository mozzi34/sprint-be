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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = exports.postFavorite = void 0;
const favoriteService = __importStar(require("../services/favoriteService.js"));
const postFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleCategory, articleId } = req.params;
        const { userId } = req.auth || {};
        yield favoriteService.postFavorite({ articleCategory, articleId, userId });
        res.status(200).json({ message: '좋아요가 추가되었습니다.' });
    }
    catch (error) {
        next(error);
    }
});
exports.postFavorite = postFavorite;
const deleteFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleCategory, articleId } = req.params;
        const { userId } = req.auth || {};
        yield favoriteService.deleteFavorite({
            articleCategory,
            articleId,
            userId,
        });
        res.status(204).json({ message: '좋아요가 삭제됐습니다.' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFavorite = deleteFavorite;
