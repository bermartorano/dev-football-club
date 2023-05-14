import { ErrorRequestHandler } from 'express';
import NotFoundError from '../errorClasses.ts/NotFoundError';

const errorMiddleware: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  const { message } = err;
  if (err instanceof NotFoundError) return res.status(404).json({ message });
};

export default errorMiddleware;
