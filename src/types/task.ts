import { Document } from 'mongoose';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'in_progress' | 'completed';

export interface ITask extends Document {
  title: string;
  description: string;
  scheduledAt: Date;
  completedAt?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  scheduledAt: string | Date;
  completedAt?: string | Date;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface TaskUpdateInput {
  title?: string;
  description?: string;
  scheduledAt?: string | Date;
  completedAt?: string | Date;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface TaskQueryParams {
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data?: T;
  errors?: string[];
}
