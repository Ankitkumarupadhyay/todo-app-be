import Task from '../models/Task';
import { ITask, TaskCreateInput, TaskUpdateInput, TaskQueryParams, TaskStatus } from '../types/task';
import { FilterQuery } from 'mongoose';

class TaskService {
  async getAllTasks(queryParams: TaskQueryParams = {}): Promise<ITask[]> {
    const { search } = queryParams;
    let filter: FilterQuery<ITask> = {};

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter = {
        $or: [
          { title: searchRegex },
          { description: searchRegex },
        ],
      };
    }

    return await Task.find(filter).sort({ scheduledAt: 1, createdAt: 1 });
  }

  async getTaskById(taskId: string): Promise<ITask | null> {
    return await Task.findById(taskId);
  }

  async createTask(taskData: TaskCreateInput): Promise<ITask> {
    const task = new Task({
      title: taskData.title,
      description: taskData.description || '',
      scheduledAt: new Date(taskData.scheduledAt),
      completedAt: taskData.completedAt ? new Date(taskData.completedAt) : undefined,
      priority: taskData.priority || 'medium',
      status: taskData.status || 'in_progress',
    });

    return await task.save();
  }

  async updateTask(taskId: string, taskData: TaskUpdateInput): Promise<ITask | null> {
    const updatePayload: Partial<TaskCreateInput> = {};

    if (taskData.title !== undefined) updatePayload.title = taskData.title;
    if (taskData.description !== undefined) updatePayload.description = taskData.description;
    if (taskData.scheduledAt !== undefined) updatePayload.scheduledAt = new Date(taskData.scheduledAt);
    if (taskData.completedAt !== undefined) updatePayload.completedAt = new Date(taskData.completedAt);
    if (taskData.priority !== undefined) updatePayload.priority = taskData.priority;
    if (taskData.status !== undefined) updatePayload.status = taskData.status;

    return await Task.findByIdAndUpdate(taskId, updatePayload, {
      new: true,
      runValidators: true,
    });
  }

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<ITask | null> {
    const updatePayload: { status: TaskStatus; completedAt?: Date } = { status };
    if (status === 'completed') {
      updatePayload.completedAt = new Date();
    }

    return await Task.findByIdAndUpdate(
      taskId,
      updatePayload,
      { new: true, runValidators: true }
    );
  }

  async deleteTask(taskId: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(taskId);
  }
}

export default new TaskService();
