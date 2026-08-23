import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
const allowedOrigins: string[] = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'To-Do List API is healthy and running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/tasks', taskRoutes);

// 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TypeScript Express Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;
