import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/task';

export const errorHandler = (
  err: Error & { name?: string; kind?: string; errors?: Record<string, { message: string }> },
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction
): Response<ApiResponse<null>> => {
  console.error('API Error:', err.message || err);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found: Invalid ID format',
    });
  }

  if (err.name === 'ValidationError' && err.errors) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
    });
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
