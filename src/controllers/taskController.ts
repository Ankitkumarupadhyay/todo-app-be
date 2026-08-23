import { Request, Response, NextFunction } from 'express';
import taskService from '../services/taskService';
import { ITask, TaskCreateInput, TaskUpdateInput, TaskQueryParams, TaskStatus, ApiResponse } from '../types/task';

export const getTasks = async (
  req: Request<Record<string, never>, ApiResponse<ITask[]>, Record<string, never>, TaskQueryParams>,
  res: Response<ApiResponse<ITask[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await taskService.getAllTasks(req.query);
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request<{ id: string }, ApiResponse<ITask>>,
  res: Response<ApiResponse<ITask>>,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await taskService.getTaskById(req.params.id);
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
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request<Record<string, never>, ApiResponse<ITask>, TaskCreateInput>,
  res: Response<ApiResponse<ITask>>,
  next: NextFunction
): Promise<void> => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request<{ id: string }, ApiResponse<ITask>, TaskUpdateInput>,
  res: Response<ApiResponse<ITask>>,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
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
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (
  req: Request<{ id: string }, ApiResponse<ITask>, { status: TaskStatus }>,
  res: Response<ApiResponse<ITask>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.body;
    if (!status || !['in_progress', 'completed'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Status must be in_progress or completed',
      });
      return;
    }

    const updatedTask = await taskService.updateTaskStatus(req.params.id, status);
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
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request<{ id: string }, ApiResponse<{ id: string }>>,
  res: Response<ApiResponse<{ id: string }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedTask = await taskService.deleteTask(req.params.id);
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
  } catch (error) {
    next(error);
  }
};
