import { ErrorRequestHandler } from 'express';
import NotFoundError from '../errorClasses.ts/NotFoundError';
import MissingFieldsError from '../errorClasses.ts/MissingFields';
import InvalidFieldsError from '../errorClasses.ts/InvalidFields';

const errorMiddleware: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  const { message } = err;
  if (err instanceof NotFoundError) return res.status(404).json({ message });
  if (err instanceof MissingFieldsError) return res.status(400).json({ message });
  if (err instanceof InvalidFieldsError) return res.status(401).json({ message });
  return res.status(500).json({ message: 'Conection error' });
};

export default errorMiddleware;
