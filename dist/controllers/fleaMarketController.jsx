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
exports.deleteFleaMarket = exports.editFleaMarket = exports.postFleaMarket = exports.getFleaMarketDetail = exports.getFleaMarket = void 0;
const fleaMarketService = __importStar(require("../services/fleaMarketService.js"));
const error_1 = require("../utils/error");
const getFleaMarket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 5, keyword = '', sort = 'recent' } = req.query;
        const { userId } = req.body;
        const data = yield fleaMarketService.getFleaMarket({
            page,
            limit,
            keyword,
            sort,
            userId,
        });
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getFleaMarket = getFleaMarket;
const getFleaMarketDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req.query;
        const data = yield fleaMarketService.getFleaMarketDetail(id, userId);
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getFleaMarketDetail = getFleaMarketDetail;
const postFleaMarket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.auth) {
            return (0, error_1.createError)('Authentication required', 401, 401);
        }
        const { price, title, content, tags } = req.body;
        const userId = req.auth.userId;
        const data = yield fleaMarketService.postFleaMarket({
            title,
            content,
            price,
            tags,
            userId,
            req,
        });
        res.status(201).json({
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postFleaMarket = postFleaMarket;
const editFleaMarket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { price, title, content, tags } = req.body;
        const data = yield fleaMarketService.editFleaMarket({
            title,
            content,
            price,
            tags,
            id,
            req,
        });
        res.status(201).json({
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.editFleaMarket = editFleaMarket;
const deleteFleaMarket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield fleaMarketService.deleteFleaMarket(id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFleaMarket = deleteFleaMarket;
