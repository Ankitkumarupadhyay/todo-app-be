import mongoose, { Schema } from 'mongoose';
import { ITask } from '../types/task';

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [1, 'Task title cannot be empty'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    scheduledAt: {
      type: Date,
      required: [true, 'Scheduled date and time is required'],
    },
    completedAt: {
      type: Date,
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority must be low, medium, or high',
      },
      default: 'medium',
    },
    status: {
      type: String,
      enum: {
        values: ['in_progress', 'completed'],
        message: 'Status must be in_progress or completed',
      },
      default: 'in_progress',
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.index({ title: 'text', description: 'text' });
TaskSchema.index({ scheduledAt: 1 });
TaskSchema.index({ status: 1 });

export default mongoose.model<ITask>('Task', TaskSchema);
