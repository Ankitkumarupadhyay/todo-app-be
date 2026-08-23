import express, { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from '../controllers/taskController';
import { validateTaskPayload } from '../middleware/validateTask';

const router: Router = express.Router();

router.route('/')
  .get(getTasks)
  .post(validateTaskPayload, createTask);

router.route('/:id')
  .get(getTaskById)
  .put(validateTaskPayload, updateTask)
  .delete(deleteTask);

router.route('/:id/status')
  .patch(validateTaskPayload, updateTaskStatus);

export default router;
