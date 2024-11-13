"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
    }
}
exports.CustomError = CustomError;
const createError = (message, code, status) => {
    const error = new CustomError(message, code, status);
    throw error;
};
exports.createError = createError;
