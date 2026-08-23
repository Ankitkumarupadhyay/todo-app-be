"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('API Error:', err.message || err);
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(404).json({
            success: false,
            message: 'Resource not found: Invalid ID format',
        });
    }
    if (err.name === 'ValidationError' && err.errors) {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: messages,
        });
    }
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
