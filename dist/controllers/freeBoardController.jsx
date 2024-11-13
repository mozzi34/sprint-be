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
exports.deleteFreeBoard = exports.editFreeBoard = exports.postFreeBoard = exports.getFreeBoardDetail = exports.getFreeBoard = void 0;
const freeBoardService = __importStar(require("../services/freeBoardService.js"));
const getFreeBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 5, keyword = '', sort = 'recent' } = req.query;
        const data = yield freeBoardService.getFreeBoard({
            page,
            limit,
            keyword,
            sort,
        });
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getFreeBoard = getFreeBoard;
const getFreeBoardDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req.query;
        const data = yield freeBoardService.getFreeBoardDetail(id, userId);
        res.status(200).json({
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getFreeBoardDetail = getFreeBoardDetail;
const postFreeBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content, tags } = req.body;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        const data = yield freeBoardService.postFreeBoard(title, content, tags, userId);
        res.status(201).json({
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postFreeBoard = postFreeBoard;
const editFreeBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const data = yield freeBoardService.editFreeBoard(title, content, id);
        res.status(201).json({
            data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.editFreeBoard = editFreeBoard;
const deleteFreeBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield freeBoardService.deleteFreeBoard(id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFreeBoard = deleteFreeBoard;
