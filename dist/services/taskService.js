"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(require("../models/Task"));
class TaskService {
    async getAllTasks(queryParams = {}) {
        const { search } = queryParams;
        let filter = {};
        if (search && search.trim()) {
            const searchRegex = new RegExp(search.trim(), 'i');
            filter = {
                $or: [
                    { title: searchRegex },
                    { description: searchRegex },
                ],
            };
        }
        return await Task_1.default.find(filter).sort({ scheduledAt: 1, createdAt: 1 });
    }
    async getTaskById(taskId) {
        return await Task_1.default.findById(taskId);
    }
    async createTask(taskData) {
        const task = new Task_1.default({
            title: taskData.title,
            description: taskData.description || '',
            scheduledAt: new Date(taskData.scheduledAt),
            completedAt: taskData.completedAt ? new Date(taskData.completedAt) : undefined,
            priority: taskData.priority || 'medium',
            status: taskData.status || 'in_progress',
        });
        return await task.save();
    }
    async updateTask(taskId, taskData) {
        const updatePayload = {};
        if (taskData.title !== undefined)
            updatePayload.title = taskData.title;
        if (taskData.description !== undefined)
            updatePayload.description = taskData.description;
        if (taskData.scheduledAt !== undefined)
            updatePayload.scheduledAt = new Date(taskData.scheduledAt);
        if (taskData.completedAt !== undefined)
            updatePayload.completedAt = new Date(taskData.completedAt);
        if (taskData.priority !== undefined)
            updatePayload.priority = taskData.priority;
        if (taskData.status !== undefined)
            updatePayload.status = taskData.status;
        return await Task_1.default.findByIdAndUpdate(taskId, updatePayload, {
            new: true,
            runValidators: true,
        });
    }
    async updateTaskStatus(taskId, status) {
        const updatePayload = { status };
        if (status === 'completed') {
            updatePayload.completedAt = new Date();
        }
        return await Task_1.default.findByIdAndUpdate(taskId, updatePayload, { new: true, runValidators: true });
    }
    async deleteTask(taskId) {
        return await Task_1.default.findByIdAndDelete(taskId);
    }
}
exports.default = new TaskService();
