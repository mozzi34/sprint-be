"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateUser = void 0;
const error_1 = require("../../utils/error");
const validateUser = (req, res, next) => {
    const { email, encryptedPassword, nickname } = req.body;
    if (!email || email.trim() === '') {
        (0, error_1.createError)('이메일은 필수입니다.', 400, 400);
    }
    if (!encryptedPassword || encryptedPassword.trim() === '') {
        (0, error_1.createError)('비밀번호는 필수입니다.', 400, 400);
    }
    if (!nickname || nickname.trim() === '') {
        (0, error_1.createError)('닉네임은 필수입니다.', 400, 400);
    }
    next();
};
exports.validateUser = validateUser;
const validateLogin = (req, res, next) => {
    const { email, encryptedPassword } = req.body;
    if (!email || email.trim() === '') {
        (0, error_1.createError)('이메일은 필수입니다.', 400, 400);
    }
    if (!encryptedPassword || encryptedPassword.trim() === '') {
        (0, error_1.createError)('비밀번호는 필수입니다.', 400, 400);
    }
    next();
};
exports.validateLogin = validateLogin;
