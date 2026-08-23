import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Task from '../models/Task';
import { TaskCreateInput } from '../types/task';

const seedTasks: TaskCreateInput[] = [
  {
    title: 'Finishing Wireframe',
    description: 'Complete UI wireframes for mobile screens and review with team.',
    scheduledAt: new Date(new Date().setHours(10, 0, 0, 0)),
    priority: 'high',
    status: 'in_progress',
  },
  {
    title: 'Meeting with team',
    description: 'Weekly sync with frontend and backend developers.',
    scheduledAt: new Date(new Date().setHours(14, 30, 0, 0)),
    priority: 'medium',
    status: 'in_progress',
  },
  {
    title: 'Buy a cat food',
    description: 'Get premium salmon cat food from pet store.',
    scheduledAt: new Date(new Date().setHours(18, 0, 0, 0)),
    priority: 'low',
    status: 'completed',
  },
  {
    title: 'Finishing daily commission',
    description: 'Submit client daily report and updates.',
    scheduledAt: new Date(new Date().setHours(19, 0, 0, 0)),
    priority: 'high',
    status: 'completed',
  },
  {
    title: 'Doing Homework',
    description: 'Read chapter 4 and complete math assignment.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 1)),
    priority: 'medium',
    status: 'in_progress',
  },
  {
    title: 'Design System Documentation',
    description: 'Document colors, typography, and reusable buttons.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    priority: 'medium',
    status: 'completed',
  },
  {
    title: 'Code review for Auth Service',
    description: 'Review PR #42 on GitHub.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 8)),
    priority: 'high',
    status: 'completed',
  },
  {
    title: 'Sprint Planning Meeting',
    description: 'Define sprint backlog and user stories.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 7)),
    priority: 'high',
    status: 'in_progress',
  },
  {
    title: 'Prepare demo recording',
    description: 'Record video showing working mobile interface.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 9)),
    priority: 'low',
    status: 'in_progress',
  },
];

const seedDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.error('MONGODB_URI environment variable is missing.');
      process.exit(1);
    }

    await mongoose.connect(connStr);
    console.log('Connected to MongoDB for seeding...');

    await Task.deleteMany({});
    console.log('Cleared existing tasks.');

    const created = await Task.insertMany(seedTasks);
    console.log(`Successfully seeded ${created.length} tasks across multiple weeks!`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
