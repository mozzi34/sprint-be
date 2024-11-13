"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const validateCommentMiddleware = (req, res, next) => {
    const { content } = req.body;
    if (!content || content.trim() === '') {
        {
            (0, error_1.createError)('내용이 없습니다', 400, 400);
        }
    }
    next();
};
exports.default = validateCommentMiddleware;
