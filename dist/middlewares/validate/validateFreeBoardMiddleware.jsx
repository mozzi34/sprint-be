"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const validateFreeBoardMiddleware = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || title.trim() === '') {
        (0, error_1.createError)('제목이 없습니다', 400, 400);
    }
    if (!content || content.trim() === '') {
        {
            (0, error_1.createError)('내용이 없습니다', 400, 400);
        }
    }
    next();
};
exports.default = validateFreeBoardMiddleware;
