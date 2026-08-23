"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskStatus = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const taskService_1 = __importDefault(require("../services/taskService"));
const getTasks = async (req, res, next) => {
    try {
        const tasks = await taskService_1.default.getAllTasks(req.query);
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
const getTaskById = async (req, res, next) => {
    try {
        const task = await taskService_1.default.getTaskById(req.params.id);
        if (!task) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTaskById = getTaskById;
const createTask = async (req, res, next) => {
    try {
        const newTask = await taskService_1.default.createTask(req.body);
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await taskService_1.default.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
const updateTaskStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        if (!status || !['in_progress', 'completed'].includes(status)) {
            res.status(400).json({
                success: false,
                message: 'Status must be in_progress or completed',
            });
            return;
        }
        const updatedTask = await taskService_1.default.updateTaskStatus(req.params.id, status);
        if (!updatedTask) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: `Task status updated to ${status}`,
            data: updatedTask,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTaskStatus = updateTaskStatus;
const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await taskService_1.default.deleteTask(req.params.id);
        if (!deletedTask) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: { id: req.params.id },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
