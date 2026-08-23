"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const validateTask_1 = require("../middleware/validateTask");
const router = express_1.default.Router();
router.route('/')
    .get(taskController_1.getTasks)
    .post(validateTask_1.validateTaskPayload, taskController_1.createTask);
router.route('/:id')
    .get(taskController_1.getTaskById)
    .put(validateTask_1.validateTaskPayload, taskController_1.updateTask)
    .delete(taskController_1.deleteTask);
router.route('/:id/status')
    .patch(validateTask_1.validateTaskPayload, taskController_1.updateTaskStatus);
exports.default = router;
