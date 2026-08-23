"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTaskPayload = void 0;
const validateTaskPayload = (req, res, next) => {
    const { title, scheduledAt, completedAt, priority, status } = req.body;
    const errors = [];
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    if (req.method === 'POST') {
        if (!title || typeof title !== 'string' || !title.trim()) {
            errors.push('Title is required and cannot be empty');
        }
        if (!scheduledAt) {
            errors.push('scheduledAt date/time is required');
        }
        else {
            const scheduledDate = new Date(scheduledAt);
            if (isNaN(scheduledDate.getTime())) {
                errors.push('scheduledAt must be a valid date');
            }
            else if (scheduledDate < startOfToday) {
                errors.push('Cannot schedule tasks in a previous date/past');
            }
        }
    }
    if (req.method === 'PUT' || req.method === 'PATCH') {
        if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
            errors.push('Title cannot be empty');
        }
        if (scheduledAt !== undefined) {
            const scheduledDate = new Date(scheduledAt);
            if (isNaN(scheduledDate.getTime())) {
                errors.push('scheduledAt must be a valid date');
            }
            else if (scheduledDate < startOfToday) {
                errors.push('Cannot schedule tasks in a previous date/past');
            }
        }
    }
    // Completion / End time validation: completedAt must be strictly > scheduledAt
    if (scheduledAt && completedAt) {
        const startDate = new Date(scheduledAt);
        const endDate = new Date(completedAt);
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            if (endDate <= startDate) {
                errors.push('Completion date/time must be strictly greater than start time');
            }
        }
    }
    if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
        errors.push('Priority must be low, medium, or high');
    }
    if (status !== undefined && !['in_progress', 'completed'].includes(status)) {
        errors.push('Status must be in_progress or completed');
    }
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors,
        });
    }
    next();
};
exports.validateTaskPayload = validateTaskPayload;
